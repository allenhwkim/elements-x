import type { Meta } from '@storybook/html';
import css from '../../lib/css/index.css';
import { fixIndent } from '../../lib/util';

if (!document.querySelector(`style[x-css]`)) {
  document.head.insertAdjacentHTML('beforeend', `<style x-css>${css}</style>`);
}

const meta: Meta = { 
  title: 'With class \'x\'',
  tags: ['autodocs'],
  render: (args) => {
    const el = document.createElement('div') as any;
    (args.html) && (el.innerHTML = args.html);
    return el;
  },
  argTypes: {
    html: { 
      description: 'Custom html', 
      control: { type: 'text' },
    }
  },
};

export default meta;

export const Button = { 
  args: { 
    html: fixIndent(`
      <button x> Default </button>
      <button x class="primary"> Primary </button>
      <button x class="accent"> Accent </button>
      <button x disabled> Disabled </button>
      <button x class="no-style"> No Style </button>
      <button x class="no-style" disabled=""> No Style </button>
    `)
  }
};

export const Icon = { 
  args: { 
    html: fixIndent(`
    <button x class="icon">♥</button>
    <button x class="icon primary">♥</button>
    <button x class="icon accent">♥</button>
    <button x class="icon" disabled="">♥</button>
    <button x class="no-style">♥</button>
    <button x class="no-style" disabled="">♥</button>
    `)
  }
};

export const Tooltip = { 
  args: { 
    html: fixIndent(`
      <span x data-tooltip-left="This is a left tooltip">Help</span>
      <span x data-tooltip="This is a tooltip">Help</span>
      <span x data-tooltip="This is a tooltip with focus" tabindex="0">Help</span>
      <br><br>
    `)
  }
};

export const Checkbox = { 
  args: { 
    html: fixIndent(`
      <label>
        <input x type="checkbox" checked> Hello Checkbox
      </label>
    `)
  }
};

export const Radio = { 
  args: { 
    html: fixIndent(`
      <label>
        <input x type="radio" name="yes" checked>Yes
      </label>
      <label>
        <input x type="radio" name="yes">No
      </label>
      <br>
      <label>
        <input x type="radio" name="yes2" checked disabled>Yes
      </label>
      <label>
        <input x type="radio" name="yes2" disabled>No
      </label>
    `)
  }
};

export const Switch = { 
  args: { 
    html: fixIndent(`
    <label>
      <input x type="checkbox" role="switch" id="ms1">
      <span>Custom Setting 1</span>
    </label>
    <br>
    <label>
      <input x type="checkbox" role="switch" checked>
      <span>Custom Setting 2</span>
    </label>
    <br>
    <label>
      <input x type="checkbox" role="switch" disabled>
      <span>Disabled 1</span>
    </label>
    <br>
    <label>
      <input x type="checkbox" role="switch" checked disabled>
      <span>Disabled 2</span>
    </label>
    `)
  }
};

export const Table = { 
  args: { 
    html: fixIndent(`
      <table x>
        <tbody>
          <tr>
            <th>Name</th> <th>Type</th> <th>Data</th> <th>Description</th>
          </tr>
          <tr>
            <td>blur</td> <td>CustomEvent</td> <td></td> <td>Fired when out of focus</td>
          </tr>
          <tr>
            <td>change</td> <td>CustomEvent</td> <td>Object with detail</td> <td>Fired when content changes</td>
          </tr>
          <tr>
            <td>copy</td> <td>CustomEvent</td> <td>Object with detail</td> <td>Fired when contents copied</td>
          </tr>
          <tr>
            <td>focus</td> <td>CustomEvent</td> <td>Focus Event</td> <td>Fired when focused</td>
          </tr>
          <tr>
            <td>load</td> <td>CustomEvent</td> <td>ACE editor instance</td> <td>Fired when starts</td>
          </tr>
          <tr>
            <td>paste</td> <td>CustomEvent</td> <td>Object with detail</td> <td>Fired when contents pasted</td>
          </tr>
        </tbody>
      </table>
    `)
  }
};


export const PlainInput = { 
  args: { 
    html: fixIndent(`
      <label>
        <input type="text" value="Hello Textfield" placeholder="">
      </label>
      <label>
        <input type="text" placeholder="Enter your first name">
      </label>
      <label>
        <input type="text" value="Disabled" placeholder="Enter your first name" disabled>
      </label>
    `)
  }
};

export const TextfieldWithMovingLabel = { 
  args: { 
    html: fixIndent(`
      <label x textfield>
        <span class="label">First name</span>
        <input type="text" value="Hello Textfield" placeholder="">
      </label>
      <label x textfield>
        <span class="label">First name</span>
        <input type="text" placeholder="Enter your first name">
      </label>
      <label x textfield>
        <span class="label">First name</span>
        <input type="text" value="Disabled" placeholder="Enter your first name" disabled>
      </label>
    `)
  }
};

export const TextfieldWithoutMovingLabel = { 
  args: { 
    html: fixIndent(`
      <label x textfield>
        <input type="text" value="Hello Textfield" placeholder="">
      </label>
      <label x textfield>
        <input type="text" placeholder="Enter your first name">
      </label>
      <label x textfield>
        <input type="text" placeholder="Enter your first name" value="disabled" disabled>
      </label>
    `)
  }
};