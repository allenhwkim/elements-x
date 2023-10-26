import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { DEFAULT_FORMS } from '../default-forms';
import { AppStorage, DEFAULT_SUBMIT_DATA, FormController, FormStepper } from "../index"; // Shares the same FormController

!customElements.get('form-stepper') && customElements.define('form-stepper', FormStepper);
!customElements.get('form-controller') && customElements.define('form-controller', FormController);

export default {
  title: 'form-stepper',
  component: FormStepper,
};

export const Primary = (args?: any) => {
  const storageUserData = AppStorage.getItem('currentFormflow.userData');
  AppStorage.setItem('currentFormflow.submitData', DEFAULT_SUBMIT_DATA);
  
  const [userData, setUserData] = useState(storageUserData);
  const clearStorage = () => {
    sessionStorage.clear(); 
    localStorage.clear(); 
    setUserData('');
  };
  window.addEventListener('app-storage', (event: any) => setUserData(JSON.stringify(event.detail.data)));

  const formStepper = useRef<any>();
  useEffect(() => { formStepper.current.forms = DEFAULT_FORMS })

  return <form-controller style={{display:'block', width:800, margin: '0 auto'}}>
    <form-stepper ref={formStepper}></form-stepper>  {/* forms={myForm} */}

    <div className="form-flow form-errors" style={{padding: 16}}>
      Error goes here
    </div>
    <form className="form-flow" style={{border: '1px dashed', padding: 16}}>
      Form goes here.
    </form>
    <div className="form-flow form-buttons" style={{border: '1px dashed', padding: 16}}>
      <button className="form-prev">Prev</button>
      <button className="form-next">Next</button>
      <button className="form-review">Review</button>
      <button className="form-submit">Submit</button>
    </div>
    {/* <pre className="user-form-data"> {userData} </pre> */}
    <button className="clear-user-form-data" onClick={clearStorage}>Clear storage</button>
  </form-controller>
}; 
