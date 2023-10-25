import {Edge, Node} from 'reactflow';

export const DEFAULT_CHART =  {
  nodes:[
    {id: 'start', type: 'start', deletable: false, position: { x: 100, y: 0 }},
    {id: 'form1', type: 'custom', data: {label: 'form1'}, position: { x: 100, y: 87 }},
    {id: 'end', type: 'end', deletable: false, position: { x: 100, y: 200 }},
  ] as Node[],
  edges: [
    {id: 'start-form1', source: 'start', target: 'form1', type: 'custom'},
    {id: 'form1-end', source: 'form1', target: 'end', type: 'custom'},
  ] as Edge[]
}