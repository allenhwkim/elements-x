import { Node, Edge, getIncomers, getOutgoers } from "reactflow";
import { TAddNode, TAddNodeOptions} from '../types';

const NODE_GAP_H = 40;
const NODE_WIDTH = 200;

export function addNodeBesideNode(
  nodeId: string,
  position: string = 'right',
  options: TAddNodeOptions
) : TAddNode {
  const nodes = [...options.nodes];
  const edges = [...options.edges];
  const newNodeId = options.nodeId;

  const currentNode = nodes.find(el => el.id === nodeId);
  if (!currentNode) { return {nodes, edges}; }

  // create a new node with positionX increased. Then, add it to nodes
  const [newNodeX, newNodeY] = [currentNode.position.x + 240, currentNode.position.y];
  const newNode: Node = {
    id: newNodeId,
    type: 'custom',
    data: { label: newNodeId},
    position: { x: newNodeX, y: newNodeY },
  }
  const currentNodeNdx = nodes.findIndex(el => el.id === nodeId);
  const newNodeIndex = position === 'left' ? currentNodeNdx : currentNodeNdx + 1;
  nodes.splice(newNodeIndex, 0, newNode); // splice updates nodes itself

  // create edges. Then, add it to edges
  const incomer = getIncomers(currentNode, nodes, edges)[0];
  const outgoer = getOutgoers(currentNode, nodes, edges)[0];
  if (incomer && outgoer) {
    const incomingEdge: Edge = {
      id: `${incomer.id}-${newNode.id}`, 
      source: incomer.id, 
      target: newNode.id, 
      type: 'custom'
    };
    const outgoingEdge: Edge = {
      id: `${newNode.id}-${outgoer.id}`, 
      source: newNode.id, 
      target: outgoer.id, 
      type: 'custom'
    };
    edges.push(incomingEdge, outgoingEdge);
  }

  // find sibling nodes that has same incomer and outgoer
  const siblingNodes = nodes.filter(node => {
    const nodeIn  = getIncomers(node, nodes, edges)[0];
    const nodeOut = getOutgoers(node, nodes, edges)[0];
    return (nodeIn && nodeIn.id === incomer.id) 
      && (nodeOut && nodeOut.id === outgoer.id);
  });

  // find the total width of all sibling nodes including gaps(40px)
  const totalWidth = siblingNodes.reduce((acc, node, ndx) => {
    acc += (node.width || NODE_WIDTH) + (ndx && NODE_GAP_H);
    return acc;
  }, 0);

  const staCenter = incomer.position.x + (incomer.width || 0) / 2;
  const endCenter = outgoer.position.x + (outgoer.width || 0) / 2;
  const midCenter = (staCenter + endCenter) / 2;
  
  let staPosX = midCenter - (totalWidth / 2);
  siblingNodes.forEach( node => {
    node.position.x = staPosX;
    node.position.y = newNode.position.y;
    staPosX += (node.width || NODE_WIDTH) + NODE_GAP_H; // next node sta. pos x
  });

  return {nodes, edges}
}
