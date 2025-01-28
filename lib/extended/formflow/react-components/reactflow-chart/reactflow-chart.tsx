import React, {KeyboardEvent, useEffect, useRef, useState} from 'react';
import ReactFlow, {
  Controls, ControlButton, 
  Background, 
  Edge, Node, 
  ReactFlowInstance, 
  applyNodeChanges,
  updateEdge,
  Connection,
  addEdge,
  getConnectedEdges,
  getIncomers,
  getOutgoers,
} from 'reactflow';
import 'reactflow/dist/style.css';
import './styles.css';

import useStore from '../store';
import { customNodeTypes } from '../custom-nodes';
import { customEdgeTypes } from '../custom-edges';
import { UndoRedo } from '../undo-redo';
import { toPng } from 'html-to-image';

export interface ReactflowChartProps {
  debug?: boolean;
  nodes?: Node[];
  edges?: Edge[];
  externalCalls?: { [key:string]: Function };
}

export function ReactflowChart(props: ReactflowChartProps) {
  const store: any = useStore();
  const reactFlowRef: any = useRef();
  const [reactflow, setReactflow] = useState<ReactFlowInstance>();
  const {debug} = props;

  useEffect( () => {
    const {nodes, edges} = props;
    
    store.setState({nodes, edges});
    if (props.externalCalls) {
      props.externalCalls.updateNodeData = updateNodeData;
      props.externalCalls.updateEdgeData = updateEdgeData;
    }
  }, [props])

  function updateNodeData(nodeId: string, data: any) {
    debug && console.debug('updateNodeData', {nodeId, data});
    store.setState(({nodes, edges}) => {
      const newNodes = nodes.map((node) => {
        (node.id === nodeId) && (node.data = {...node.data, ...data});
        return node;
      });

      return {nodes: newNodes}
    });
  }

  function updateEdgeData(edgeId: string, data: any) {
    debug && console.debug('updateEdgeData', {edgeId, data});
    store.setState(({nodes, edges}) => {
      const newEdges = edges.map((edge) => {
        (edge.id === edgeId) && (edge.data = {...edge.data, ...data});
        return edge;
      });

      return {edges: newEdges}
    });
  }

  const onKeyDown = (event : KeyboardEvent) => {
    const ctrl = event.ctrlKey ? 'Control-' : '';
    const alt = event.altKey ? 'Alt-' : '';
    const meta = event.metaKey ? 'Meta-' : '';
    const shift = event.shiftKey ? 'Shift-' : '';
    const key = `${ctrl}${alt}${shift}${meta}${event.key}`;
    debug && console.debug('onKeyDown', {key});

    key === 'Meta-z' && store.setState(UndoRedo.undo(), true);
    key === 'Shift-Meta-z' && store.setState(UndoRedo.redo(), true);
  };

  function onNodesChange(changes: any[]) {
    // const changeType = [...new Set(changes.map(el => el.type))][0];
    if (changes[0]?.position) { // only apply when position changes
      debug && console.debug('node position changed', changes)
      store.setState(({nodes}) => { // when call setState, refresh chart(losing selection)
        return { nodes: applyNodeChanges(changes, nodes) };
      });
    }
  }

  function onEdgeUpdate(oldEdge, newConnection) { 
    debug && console.debug('onEdgeUpdate', {oldEdge, newConnection});
    // replace the updated edge id as the format of source-target
    store.setState(({edges}) => {
      const newId = `${newConnection.source}-${newConnection.target}`
      const oldEdgeNdx = edges.findIndex(el => el.id === oldEdge.id);
      oldEdge.id = newId;
      edges[oldEdgeNdx].id = newId;

      return { edges: updateEdge(oldEdge, newConnection, edges) };
    });
  }

  function onConnect(connection: Connection) {
    debug && console.debug('onConnect', {connection});
    store.setState(({nodes, edges}) => {
      const existingEdges: any[] = edges;
      const newEdge = {
        id:  `${connection.source}-${connection.target}`,
        type: 'custom',
        source: connection.source, 
        target: connection.target
      }
      const newEdges: Edge[] = [...existingEdges, newEdge];

      return  {edges: addEdge(connection, newEdges)};
    });
  }

  function onNodesDelete(deletedNodes: Node[]) {
    debug && console.debug('........onNodesDelete', deletedNodes);

    store.setState(({nodes, edges}) => {
      const newEdges = deletedNodes.reduce((acc, node) => {
        const incomers = getIncomers(node, nodes, edges);
        const outgoers = getOutgoers(node, nodes, edges);
        const connectedEdges = getConnectedEdges([node], edges);
        const remainingEdges = acc.filter(edge => !connectedEdges.includes(edge));
        const createdEdges = incomers.flatMap(({ id: source }) =>
          outgoers.map(({ id: target }) => ({ id: `${source}-${target}`, source, target }))
        ).reduce( (acc:any[], edge) => {
          const existing = remainingEdges.find(el => el.id === edge.id);
          !existing && acc.push(edge);
          return acc;
        }, []);
        return [...remainingEdges, ...createdEdges];
      }, edges);
    
      const newNodes = nodes.reduce( (acc: Node[], node:Node) => {
        const existing = deletedNodes.find(el => el.id === node.id);
        !existing && acc.push(node);
        return acc;
      }, []);

      return {nodes: newNodes, edges: newEdges};
    });

    reactFlowRef.current?.focus(); // focus on this, document keyboard event does not fire
  }

  function onNodeClick(event, node) {
    debug && console.debug('onNodeClick', {node});
    const {nodes, edges} = store;
    const detail = {action: 'selected', type: 'node', node, nodes, edges};
    const customEvent = new CustomEvent('formflow', { bubbles: true, detail});
    reactFlowRef.current.dispatchEvent(customEvent);
  }

  function onEdgeClick(event, edge) {
    debug && console.debug('onEdgeClick', {edge});
    const {nodes, edges} = store;
    const detail = {action: 'selected', type: 'edge', edge, nodes, edges};
    const customEvent = new CustomEvent('formflow', { bubbles: true, detail});
    reactFlowRef.current.dispatchEvent(customEvent);
  }

  function showImage() {
    toPng( reactFlowRef.current as HTMLElement, {
      filter: (node: HTMLElement) => !(
        node.classList?.contains('react-flow__minimap') ||
        node.classList?.contains('react-flow__controls')
      )
    }).then(blobUrl => {
      var image = new Image();
      image.src = blobUrl;
      (window as any).open('').document.write(image.outerHTML);
    })
  }

  function showData(){
    const data = reactflow?.toObject()
    const detail = {action: 'data', data};
    const customEvent = new CustomEvent('formflow', { bubbles: true, detail});
    reactFlowRef.current.dispatchEvent(customEvent); 
  }

  function onInit(event: ReactFlowInstance) {
    setReactflow(event); // reactflow: ReactFlowInstance
    const detail = {action: 'init', instance: reactflow};
    const customEvent = new CustomEvent('formflow', { bubbles: true, detail});
    reactFlowRef.current.dispatchEvent(customEvent); 
  }

  return (
    <ReactFlow 
      ref={reactFlowRef}
      style={{minWidth: 300, minHeight: 400}}
      tabIndex={0}
      nodes={store.nodes}
      edges={store.edges}
      nodeTypes={customNodeTypes}
      edgeTypes={customEdgeTypes}
      onInit={onInit}
      onKeyDown={onKeyDown}
      onNodesChange={onNodesChange}
      onEdgeUpdate={onEdgeUpdate}
      onNodesDelete={onNodesDelete}
      onConnect={onConnect}
      onNodeClick={onNodeClick}
      onEdgeClick={onEdgeClick}
      fitView
    >
      <Controls style={{display: 'flex', backgroundColor: '#FFF'}}>
        <ControlButton onClick={() => store.setState(UndoRedo.undo(), true)}>&#x27F2;</ControlButton>
        <ControlButton onClick={() => store.setState(UndoRedo.redo(), true)}>&#x27F3;</ControlButton>
        <ControlButton onClick={showImage}>&#x1F4F7;</ControlButton>
        <ControlButton onClick={showData}>{'{..}'}</ControlButton>
      </Controls>
      <Background />
    </ReactFlow>
  );
}
