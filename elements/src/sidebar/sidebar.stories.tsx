import * as React from 'react';

import { SideBar } from "../index"; 
!customElements.get('side-bar') && customElements.define('side-bar', SideBar);

export default { title: 'side-bar', component: SideBar };

export const Primary = (args?: any) => {
  const container: any = React.useRef();
  const message: any = React.useRef();
  
  React.useEffect(() => {
    container.current.addEventListener('sidebar', (e:any) => {
      const action = e.detail.innerText ? 'sidebar-select' : e.detail;
      message.current.innerText = `${action} ${e.detail?.innerText?.split('\n')[0] || ''}`;
    });
  }, []);

  function alertMe() {
    alert('Only working without sidebar open')
  }

  return <div ref={container}>
    <button data-x-target="sidebar" 
     style={{border: 0, fontSize: '32px', background: 0, color: '#666', cursor: 'pointer'}}
    >☰</button>
    <pre ref={message}></pre>
    <a onClick={alertMe}>Test alert()</a>
    <side-bar>
      <div>
        <span>Content</span>
        <button className="close-button">×</button>
      </div>
      <ul>
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
        <li>
          Dropdown
          <ul>
            <li>Link 1</li>
            <li>Link 2</li>
            <li>Link 3</li>
          </ul>
        </li>
        <li>Support</li>
      </ul>
    </side-bar>
  </div>;
}; 
