export interface IUserData {
  [key: string]: any; 
}
export interface IForm {
  type: 'form' | 'review' |  'submit' | 'thankyou';
  defaultValues?: {[key:string]: string},
  title?: string; // step name below circle
  subTitle?: string; // small text below title
  skippable?: boolean;
  html?: string | ((userData?) => string);
  getErrors?: (formElData: any) => string[] | undefined;
  submitFunc?: (userData: any) =>  Promise<any>;
}

export interface IForms {
  [key: string]: IForm;
}
