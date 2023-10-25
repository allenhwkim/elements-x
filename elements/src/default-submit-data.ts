import { ISubmitData, IUserData } from "./form-stepper/types";

export const DEFAULT_SUBMIT_DATA: ISubmitData = {
  method: 'POST',
  url: 'https://reqbin.com/echo/post/json',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  payload: function(formUserData: IUserData): any {
    return { id: 78912 };
  },
  onSuccess: function(resp: Response) {
    alert('form submission success');
  },
  onError: function(error: Response) {
    alert('form submission error');
  }
};
