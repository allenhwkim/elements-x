import { 
  Node, Edge,
  OnNodesChange, 
  OnEdgesChange, 
  OnConnect, 
  OnEdgeUpdateFunc,
} from 'reactflow';

export type TAddNodeOptions = {
  nodes: Node[];
  edges: Edge[];
  nodeId: string;
};

export type TAddNode = {
  nodes: Node[]; 
  edges: Edge[];
}

// zustand store state and methods
export type TStoreState = {
  nodes: Node[];
  edges: Edge[];
  nextNodeId: number,

  updateNodes: (nodes: Node[]) => void;
  updateNodesChange: OnNodesChange;
  updateNodeData: (nodeId: string, data: any) => void;

  updateEdges: (edges: Edge[]) => void;
  updateEdgesChange: OnEdgesChange;
  updateEdgeConnection: OnEdgeUpdateFunc,
  updateEdgeLabel: (nodeId: string, label: string) => void;
  updateEdgeData: (nodeId: string, data: any) => void;

  addNodeBeside: (nodeId: string, position: string) => void;
  addNodeBelow: (nodeId: string) => void;
  addNodeAbove: (nodeId: string) => void;
  onConnect: OnConnect;
  undo: () => void;
  redo: () => void;
};