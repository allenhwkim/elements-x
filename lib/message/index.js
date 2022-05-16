import {addCss, removeCss} from '../common';

const css = `
x-message {
  position: fixed;
  margin: 0 auto;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
}

x-message > .message {
  transition: all .3s;
  background: #333;
  color: #FFF;
  margin: 4px;
  padding: 16px;
  border-radius: 4px;
  animation: fadein .5s;
  min-width: 200px;
}
x-message > .message.success {
  background: #006400;
}
x-message > .message.error {
  background: #D13101;
}

@keyframes fadein {
  from { opacity: 0; } to { opacity: 1; }
}`;

export function showMessage(message, options={}) {
  let msgContainer = document.querySelector('x-message');
  if (!msgContainer) {
    addCss({tagName: 'x-message'}, css);
    msgContainer = document.createElement('x-message');
    document.body.appendChild(msgContainer);
  }

  const msgEl = document.createElement('div');
  msgEl.classList.add('message');
  options.type && msgEl.classList.add(options.type);
  msgEl.innerText = message;
  msgContainer.appendChild(msgEl);

  // Delete message after 5 seconds
  setTimeout(_ => {
    msgEl.style.opacity = '0';
    setTimeout(_ => {
      msgEl.remove();
      if (msgContainer.children.length === 0) {
        msgContainer.remove();
        removeCss({tagName: 'x-message'});
      }
    }, 300);
  }, options.duration || 5000);
}
