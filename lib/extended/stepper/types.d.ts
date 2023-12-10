export interface IUserData {
  [key: string]: any; 
}

interface ISubmitFunc {
  (userData: any): Promise<any>;
}

export interface IForm {
  type: 'form' | 'review' | 'thankyou';
  defaultValues?: {[key:string]: string},
  title: string; // step name below circle
  subTitle?: string; // small text below title
  skippable?: boolean;
  html: string | ((userData?) => string);
  getErrors?: (formElData: any) => string[] | null;
}

export interface IForms {
  [key: string]: IForm;
}
