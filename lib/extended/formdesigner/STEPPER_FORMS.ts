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
  Thankyou: {
    type: 'submit',
  }
};
