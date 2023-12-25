import {Edge, Node} from 'reactflow';
export const DEFAULT_CHART =  {
  nodes:[
    {id: 'start', type: 'start', deletable: false, position: { x: 300, y: 0 }},
    {id: 'country', type: 'custom', data: {label: 'Country'}, position: { x: 300, y: 80 }},
    {id: 'postalcode', type: 'custom', data: {label: 'Postal Code'}, position: { x: 80, y: 200 }},
    {id: 'zipcode', type: 'custom', data: {label: 'Zip Code'}, position: { x: 300, y: 200 }},
    {id: 'error', type: 'custom', data: {label: 'Error'}, position: { x: 510, y: 200 }},
    {id: 'submit', type: 'submit', deletable: false, position: { x: 300, y: 320 }},
    {id: 'thankyou', type: 'thankyou', deletable: false, position: { x: 300, y: 400 }},
    {id: 'end', type: 'end', deletable: false, position: { x: 450, y: 500 }},
  ] as Node[],
  edges: [
    {id: 'start-country', source: 'start', target: 'country', type: 'custom'},
    {id: 'country-postalcode', source: 'country', target: 'postalcode', type: 'custom', label: 'Candda?'},
    {id: 'country-zipcode', source: 'country', target: 'zipcode', type: 'custom', label: 'USA?'},
    {id: 'country-error', source: 'country', target: 'error', type: 'custom', label: 'Other'},
    {id: 'postalcode-submit', source: 'postalcode', target: 'submit', type: 'custom'},
    {id: 'zipcode-submit', source: 'zipcode', target: 'submit', type: 'custom'},
    {id: 'submit-thankyou', source: 'submit', target: 'thankyou', type: 'custom'},
    {id: 'error-end', source: 'error', target: 'end', type: 'custom'},
    {id: 'thankyou-end', source: 'thankyou', target: 'end', type: 'custom'},
  ] as Edge[]
}