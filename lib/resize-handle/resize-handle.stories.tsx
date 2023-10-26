import * as React from 'react';
import './resize-handle.stories.css';
import { useEffect } from 'react';
import { TouchSwipe } from '../../lib';

import { ResizeHandle } from "../index"; 
!customElements.get('resize-handle') && customElements.define('resize-handle', ResizeHandle);

export default {
  title: 'resize-handle',
  component: ResizeHandle,
};

export const Primary = () => {
  // const myRef = useRef(null);
  const touchStart = {left: 0, top: 0};
  const touchListener =  (event) => {
    const {type, x0, y0, x1, y1, x2, y2, distanceX, distanceY, distance} = event.detail;
    const {duration, speed, distance0, duration0, speed0, touchStaEl, orgEvent } = event.detail;
    if (!touchStaEl.classList.contains('draggable')) return;

    const [dx, dy] = [x2 - x0, y2 - y0];
    if (type === 'start') {
      touchStaEl.style.userSelect = 'none';
      touchStart.top  = touchStaEl.offsetTop;
      touchStart.left = touchStaEl.offsetLeft;
      document.querySelectorAll('.draggable').forEach(el => (el as any).style.zIndex = '');
      touchStaEl.style.zIndex = 1;
    }
    if (type === 'move') {
      touchStaEl.style.top = `${touchStart.top + dy}px`;
      touchStaEl.style.left = `${touchStart.left + dx}px`;
    }
    if (type === 'end') {
      touchStaEl.style.userSelect = 'none';
    } 
  }

  useEffect(() => {
    document.querySelectorAll('.draggable').forEach(el => new TouchSwipe(el as any));
    
    document.addEventListener('x-swipe', touchListener);
    return () => document.removeEventListener('x-swipe', touchListener);
  }, []); // This runs only on mount (when the component appears)

  return <div style={{height: 200}}>
    <div className="border-solid flex-center draggable" 
      style={{position: 'absolute', width: '400px', height: '100px', background: '#FFF'}}>
      Resizable DIV
      <resize-handle top left></resize-handle>
      <resize-handle top right></resize-handle>
      <resize-handle bottom left></resize-handle>
      <resize-handle bottom right></resize-handle>
    </div>
    <div className="border-solid flex-center draggable" 
      style={{position: 'absolute', width: '400px', height: '100px', top: '90px', left: '50px',  background: '#FFF'}}>
      Resizable DIV
      <resize-handle bottom right></resize-handle>
    </div>
  </div>
}; 

