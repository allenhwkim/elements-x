import { IForms } from '../../../lib/extended/stepper/types';

export const DEFAULT_FORMS: IForms = {
  Name: {
    type: 'form',
    html: () => ``,
  }, 
  Contact: {
    type: 'form',
    skippable: true,
    html: () => `Optional: <br/>  Address: <input name="address" />`,
  }, 
  Review: {
    type: 'review',
    html: () => `Optional: <br/>  Address: <input name="address" />`,
  }, 
  Thankyou: {
    type: 'submit',
    html: () => `This is a review page.`,
  }
};
