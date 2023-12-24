import CustomNode from './CustomNode';
import StartNode from './StartNode';
import EndNode from './EndNode';
import SubmitNode from './SubmitNode';
import ThankyouNode from './ThankyouNode';
import './styles.css';

export const customNodeTypes: any = { 
  custom: CustomNode,
  start: StartNode,
  submit: SubmitNode,
  thankyou: ThankyouNode,
  end: EndNode,
};
