import * as React from 'react';
import { Handle, Position, Node, useReactFlow } from 'reactflow';
import useStore from '../store';
import { addNodeBelowNode } from './add-node-below-node';
import { getNextNodeId } from './get-next-node-id';

function StartNode({ data }: Node) {
  const store: any = useStore();
  const { fitView} = useReactFlow();

  function addNodeBelow(nodeId: string) {
    store.setState(({nodes, edges}) => {
      const nextNodeId = getNextNodeId(nodes);
      const options: any = {nodes, edges, nodeId: nextNodeId};
      const newState = addNodeBelowNode(nodeId, options);

      return newState;
    });
  }

  const onClick = () => {
    addNodeBelow('start');
    setTimeout(() => fitView({duration: 500}));
  }

  return (
    <div className="container">
      {data?.label || 'START'}
      <Handle type="source" position={Position.Bottom} />
      <span className="add-node-button bottom" onClick={onClick}>+</span>
    </div>
  );
}

export default StartNode;