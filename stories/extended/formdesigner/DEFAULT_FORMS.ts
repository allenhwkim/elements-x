import { IForms } from '../../../lib/extended/stepper/types';

export const DEFAULT_FORMS: IForms = {
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
