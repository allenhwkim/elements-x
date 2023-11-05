
import type { Meta } from '@storybook/html';
import { Pagination } from './pagination';

const elName = 'x-pagination';
const className = Pagination;

!customElements.get(elName) && customElements.define(elName, className);

const meta: Meta = { 
  title: 'Pagination',
  render: (args) => {
    const wrapperEl: any = document.createElement('div');
    const el = document.createElement(elName) as any;
    const msgEl = document.createElement('div');
    args.total && el.setAttribute('total', args.total);
    args.page && el.setAttribute('page', args.page);
    args.numPerPage && el.setAttribute('num-per-page', args.numPerPage);
    args.numPageLinks && el.setAttribute('num-page-links', args.numPageLinks);
    wrapperEl.append(el, msgEl);
    wrapperEl.addEventListener('select', (e:any) =>  msgEl.innerHTML = `event 'select':<pre>${JSON.stringify(e.detail)}</pre>`);
    return wrapperEl;
  },
  args: {},
  argTypes: {
    total: { 
      description: `Total number of rows`, 
      control: { type: 'range', min: 10, max: 1000, step: 1 },
      table: { defaultValue: { summary: 100 } },
    },
    page: { 
      description: `Selected page`, 
      control: { type: 'range', min: 1, max: 1000, step: 1 },
      table: { defaultValue: { summary: 1 } },
    },
    numPerPage: { 
      description: `Number of rows per page`, 
      control: { type: 'range', min: 1, max: 100, step: 1 },
      table: { defaultValue: { summary: 10 } },
    },
    numPageLinks: { 
      description: 'Number of pages available to click', 
      control: { type: 'range', min: 1, max: 10, step: 1 },
      table: { defaultValue: { summary: 5 } },
    },
  },
};

export default meta;

export const Primary = {};
export const Custom = {
  args: { 
    total: 500,
    page: 8,
    numPerPage: 20,
    numPageLins: 7
  }
}