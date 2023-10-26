export interface IUserData {
  [key: string]: any; 
}

export interface ISubmitData {
  method: 'GET' | 'POST';
  url: string;
  headers?: {
    [key: string]: string;
  },
  payload: (userData: any) => any;
  onSuccess?: (resp: Response) => void;
  onError?: (resp: Response) => void;
}

export interface IForm {
  type: 'form' | 'review' | 'submit';
  defaultValues?: {[key:string]: string},
  title: string; // step name below circle
  subTitle?: string; // small text below title
  skippable?: boolean;
  html: string | (() => string);
  getErrors?: (formElData: any) => string[] | null;
}

export interface IForms {
  [key: string]: IForm;
}
