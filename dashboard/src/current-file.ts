import type { FormDiagram } from '@formflow/elements/src';
import { AppStorage } from '@formflow/elements/src';
import type { Node, Edge } from 'reactflow';

const startNodeProps = {
  headTags: [
    '<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>',
    '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" />',
    '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" />',
    '<link rel="stylesheet" href="/custom-elements.css" />',
  ],
}

const DEFAULT_CHART =  {
  nodes:[
    {id: 'start',  type: 'start',  data: {label: 'start', props: startNodeProps}, deletable: false, position: { x: 100, y: 0 }},
    {id: 'page1',  type: 'custom', data: {label: 'page1'}, position: { x: -150, y: 150 }},
    {id: 'page2',  type: 'custom', data: {label: 'page2'}, position: { x: 100, y: 150 }},
    {id: 'page3',  type: 'custom', data: {label: 'page3'}, position: { x: 350, y: 150 }},
    {id: 'review', type: 'custom', data: {label: 'review'}, position: { x: 100, y: 300 }},
    {id: 'submit', type: 'custom', data: {label: 'submit', type: 'submit'}, position: { x: 100, y: 450 }},
    {id: 'end',    type: 'end',    data: {label: 'end'}, deletable: false, position: { x: 100, y: 600 }},
  ] as Node[],
  edges: [
    {id: 'start-page1', source: 'start', target: 'page1', type: 'custom', label: 'if weekday'},
    {id: 'start-page2', source: 'start', target: 'page2', type: 'custom', label: 'if Saturday'},
    {id: 'start-page3', source: 'start', target: 'page3', type: 'custom', label: 'if Sunday'},
    {id: 'page1-review', source: 'page1', target: 'review', type: 'custom'},
    {id: 'page2-review', source: 'page2', target: 'review', type: 'custom'},
    {id: 'page3-review', source: 'page3', target: 'review', type: 'custom'},
    {id: 'review-submit', source: 'review', target: 'submit', type: 'custom'},
    {id: 'submit-end', source: 'submit', target: 'end', type: 'custom'},
  ] as Edge[]
};

export class CurrentFile {
  static DEFAULT_NAME = 'Untitled';
  static DEFAULT_CHART =  DEFAULT_CHART;

  storage: any;
  chartEl: FormDiagram

  _chart: any;
  get chart() { return this._chart; }
  set chart(val) { 
    this._chart = val; 
  }

  _name: string;
  get name() { return this._name; }
  set name(val) { 
    this._name = val; 
    AppStorage.setItem('currentFormflow.name', val);
  }

  _modified = false; // set to true when modified a form
  get modified() { return this._modified; }
  set modified(val) { 
    this._modified = val; 
    AppStorage.setItem('currentFormflow.modified', val);
  }

  _selected: any;
  get selected() { return this._selected; }
  set selected(val) { 
    this._selected = val; 
    AppStorage.setItem('currentFormflow.selected', val);
  }

  constructor(form?, chartEl?) {
    if (form) {
      this.name = form.name;
      this.chart = form.chart;
    } else if (AppStorage.getItem('currentFormflow')) {
      this.name = AppStorage.getItem('currentFormflow.name');
      this.chart = AppStorage.getItem('currentFormflow.chart');
    } else {
      this.name = CurrentFile.DEFAULT_NAME; 
      this.chart = CurrentFile.DEFAULT_CHART;
    }
    this.setChartEl(chartEl);
  }

  setChartEl(el: FormDiagram) {
    this.chartEl = el;
    if (this.chartEl) {
      this.chartEl?.setData(this.chart);
    }
  }

  save() {
    const allFormflows = AppStorage.getItem('formflows') || []; // returns array
    const index = allFormflows.findIndex( (el:any) => el.name === this.name);
    this.chart = this.chartEl.getData();
    const formflow = {name: this.name, chart: this.chart};
    if (index === -1) {
      AppStorage.setItem(`formflows[${allFormflows.length}]`, formflow);
    } else {
      AppStorage.setItem(`formflows[${index}]`, formflow);
    }
    this.modified = false;
  }

  saveAs(key: string) {
    this.name = key;
    this.save();
  }
}