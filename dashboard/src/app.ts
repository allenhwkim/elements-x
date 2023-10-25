import type { IForm } from "./global";
import type { ReactFlowJsonObject, Node } from 'reactflow';
import { DEFAULT_HTML, FormDesigner } from "@formflow/elements/src";

function getSteps(chartData: ReactFlowJsonObject, selectedNode: Node): string[] {
  const steps = [selectedNode.id];
  const getNodeById = (id: string) => chartData.nodes.find(node => node.id === id);
  const getOutgoingNodes = (node: Node) => {
    const outgoingEdges = chartData.edges.filter(edge => edge.source === node.id);
    return outgoingEdges.map(edge => getNodeById(edge.target))
  }
  const getIncomingNodes = (node: Node) => {
    const incomingEdges = chartData.edges.filter(edge => edge.target === node.id);
    return incomingEdges.map(edge => getNodeById(edge.source))
  }

  let outgoingNodes = getOutgoingNodes(selectedNode);
  while (outgoingNodes.length) {
    const node = outgoingNodes[0];
    steps.push(node.id)
    outgoingNodes = getOutgoingNodes(node);
  }

  let incomingNodes = getIncomingNodes(selectedNode);
  while (incomingNodes.length) {
    const node = incomingNodes[0];
    steps.unshift(node.id)
    incomingNodes = getIncomingNodes(node);
  }

  return steps;
}

function getForms(chartData: ReactFlowJsonObject, steps: string[]): any {
  const forms = {};
  steps.forEach( (nodeId: string) => {
    const node = chartData.nodes.find(el => el.id === nodeId)
    forms[nodeId] = {
      type: 
        node.data?.label.indexOf('Review') !== -1 ? 'review' : 
        node.data?.label.indexOf('Thankyou') !== -1 ? 'submit' : 'form',
      title: node.data?.label,
      html: '',
      defaultValues: {},
      skippable: true,
      getErrors: null
    } as IForm; // TODO
  });
  return forms;
}

export function setForm(chartData: ReactFlowJsonObject, selectedNode: Node, html?: string) {
  html ||= DEFAULT_HTML;

  const steps = getSteps(chartData, selectedNode).slice(1, -1);
  const forms = getForms(chartData, steps);
  const currentStepId = selectedNode.id;
  const formDesigner = document.querySelector('form-designer') as FormDesigner;
  formDesigner.setHtml(html);
  // this can be removed since it's coded in <form-stepper>
  formDesigner.setStyle('form.form-flow {min-height: 320px;} form-controller {display: block;}')
  formDesigner.runCommand('set-forms-steps', {forms, steps, currentStepId})
}

