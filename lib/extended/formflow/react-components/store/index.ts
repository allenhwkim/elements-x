import { create } from 'zustand';
import {
  Connection, Edge, Node,
  EdgeChange, NodeChange, addEdge,
  applyNodeChanges, applyEdgeChanges,
  updateEdge,
} from 'reactflow';

import { TStoreState } from '../types';
import { UndoRedo } from './undo-redo';
import { addNodeAboveNode } from './add-node-above-node';
import { addNodeBelowNode } from './add-node-below-node';
import { addNodeBesideNode } from './add-node-beside-node';
import { DEFAULT_CHART } from '../../default-chart';

UndoRedo.addHistory(DEFAULT_CHART);

let timeout: any;
function fireReactflowEvent(func, after, before) {
  const noChangesMade = JSON.stringify(after) === JSON.stringify(before);
  if (noChangesMade) return; 

  // console.debug('func', func, JSON.stringify(after) === JSON.stringify(before));
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    const customEvent = new CustomEvent('reactflow', {
      bubbles: true,
      detail: {
        action: 'change',
        type: 'chart',
        nodes: after.nodes,
        edges: after.edges 
      }
    });
    document.querySelector('div.react-flow')?.dispatchEvent(customEvent);
  }, 500);
}

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useStore = create<TStoreState>((set, get) => ({
  nodes: DEFAULT_CHART.nodes,
  edges: DEFAULT_CHART.edges,
  nextNodeId: 1,

  updateNodes: (nodes: Node[]) => {
    const before = get();
    const nextNodeId = nodes.reduce( (max, node) => {
      const matches = node.id.match(/[0-9]+$/) || [''];
      return Math.max(max, +matches[0]);
    }, 0);
    nodes = structuredClone(nodes);
    set({nodes, nextNodeId});
    fireReactflowEvent('updateNodes', get(), before);
  },

  updateEdges: (edges: Edge[]) => {
    const before = get();
    edges = structuredClone(edges);
    set({edges});
    UndoRedo.reset({nodes: get().nodes, edges: get().edges});
    fireReactflowEvent('updateEdges', get(), before);
  },

  updateNodesChange: (changes: NodeChange[]) => {
    const before = get();
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });

    if (changes.find(el => el.type === 'remove')) {
      UndoRedo.addHistory({nodes: get().nodes, edges: get().edges});
    }
    fireReactflowEvent('updateNodesChange', get(), before);
  },

  updateEdgesChange: (changes: EdgeChange[]) => {
    const before = get();
    const edges = get().edges;
    const connectionEdge: Edge[] = [];
    const pattern = `${changes.length}-${changes[0]?.type}-${changes[1]?.type}`;
    // When a node removed with 1 in edge and 1 out edge, add a connection ege
    if (pattern === '2-remove-remove') {
      const edge1 = edges.find(el => el.id === (changes[0] as any).id);
      const edge2 = edges.find(el => el.id === (changes[1] as any).id);
      if (edge1 && edge2 && edge1.target === edge2.source) {
        connectionEdge.push({...edge1, ...{target: edge2.target}});
      }
    }
    set({ edges: applyEdgeChanges(changes, edges).concat(connectionEdge) });

    if (changes.find(el => el.type === 'remove')) {
      UndoRedo.addHistory({nodes: get().nodes, edges: get().edges});
    }
    fireReactflowEvent('updateEdgesChange', get(), before);
  },

  updateEdgeConnection: (oldEdge, newConnection) => {
    const before = get();
    // replace the updated edge id as the format of source-target
    const newId = `${newConnection.source}-${newConnection.target}`
    const edges = get().edges;
    const oldEdgeNdx = edges.findIndex(el => el.id === oldEdge.id);
    oldEdge.id = newId;
    edges[oldEdgeNdx].id = newId;

    set({
      edges: updateEdge(oldEdge, newConnection, edges)
    });
    
    UndoRedo.addHistory({nodes: get().nodes, edges: get().edges});
    fireReactflowEvent('updateEdgeConnection', get(), before);
  },

  onConnect: (connection: Connection) => {
    const before = get();
    const existingEdges: any[] = get().edges;
    const newEdge = {
      id:  `${connection.source}-${connection.target}`,
      type: 'custom',
      source: connection.source, 
      target: connection.target
    }
    const edges: Edge[] = [...existingEdges, newEdge];
    set({edges: addEdge(connection, edges)});

    UndoRedo.addHistory({nodes: get().nodes, edges: get().edges});
    fireReactflowEvent('onConnect', get(), before);
  },

  updateEdgeLabel: (edgeId: string, label: string) => {
    const before = get();
    set({
      edges: get().edges.map((edge) => {
        if (edge.id === edgeId) {
          edge.label = label;
        }

        return edge;
      }),
    });
    fireReactflowEvent('updateEdgeLabel', get(), before);
  },

  updateNodeData: (nodeId: string, data: any) => {
    const before = get();
    const newNodes = get().nodes.map((node) => {
      if (node.id === nodeId) {
        node.data = Object.assign({}, node.data, data);
      }
      return node;
    });
    set( {nodes: newNodes});
    fireReactflowEvent('updateNodeData', get(), before);
  },

  updateEdgeData: (edgeId: string, data: any) => {
    const before = get();
    const newEdges = get().edges.map((edge) => {
      if (edge.id === edgeId) {
        edge.data = Object.assign({}, edge.data || {}, data);
      }
      return edge;
    });
    set({edges: newEdges});
    fireReactflowEvent('updateEdgeData', get(), before);
  },

  addNodeBeside: (nodeId: string, position: string = 'right') => {
    const before = get();
    set({nextNodeId: get().nextNodeId + 1});
    const options: any = {
      nodes: get().nodes,
      edges: get().edges,
      nodeId: 'page' + get().nextNodeId
    }
    const {nodes, edges} = addNodeBesideNode(nodeId, position, options);
    set({nodes, edges});

    UndoRedo.addHistory({nodes: get().nodes, edges: get().edges});
    fireReactflowEvent('addNodeBeside', get(), before);
  },

  addNodeBelow: (nodeId: string) => {
    const before = get();
    set({nextNodeId: get().nextNodeId + 1});
    const options: any = {
      nodes: get().nodes,
      edges: get().edges,
      nodeId: 'page' + get().nextNodeId
    }
    const {nodes, edges} = addNodeBelowNode(nodeId, options);
    set({nodes, edges});

    UndoRedo.addHistory({nodes: get().nodes, edges: get().edges});
    fireReactflowEvent('addNodeBelow', get(), before);
  },

  addNodeAbove: (nodeId: string) => {
    const before = get();
    set({nextNodeId: get().nextNodeId + 1});
    const options: any = {
      nodes: get().nodes,
      edges: get().edges,
      nodeId: 'page' + get().nextNodeId
    }
    const {nodes, edges} = addNodeAboveNode(nodeId, options);
    set({nodes, edges});

    UndoRedo.addHistory({nodes: get().nodes, edges: get().edges});
    fireReactflowEvent('addNodeAbove', get(), before);
  },

  undo: () => {
    const before = get();
    const state = UndoRedo.undo();
    if (state) {
      set({nodes: state.nodes, edges: state.edges});
    }
    fireReactflowEvent('undo', get(), before);
  },

  redo: () => {
    const before = get();
    const state = UndoRedo.redo();
    if (state) {
      set({nodes: state.nodes, edges: state.edges});
    }
    fireReactflowEvent('redo', get(), before);
  },
}));

export default useStore;
