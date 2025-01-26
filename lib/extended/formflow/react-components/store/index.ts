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

function getNextNodeId(nodes: Node[]) {
  const nextNodeNo = nodes.reduce( (max, node) => {
    const matches = node.id.match(/[0-9]+$/) || [''];
    return Math.max(max, +matches[0]);
  }, 0);
  return 'page' + (nextNodeNo + 1);
}

let timeout: any;
function fireFormflowEvent(state) {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    const {nodes, edges} = state;
    const detail = { action: 'change', type: 'chart', nodes, edges };
    const customEvent = new CustomEvent('formflow', { bubbles: true, detail});
    document.querySelector('div.react-flow')?.dispatchEvent(customEvent);
    console.log('Firing formflow event', detail)
  }, 500);
}

const useStore = create<TStoreState>((set, get) => ({
  nodes: [],
  edges: [],

  reset(nodes, edges) {
    set({nodes, edges});
    UndoRedo.reset({nodes: get().nodes, edges: get().edges});
  },

  updateNodesChange(changes: NodeChange[]) {
    const positionMoved = changes.every((el:any) => el.position);
    if (positionMoved) {
      set(({nodes, edges}) => {
        UndoRedo.add({nodes, edges});
        return { nodes: applyNodeChanges(changes, nodes) };
      });
    }
  },

  updateEdgesChange(changes: EdgeChange[]) {},

  updateEdgeConnection: (oldEdge, newConnection) => {
    console.log('store.updateEdgeConnection', {oldEdge, newConnection});
    // replace the updated edge id as the format of source-target
    set(({nodes, edges}) => {
      UndoRedo.add({nodes, edges});

      const newId = `${newConnection.source}-${newConnection.target}`
      const oldEdgeNdx = edges.findIndex(el => el.id === oldEdge.id);
      oldEdge.id = newId;
      edges[oldEdgeNdx].id = newId;

      return { edges: updateEdge(oldEdge, newConnection, edges) };
    });
  },

  onConnect: (connection: Connection) => {
    console.log('store.onConnect', {connection});
    set(({nodes, edges}) => {
      UndoRedo.add({nodes, edges});

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
  },

  updateEdgeLabel: (edgeId: string, label: string) => {
    console.log('store.updateEdgeLabel', {edgeId, label});
    set(({nodes, edges}) => {
      UndoRedo.add({nodes, edges});
      const newEdges = edges.map((edge) => {
        (edge.id === edgeId) && (edge.label = label);
        return edge;
      });

      return { edges: newEdges };
  });
  },

  updateNodeData: (nodeId: string, data: any) => {
    console.log('store.updateNodeData', {nodeId, data});
    set(({nodes, edges}) => {
      UndoRedo.add({nodes, edges});

      const newNodes = nodes.map((node) => {
        (node.id === nodeId) && (node.data = {...node.data, ...data});
        return node;
      });

      return {nodes: newNodes}
    });
  },

  updateEdgeData: (edgeId: string, data: any) => {
    console.log('store.updateEdgeData', {edgeId, data});
    set(({nodes, edges}) => {
      UndoRedo.add({nodes, edges});

      const newEdges = edges.map((edge) => {
        (edge.id === edgeId) && (edge.data = {...edge.data, ...data});
        return edge;
      });

      return {edges: newEdges}
    });
  },

  addNodeBeside: (nodeId: string, position: string = 'right') => {
    set(({nodes, edges}) => {
      UndoRedo.add({nodes, edges});

      const nextNodeId = getNextNodeId(nodes);
      const options: any = {nodes, edges, nodeId: nextNodeId};
      const newState = addNodeBesideNode(nodeId, position, options);
      return newState; 
    });
  },

  addNodeBelow: (nodeId: string) => {
    set(({nodes, edges}) => {
      UndoRedo.add({nodes, edges});

      const nextNodeId = getNextNodeId(nodes);
      const options: any = {nodes, edges, nodeId: nextNodeId};
      const newState = addNodeBelowNode(nodeId, options);

      return newState;
    });
  },

  addNodeAbove: (nodeId: string) => {
    set(({nodes, edges}) => {
      UndoRedo.add({nodes, edges});

      const nextNodeId = getNextNodeId(nodes);
      const options: any = {nodes, edges, nodeId: nextNodeId};
      const newState = addNodeAboveNode(nodeId, options);

      return newState; 
    });

  },

  undo: () => {
    const state = UndoRedo.undo();
    state && set({nodes: state.nodes, edges: state.edges});
  },

  redo: () => {
    const state = UndoRedo.redo();
    state && set({nodes: state.nodes, edges: state.edges});
  },
}));

// Subscribe to state changes
useStore.subscribe( (newState, prevState) => {
  const changed = JSON.stringify(newState) !== JSON.stringify(prevState);
  changed && fireFormflowEvent(newState);
});

export default useStore;
