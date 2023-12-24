import * as React from 'react';
import { Handle,  Node, Position } from 'reactflow';

function ThankyouNode({ id, data }: Node): React.ReactElement {
  return (
    <div className="container">
      <Handle type="target" position={Position.Top} />
      THANKYOU 
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

export default ThankyouNode;
