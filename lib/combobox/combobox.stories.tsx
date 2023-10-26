import * as React from 'react';
import type { Meta } from '@storybook/react';
import { ComboBox } from './combobox';
!customElements.get('combo-box') && customElements.define('combo-box', ComboBox);

const meta: Meta = { component: ComboBox as any };

export default meta;

export const Primary = {
  render: () => <>
    <combo-box>
      <input placeholder="Choose one value" autoComplete="off" defaultValue="Hello World" />
      <ul>
        <li data-value="">Choose One</li>
        <li data-value="1">Hello</li>
        <li>Hello World</li>
        <li>Foo</li>
        <li className="disabled">Disabled</li>
        <li>Foo Bar</li>
      </ul>
    </combo-box>
  </>,
};

export const ReadonlyDisabled = {
  render: () => <>
    <combo-box>
      <input placeholder="Readonly dropdown" readOnly />
    </combo-box>

    <combo-box>
      <input placeholder="Disabled dropdown" disabled />
    </combo-box>
  </>
}

export const LongList = {
  render: () => <>
    <combo-box>
      <input placeholder="Long list dropdown" autoComplete="off" defaultValue="13" />
      <ul>
        <li data-value="">Choose One</li>
        <li>1</li> <li>2</li> <li>3</li> <li>4</li> <li>5</li> <li>6</li> <li>7</li> <li>8</li> <li>9</li> <li>10</li>
        <li>11</li> <li>12</li> <li>13</li> <li>14</li> <li>15</li> <li>16</li> <li>17</li> <li>18</li> <li>19</li> <li>20</li>
      </ul>
    </combo-box>
  </>
}

export function Asynchronous() {
  function srcFunc(search: string) {
    return fetch('https://dummyjson.com/products/search?q='+search)
      .then(res => res.json())
      .then(res => res.products || [])
  }

  return {
    render: () => <>
      <combo-box src={srcFunc}>
        <input placeholder="Search a product" style={{width: 800}}/>
        <ul>
          <li data-value="[[id]]-[[title]]">[[brand]] - [[description]]</li>
        </ul>
      </combo-box>
    </>
  }
}
