import * as React from 'react';

import { InputMask } from '../index';
!customElements.get('input-mask') && customElements.define('input-mask', InputMask);

export default {
  title: 'input-mask',
  component: InputMask,
};

export const Primary = (args?: any) => {
  return <>
    <p>
    'Y', 'M', 'D', '9', '_', '#'' for number. 'X' for string
    </p>

    <input-mask mask="yyyy-mm-dd">
      <input defaultValue={"202312"} /> Date
    </input-mask>

    <input-mask mask="99999">
      <input defaultValue={"205"} /> Zip Code
    </input-mask>

    <input-mask mask="###-##-####">
      <input defaultValue={"1234"} /> ID
    </input-mask>

    <input-mask mask="9 (999) 999-9999" >
      <input defaultValue={"1"} />  Phone Number
    </input-mask>

    <input-mask mask="A9A 9A9" >
      <input defaultValue={"L7A"} /> Postal Code
    </input-mask>

    <input-mask mask="9999 9999 9999 9999">
      <input defaultValue={"4599"} /> Credit Card Number
    </input-mask>

    <input-mask mask="____ ___ ___">
      <input defaultValue={""} /> Health Card Number
    </input-mask>

  </>
}; 