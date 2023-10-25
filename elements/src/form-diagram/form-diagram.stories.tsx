import * as React from 'react';
import { useRef, useState } from 'react';

import { DEFAULT_CHART, FormDiagram } from "../index";
!customElements.get('form-diagram') && customElements.define('form-diagram', FormDiagram);

export default {
  title: 'form-diagram',
  component: FormDiagram,
  parameters: {
    // docs: { page: CustomDocumentation },
  },
  argTypes: {
    data: { control: 'object' },
  }
};

const Template:any = (args: any) => {
  const [data, setData] = useState(args.data);

  const chartEl = useRef(null);

  React.useEffect( () => {
    setData(args.data);
    (chartEl.current as any).setData(args.data)
  }, [args.data])

  const getData = () => {
    console.info((chartEl.current as any)?.getData());
  }

  return <>
    <form-diagram ref={chartEl}></form-diagram>
    <button onClick={getData}>getData()</button>
  </>
};

export const Primary = Template.bind({});
Primary.args = {
  data: DEFAULT_CHART
};