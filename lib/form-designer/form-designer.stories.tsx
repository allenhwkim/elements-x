import * as React from 'react';

import { FormDesigner } from "../index";

export default {
  title: 'form-designer',
  component: FormDesigner,
};

export const Primary = (args?: any) => {
  return <>
    <form-designer style={{maxWidth: 1200}}></form-designer>
  </>;
}; 
