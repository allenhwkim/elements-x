import { IForms } from "./form-stepper/types";

export const DEFAULT_FORMS: IForms = {
  form1: {
    type: 'form',
    title: 'Name',
    html: () => `
      <style>form.error-checked :invalid {outline: 1px solid red;}</style>
      First Name: <input name="first" required> <br>
      Last Name: <input name="last" required>
      <br>
      <input type="radio" name="my-radio" value="1" required> option 1
      <input type="radio" name="my-radio" value="2" required> option 2
      <br>
      <input type="checkbox" name="my-check" required> check
    `,
    getErrors: function(data: any) {
      if (data.first !== data.last) {
        return ['first and last name must be the same'];
      }
      return null;
    } 
  }, 
  form2: {
    type: 'form',
    title: 'Contact',
    skippable: true,
    html: () => `Optional: <br/>  Address: <input name="address" />`,
  }, 
  form3: {
    type: 'review',
    title: 'Review',
    html: () => `Optional: <br/>  Address: <input name="address" />`,
  }, 
  form4: {
    type: 'submit',
    title: 'Thankyou',
    html: () => `This is a review page.`,
  }
};
