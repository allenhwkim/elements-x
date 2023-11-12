import type { Meta } from '@storybook/html';
import { ComboBox } from '../../lib/combobox/combobox';
import { getFunction } from '../../lib/util';

const elName = 'x-combobox';
const className = ComboBox;

!customElements.get(elName) && customElements.define(elName, className);

const meta: Meta = { 
  title: 'Combobox',
  render: (args) => {
    const el = document.createElement(elName) as any;
    if (args.html) {
      el.insertAdjacentHTML('beforeend', args.html);
    }
    if (args.src) {
      el.src = getFunction(args.src);
    }
    if (args.width) {
      el.style.width = `${args.width}px`;
    }
    const divEl = document.createElement('div');
    const msgEl = document.createElement('div');
    divEl.appendChild(el);
    divEl.appendChild(msgEl);
    divEl.addEventListener('select', (event: any) => msgEl.innerText = `'select' event: ${JSON.stringify(event.detail)}`)
    return divEl as any;
  },
  args: {},
  argTypes: {
    html: { 
      description: 'combobox html, with input and ul', 
      control: { type: 'text' },
    },
    src: { 
      description: 'A property function to generate dynamic dropdown list which returns list of objects', 
      control: { type: 'text' },
    }
  },
};

export default meta;

export const Primary = { 
  args: {
    html: `
      <input placeholder="Choose one value" autoComplete="off" value="Hello World" />
      <ul>
        <li data-value="">Choose One</li>
        <li data-value="1">Hello</li>
        <li>Hello World</li>
        <li>Foo</li>
        <li className="disabled">Disabled</li>
        <li>Foo Bar</li>
      </ul>
    `.trim()
}};

export const Readonly = { 
  args: {
    html: `<input placeholder="Readonly dropdown" readOnly />`
  }
}

export const Disabled = { 
  args: {
    html: `<input placeholder="Disabled dropdown" disabled />`
  }
}

export const LongList = { 
  args: {
    html: `
      <input placeholder="Long list dropdown" autoComplete="off" value="13" />
      <ul>
        <li data-value="">Choose One</li>
        <li>1</li> <li>2</li> <li>3</li> <li>4</li> <li>5</li> <li>6</li> <li>7</li> <li>8</li> <li>9</li> <li>10</li>
        <li>11</li> <li>12</li> <li>13</li> <li>14</li> <li>15</li> <li>16</li> <li>17</li> <li>18</li> <li>19</li> <li>20</li>
      </ul>
    `.trim(),
  }
}

export const Asynchronous = {
  args: {
    width: 800,
    html: `
      <input placeholder="Search a product" />
      <ul>
        <li data-value="[[id]]-[[title]]">[[brand]] - [[description]]</li>
      </ul>
    `.trim(), 
    src: `
      function srcFunc(search) {
        return fetch('https://dummyjson.com/products/search?q='+search)
          .then(res => res.json())
          .then(res => res.products || [])
      }
    `.trim()
  }

}