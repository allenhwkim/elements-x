import * as React from 'react';
import { useRef } from 'react';
import { Handle,  Node, Position, useReactFlow, getIncomers, getOutgoers } from 'reactflow';
import useStore from '../store';
import { addNodeBesideNode } from './add-node-beside-node';
import { addNodeBelowNode } from './add-node-below-node';
import { addNodeAboveNode } from './add-node-above-node';
import { getNextNodeId } from './get-next-node-id';

function CustomNode({ id, data }: Node): React.ReactElement {
  const store: any = useStore();
  const { fitView} = useReactFlow();
  const containerRef = useRef(null);

  const node = store.nodes.find(el => el.id === id) as Node;
  let [numIncomers, numOutgoers] = [0,0];
  if (node) {
    numIncomers = getIncomers(node, store.nodes, store.edges).length;
    numOutgoers = getOutgoers(node, store.nodes, store.edges).length;
  }

  function addNodeBeside(position: string = 'right') {
    store.setState(({nodes, edges}) => {
      const nextNodeId = getNextNodeId(nodes);
      const options: any = {nodes, edges, nodeId: nextNodeId};
      const newState = addNodeBesideNode(id, position, options);
      return newState; 
    });
  }

  function addNodeBelow() {
    store.setState(({nodes, edges}) => {
      const nextNodeId = getNextNodeId(nodes);
      const options: any = {nodes, edges, nodeId: nextNodeId};
      const newState = addNodeBelowNode(id, options);

      return newState;
    });
  }

  function addNodeAbove() {
    store.setState(({nodes, edges}) => {
      const nextNodeId = getNextNodeId(nodes);
      const options: any = {nodes, edges, nodeId: nextNodeId};
      const newState = addNodeAboveNode(id, options);

      return newState; 
    });
  }

  const onLabelBlur = (event: React.ChangeEvent<any>) => {
    store.setState(({nodes, edges}) => {
      const newNodes = nodes.map((node) => {
        if (node.id === id) {
          node.data = {...node.data, ...{label: event.target.textContent}};
        }
        return node;
      });

      return {nodes: newNodes}
    });
  }


  return (
    <div ref={containerRef}
      className={`container in-${numIncomers} out-${numOutgoers}`}>
      <Handle type="target" position={Position.Top} />
      {/* this cannot be <input> for a11y for several reasons. focusable cannot have focusable etc */}
      <div className="nodrag label-input" 
        contentEditable={true} 
        suppressContentEditableWarning={true}
        onBlur={onLabelBlur}
      >
        {data.label}
      </div>
      <span className="add-node-button top" onClick={() => addNodeAbove()}>+</span>
      <span className="add-node-button right" onClick={() => addNodeBeside('right')}>+</span>
      <span className="add-node-button bottom" onClick={() => addNodeBelow()}>+</span>
      <span className="add-node-button left" onClick={() => addNodeBeside('left')}>+</span>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

export default CustomNode;
