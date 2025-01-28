import { Node } from "reactflow";

export function getNextNodeId(nodes: Node[]) {
  const nextNodeNo = nodes.reduce( (max, node: Node ) => {
    const matches = node.id.match(/[0-9]+$/) || [''];
    return Math.max(max, +matches[0]);
  }, 0);
  return 'page' + (nextNodeNo + 1);
}