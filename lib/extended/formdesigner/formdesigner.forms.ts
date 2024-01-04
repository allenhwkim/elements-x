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
    submitFunc: function(userData) {
      return window.fetch('https://httpbin.org/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      }).then(resp => resp.json())
      .then(resp => console.info('submitted to https://httpbin.org/post'))
    },
  }, 
  Thankyou: {
    type: 'thankyou',
  }
};
