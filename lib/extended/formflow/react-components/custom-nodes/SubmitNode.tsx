import * as React from 'react';
import { Handle,  Node, Position, useReactFlow, getIncomers, getOutgoers } from 'reactflow';
import useStore from '../store';
import { addNodeAboveNode } from './add-node-above-node';
import { getNextNodeId } from './get-next-node-id';

function SubmitNode({ id, data }: Node): React.ReactElement {
  const store: any = useStore();
  const {fitView} = useReactFlow();

  function addNodeAbove(nodeId: string) {
    store.setState(({nodes, edges}) => {
      const nextNodeId = getNextNodeId(nodes);
      const options: any = {nodes, edges, nodeId: nextNodeId};
      const newState = addNodeAboveNode(nodeId, options);

      return newState; 
    });
  }

  const addNodeAboveThis = () => {
    addNodeAbove(id);
    setTimeout(() => fitView({duration: 500}));
  }

  return (
    <div className="container">
      <Handle type="target" position={Position.Top} />
      {data?.label || 'SUBMIT'}
      <span className="add-node-button top" onClick={addNodeAboveThis}>+</span>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

export default SubmitNode;
