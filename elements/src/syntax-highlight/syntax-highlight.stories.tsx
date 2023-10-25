import * as React from 'react';

import { SyntaxHighlight } from './syntax-highlight';
!customElements.get('syntax-highlight') && customElements.define('syntax-highlight', SyntaxHighlight);

export default {
  title: 'syntax-highlight',
  component: SyntaxHighlight
};

export const Primary = (args?: any) => {
  return <>
    <syntax-highlight>{`
      function foo(items) {
        var x = "All this is syntax highlighted";
        return x;
      }
    `}</syntax-highlight>
    </>
};
