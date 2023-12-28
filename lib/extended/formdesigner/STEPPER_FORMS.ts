import { DEFAULT_SUBMIT_FUNC } from '../stepper/DEFAULT_SUBMIT_FUNC';
import { IForms } from '../stepper/types';

export const STEPPER_FORMS: IForms = {
  Name: {
    type: 'form',
  }, 
  Contact: {
    type: 'form',
    skippable: true,
  }, 
  Review: {
    type: 'review',
  }, 
  Submit: {
    type: 'submit',
    submitFunc: DEFAULT_SUBMIT_FUNC
  }, 
  Thankyou: {
    type: 'thankyou',
  }
};
