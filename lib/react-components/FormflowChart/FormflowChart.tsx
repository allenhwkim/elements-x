import * as React from 'react';
import {KeyboardEvent, useState} from 'react';
import ReactFlow, {Controls, ControlButton, Background, Edge, Node, ReactFlowInstance, OnNodesChange, NodeChange, EdgeChange} from 'reactflow';
import 'reactflow/dist/style.css';
import './styles.css';

import useStore from '../store';
import { customNodeTypes } from '../custom-nodes';
import { customEdgeTypes } from '../custom-edges';

export interface FormflowChartProps {
  nodes?: Node[];
  edges?: Edge[];
  onNodeClick?: (node:Node, nodes: Node[], edges:Edge[]) => void;
  onEdgeClick?: (edge:Edge, nodes: Node[], edges:Edge[]) => void;
  onInit?: (instance: ReactFlowInstance) => void;
  onNodeChange?: (change?: NodeChange[]) => void;
  onEdgeChange?: (change?: EdgeChange[]) => void;
  showImage?: any;
  externalCalls?: { [key:string]: Function };
}

export function FormflowChart(props: FormflowChartProps) {
  const store = useStore();

  if (props.externalCalls) {
    props.externalCalls.updateNodeData = (id, data) => { store.updateNodeData(id, data); }
  }

  React.useEffect( () => {
    if (props.nodes) store.updateNodes(props.nodes);
    if (props.edges) store.updateEdges(props.edges);
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

  return (
    <ReactFlow 
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
      </Controls>
      <Background />
    </ReactFlow>
  );
}
