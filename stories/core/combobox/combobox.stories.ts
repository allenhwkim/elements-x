import type { Meta } from '@storybook/html';
import { ComboBox } from '../../../lib/core/combobox/combobox';
import { getFunction } from '../../../lib/util';

const elName = 'x-combobox';
const className = ComboBox;

!customElements.get(elName) && customElements.define(elName, className);

const meta: Meta = { 
  title: 'Core/Combobox',
  render: (args) => {
    const el = document.createElement(elName) as any;
    args.html     && (el.insertAdjacentHTML('beforeend', args.html));
    args.dataUrl  && (el.setAttribute('data-url', args.dataUrl));
    args.dataPath && (el.setAttribute('data-path', args.dataPath));
    args.width    && (el.style.width = `${args.width}px`);
    args.dataFunction && (el.dataFunction = getFunction(args.dataFunction))
    args.dataList && (el.dataList = JSON.parse(args.dataList));
    args.selectExpr && (el.setAttribute('select-expr', args.selectExpr));
    args.displayExpr && (el.setAttribute('display-expr', args.displayExpr));

    const divEl = document.createElement('div');
    const msgEl = document.createElement('div');
    divEl.append(el, msgEl);
    divEl.addEventListener('select', (event: any) => {
      msgEl.innerText = `'select' event: ${JSON.stringify(event.detail)}`
    })
    if (args.dataFunction || args.dataList) {
      const preEl = document.createElement('pre');
      preEl.style.padding = '1rem';
      preEl.innerText = args.dataFunction || args.dataList;
      divEl.append(preEl);
    }
    return divEl as any;
  },
  args: {},
  argTypes: {
    html: { 
      description: 'combobox html, with input and ul', 
      control: { type: 'text' },
    },
    dataUrl: { 
      description: 'Data source url. e.g. "https://dummyjson.com/products/search?q={{q}}"', 
      control: { type: 'text' },
    },
    dataPath: {
      description: 'List of dropdown data path from API response, e.g. "products"', 
      control: { type: 'text' },
    },
    dataFunction: {
      description: 'Data source function, e.g. "function srcFunc(search) { .... }"',
      control: { type: 'text' },
    },
    dataList: {
      description: 'Data source list, e.g. "{1:"Foo", 2:"Bar", 3:"Baz"}"',
      control: { type: 'text' },
    },
    selectExpr: {
      description: 'expression for selecting a list. e.g. "{{key}}"',
      control: { type: 'text' },
    },
    displayExpr: {
      description: 'expression for displaying a list. e.g. "{{name}}-{{title}}"',
      control: { type: 'text' },
    }
  },
};

export default meta;

export const Primary = { 
  args: {
    html: `
      <input placeholder="Choose one value" value="1" autoComplete="off" />
      <ul>
        <li data-value="">Choose One</li>
        <li data-value="1">Hello</li>
        <li value="2">World</li>
        <li>Foo</li>
        <li>Bar</li>
        <li class="disabled">Disabled</li>
      </ul>
    `.trim()
}};

export const Readonly = { 
  args: {
    html: `<input placeholder="Readonly dropdown" value="Hello" readOnly />`
  }
}

export const Disabled = { 
  args: {
    html: `<input placeholder="Disabled dropdown" value="Hello" disabled />`
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

export const Countries = {
  args: {
    width: 800,
    html: `
      <input placeholder="Search a country" value="CA" autocomplete="false"/>
    `.trim(), 
    dataUrl: '/countries.json',
    dataPath: 'countries',
    selectExpr: '{{code}}',
    displayExpr: '{{code}}-{{name}}',
  }
}

export const Products = {
  args: {
    width: 800,
    html: `
      <input placeholder="Select a product" class="w-100"/>
    `.trim(), 
    dataUrl: 'https://dummyjson.com/products/search?q={{q}}',
    dataPath: 'products',
    selectExpr: '{{id}}',
    displayExpr: '{{brand}} - {{description}}',
  }
}

export const Address = {
  args: {
    width: 800,
    html: `<input placeholder="Enter your address" class="w-100" />`.trim(), 
    dataUrl: 'https://ws1.postescanada-canadapost.ca/AddressComplete/Interactive/Find/v2.10/json3ex.ws?Key=BY16-DC53-PE57-KH95&SearchTerm={{q}}',
    dataPath: 'Items',
    displayExpr: '{{Text}} {{Description}}',
  }
}

export const DataList1 = {
  args: {
    width: 800,
    html: `<input placeholder="Select province" value="ON" />`.trim(), 
    selectExpr: '{{key}}',
    displayExpr: '{{key}} - {{value}}',
    dataList: JSON.stringify({
      AB : 'Alberta',
      BC : 'British Columbia',
      MB : 'Manitoba',
      NB : 'New Brunswick',
      NL : 'Newfoundland and Labrador',
      NS : 'Nova Scotia',
      NT : 'Northwest Territories',
      NU : 'Nunavut',
      ON : 'Ontario',
      PE : 'Prince Edward Island',
      QC : 'Québec',
      SK : 'Saskatchewan',
      YT : 'Yukon'
    }, null, '  '),
  }
}

export const DataList2 = {
  args: {
    width: 800,
    html: `<input placeholder="Select one" />`.trim(), 
    dataList: JSON.stringify([
      {id: 1, name:  'One'}, {id: 2, name:  'Two'}, {id: 3, name:  'Three'}, {id: 4, name:  'Four'}, {id: 5, name:  'Five'},
    ], null, '  '),
    selectExpr: '{{id}}',
    displayExpr: '{{id}} - {{name}}',
  }
}

export const CustomFunction = {
  args: {
    width: 800,
    html: `<input placeholder="Search a product" />`.trim(), 
    dataFunction: `
function srcFunc(search) {
  return fetch('https://dummyjson.com/products/search?q='+search)
    .then(res => res.json())
    .then(res => res.products || [])
}`.trim(),
    selectExpr: '{{id}}',
    displayExpr: '{{brand}} - {{description}}',
  }

}