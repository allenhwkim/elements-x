import * as React from 'react';

import { QrCode } from '../index';
!customElements.get('qr-code') && customElements.define('qr-code', QrCode);

export default {
  title: 'qr-code',
};

export const Primary = (args?: any) => {
  return <>
    <qr-code id="qrcode" 
      value="Hello QR Code from https://github.com/soldair/node-qrcode">
    </qr-code>
  </>
};