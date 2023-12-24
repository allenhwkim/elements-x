import * as React from 'react';
import { useRef } from 'react';
import { Handle,  Node, Position, useReactFlow, getIncomers, getOutgoers } from 'reactflow';
import useStore from '../store';

function SubmitNode({ id, data }: Node): React.ReactElement {
  const store = useStore();
  const {fitView} = useReactFlow();

  const addNodeAboveThis = () => {
    store.addNodeAbove(id);
    setTimeout(() => fitView({duration: 500}));
  }

  return (
    <div className="container">
      <Handle type="target" position={Position.Top} />
      SUBMIT 
      <span className="add-node-button top" onClick={addNodeAboveThis}>+</span>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

export default SubmitNode;
