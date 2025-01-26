import * as React from 'react';
import {KeyboardEvent} from 'react';
import ReactFlow, {
  Controls, ControlButton, 
  Background, 
  Edge, Node, 
  ReactFlowInstance, 
  NodeChange, EdgeChange,
  getIncomers, getOutgoers, getConnectedEdges
} from 'reactflow';
import 'reactflow/dist/style.css';
import './styles.css';

import useStore from '../store';
import { customNodeTypes } from '../custom-nodes';
import { customEdgeTypes } from '../custom-edges';

export interface ReactflowChartProps {
  nodes?: Node[];
  edges?: Edge[];
  onNodeClick?: (node:Node, nodes: Node[], edges:Edge[]) => void;
  onEdgeClick?: (edge:Edge, nodes: Node[], edges:Edge[]) => void;
  onInit?: (instance: ReactFlowInstance) => void;
  onNodeChange?: (change?: NodeChange[]) => void;
  onEdgeChange?: (change?: EdgeChange[]) => void;
  showImage?: any;
  showData?: any;
  externalCalls?: { [key:string]: Function };
}

export function ReactflowChart(props: ReactflowChartProps) {
  const store = useStore();
  const reactFlowRef: any = React.useRef();

  if (props.externalCalls) {
    props.externalCalls.updateNodeData = (id, data) => { store.updateNodeData(id, data); }
    props.externalCalls.updateEdgeData = (id, data) => { store.updateEdgeData(id, data); }
  }

  React.useEffect( () => {
    const {nodes, edges} = props;
    store.reset(nodes, edges);
  }, [props])

  const onKeyDown = (event : KeyboardEvent) => {
    const ctrl = event.ctrlKey ? 'Control-' : '';
    const alt = event.altKey ? 'Alt-' : '';
    const meta = event.metaKey ? 'Meta-' : '';
    const shift = event.shiftKey ? 'Shift-' : '';
    const key = `${ctrl}${alt}${shift}${meta}${event.key}`;
    if (key === 'Meta-z') store.undo();
    if (key === 'Shift-Meta-z') store.redo();
  };

  const onNodesDelete = (deletedNodes) => {
    console.log('........onNodesDelete', deletedNodes);
    reactFlowRef.current?.focus(); // focus on this, document keyboard event does not fire

    // ............... TODO ....... here
    // call store function to connect edges 

    // const {nodes, edges} = store;
    // deletedNodes.reduce((acc, node) => {
    //   const incomers = getIncomers(node, nodes, edges);
    //   const outgoers = getOutgoers(node, nodes, edges);
    //   const connectedEdges = getConnectedEdges([node], edges);

    //   const remainingEdges = acc.filter(
    //     (edge) => !connectedEdges.includes(edge),
    //   );

    //   const createdEdges = incomers.flatMap(({ id: source }) =>
    //     outgoers.map(({ id: target }) => ({
    //       id: `${source}->${target}`,
    //       source,
    //       target,
    //     })),
    //   );

    //   return [...remainingEdges, ...createdEdges];
    // }, edges),
  };

  const onEdgesDelete = (edges) => {
    console.log('........onEdgesDelete', edges);
    reactFlowRef.current?.focus(); // focus on this, document keyboard event does not fire
  };

  return (
    <ReactFlow 
      ref={reactFlowRef}
      style={{minWidth: 300, minHeight: 400}}
      tabIndex={0}
      nodes={store.nodes}
      edges={store.edges}
      nodeTypes={customNodeTypes}
      edgeTypes={customEdgeTypes}
      onKeyDown={(e) => onKeyDown(e)}
      onNodesChange={store.updateNodesChange}
      onEdgesChange={store.updateEdgesChange}
      onEdgeUpdate={store.updateEdgeConnection}
      onNodesDelete={onNodesDelete}
      onEdgesDelete={onEdgesDelete}
      onConnect={store.onConnect}
      onNodeClick={(e, node) => props.onNodeClick?.(node, store.nodes, store.edges)}
      onEdgeClick={(e, edge) => props.onEdgeClick?.(edge, store.nodes, store.edges)}
      onInit={(instance) => props.onInit?.(instance)}
      fitView
    >
      <Controls style={{display: 'flex', backgroundColor: '#FFF'}}>
        <ControlButton onClick={store.undo}>&#x27F2;</ControlButton>
        <ControlButton onClick={store.redo}>&#x27F3;</ControlButton>
        <ControlButton onClick={props.showImage}>&#x1F4F7;</ControlButton>
        <ControlButton onClick={props.showData}>{'{..}'}</ControlButton>
      </Controls>
      <Background />
    </ReactFlow>
  );
}
