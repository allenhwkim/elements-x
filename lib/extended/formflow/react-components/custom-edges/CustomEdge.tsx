import * as React from 'react';
import { /* getStraightPath, */ getBezierPath, EdgeProps, useReactFlow } from 'reactflow';
import useStore from '../store';

import './styles.css';

const foreignObjectSize = 20;

export default function CustomEdge({
  id, 
  sourceX, 
  sourceY, 
  targetX, 
  targetY,
  sourcePosition, 
  targetPosition,
  style = {}, 
  label
}: EdgeProps): React.ReactElement {
  const store = useStore();
  
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX, sourceY, targetX, targetY,
    sourcePosition, targetPosition,
  });

  const markerId = `triangle-${Math.ceil(Math.random()*10^6)}`;

  return (
    <>
      <defs>
        <marker
          id={markerId}
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerUnits="strokeWidth"
          markerWidth="5"
          markerHeight="5"
          orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#999" />
        </marker>
      </defs>
      <path id={id} style={style} 
        className="react-flow__edge-path" 
        d={edgePath} 
        markerEnd={`url(#${markerId})`} />

      <foreignObject
        className="for-input"
        width="200"
        height={foreignObjectSize}
        x={labelX - 200 / 2}
        y={labelY - foreignObjectSize / 2}
        style={{textAlign: 'center'}}
        requiredExtensions="http://www.w3.org/1999/xhtml">

        <div className="nodrag label-input" contentEditable={true} 
          suppressContentEditableWarning={true}
          onBlur={evt => store.updateEdgeLabel(id, evt.target.textContent || '')}
        >{label}</div>

        <div className="nodrag label-display">{label}</div> {/* to show ellipsis for long contents */}

      </foreignObject>
    </>
  );
}
