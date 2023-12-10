import type { Meta } from '@storybook/html';
import { Dropdown } from '../../../lib/core/dropdown/dropdown';
import { List } from '../../../lib/core/list/list';
import { Calendar } from '../../../lib/core/calendar/calendar';
import { fixIndent } from '../../../lib/util';

const elName = 'x-dropdown';
const className = Dropdown;

!customElements.get(elName) && customElements.define(elName, className);
!customElements.get('x-list') && customElements.define('x-list', List);
!customElements.get('x-calendar') && customElements.define('x-calendar', Calendar);

const meta: Meta = { 
  title: 'Core/Dropdown'
};

export default meta;

export const Primary = { 
  render: () => fixIndent(`
    <div style="position:relative">
      <button>Show dropdown</button>
      <x-dropdown class="p-4">
        Dropdown contents. <br/>
      </x-dropdown>
      <br/>
      1. When button focused, dropdown will open<br/>
      2. When button lose focus, dropdown will close<br/>
      3. When click inside dropwown, dropdown remains open. <br/>
      4. When click outside dropdown, dropdown will close. <br/>
    </div>
  `)
};

export const SelectList = { 
  render: () => fixIndent(`
    <div style="position:relative">
      <input placeholder="Click to see list"/>
      <x-dropdown>
        <x-list>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </ul>
        </x-list>
      </x-dropdown>
    </div>
  `)
};

export const SelectDate = { 
  render: () => fixIndent(`
    <div style="positoin:relative">
      <input placeholder="Select date"/>
      <x-dropdown>
        <x-calendar style="width: 400px;"><x-calendar>
      </x-dropdown>
    </div>
  `)
};