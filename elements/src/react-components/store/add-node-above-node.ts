import { Node, Edge, getIncomers, getOutgoers } from "reactflow";
import { TAddNode, TAddNodeOptions} from '../types';

const NODE_GAP_V = 120;

// Returns all connected target nodes from all nodes
function getTargetNodes(targetNode: Node, nodes: Node[], edges:Edge[], acc: Node[]) {
  const targetNodes = getOutgoers(targetNode, nodes, edges);
  targetNodes.forEach(node => {
    acc.push(node);
    getTargetNodes(node, nodes, edges, acc); // tail-recursive
  });
  return acc
}

export function addNodeAboveNode(
  nodeId: string, 
  options: TAddNodeOptions
) : TAddNode {
  const nodes = [...options.nodes];
  const edges = [...options.edges];
  const newNodeId = options.nodeId;

  const currentNode = nodes.find(el => el.id === nodeId);
  if (!currentNode) { return {nodes, edges}; }

  // create a new node with positionX increased. Then, add it to nodes
  const newNode: Node = {
    id: newNodeId,
    type: 'custom',
    data: { label: newNodeId},
    position: { x: currentNode.position.x, y: currentNode.position.y },
  }
  const currentNodeNdx = nodes.findIndex(el => el.id === nodeId);
  nodes.splice(currentNodeNdx-1, 0, newNode); // splice updates nodes itself

  // create connection edge. Then, add it to edges
  const newEdge: Edge = {
    id: `${newNode.id}-${nodeId}`, 
    source: newNode.id, 
    target: nodeId, 
    type: 'custom'
  }
  const currentEdgeNdx = edges.findIndex(el => el.id === nodeId);
  edges.splice(currentEdgeNdx-1, 0, newEdge); // splice updates edges itself

  // modify existing edges.
  edges.forEach(edge => {
    if ((edge.target === nodeId) && (edge.id !== newEdge.id)) {
      edge.id = `${edge.source}-${newNode.id}`;
      edge.target = newNode.id;
    }
  })

  // get all connected target nodes. then iterate all by increasing position.y by 100
  const allTargetNodes = getTargetNodes(newNode, nodes, edges, []);
  allTargetNodes.forEach(node => {
    node.position.y += NODE_GAP_V;
  });

  return {nodes, edges}
}

