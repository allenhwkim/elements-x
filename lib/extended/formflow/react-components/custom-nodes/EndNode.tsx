import * as React from 'react';
import { Handle, Position, Node } from 'reactflow';

function EndNode({ data }: Node) {

  return (
    <div className="container">
      <Handle type="target" position={Position.Top} />
      {data?.lable || 'END'}
    </div>
  );
}

export default EndNode;