import * as React from 'react';
import { Handle, Position, Node, useReactFlow } from 'reactflow';
import useStore from '../store';

function EndNode({ data }: Node) {
  const store = useStore();
  const { fitView} = useReactFlow();

  const onClick = () => {
    store.addNodeAbove('end');
    setTimeout(() => fitView({duration: 500}));
  }

  return (
    <div className="container">
      <span className="add-node-button top" onClick={onClick}>+</span>
      <Handle type="target" position={Position.Top} />
      end
    </div>
  );
}

export default EndNode;