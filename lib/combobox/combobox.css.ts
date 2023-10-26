export default /*css*/ `
  combo-box {
    display: inline-block;
    position: relative;
  }

  combo-box:focus-within ul {
    display: block;
  }
  
  combo-box input {
    min-width: 200px;
    min-height: 32px;
    padding: 0 20px 0 4px;
    border: 1px solid #CCC;
    background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z' fill='%23666' /><path d='M0 0h24v24H0z' fill='none'/></svg>");
    background-repeat: no-repeat;
    background-position-x: 100%;
    background-position-y: 50%;
    border-radius: 4px;
    box-sizing: border-box;
  }

  combo-box input:read-only {
    pointer-events: none;
  }

  combo-box ul {
    display: none;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    border: 1px solid #ccc;
    position: absolute;
    min-width: 200px;
    max-height: 200px;
    white-space: nowrap;
    background: #FFF;
    overflow: auto;
    z-index: 1;
  }

  combo-box ul > :is(.x-highlighted, :hover) {
    background: #529FFF;
    color: #FFF;
  }
  combo-box ul:empty {
    display: none;
  }

  combo-box ul > * {
    line-height: 26px;
    padding: 0 2px;
  }
  combo-box ul > li.disabled {
    pointer-events: none;
  }

  combo-box ul > .x-selected:before {
    content: '✓ ';
  }
`;
