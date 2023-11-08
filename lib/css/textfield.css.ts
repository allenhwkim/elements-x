export default  `
  [x][textfield] {
    position: relative;
    display: inline-block;
    padding: 1em 8px 0 4px;
    border-bottom: 1px solid #ccc;
    background: #f8f8f8
  }

  /** 
   * with label and with value, 
   * input with value
   */
  [x][textfield] .label {
    position: absolute;
    pointer-events: none;
    box-sizing: border-box;
    cursor: text;
    user-select: none;
    left: 4px;
    width: 100%;
    z-index: 1;
    color: #888;
    transition: 0.2s ease all;
    top: 2px;
    font-size: 12px;
  }
  [x][textfield] input {
    width: 100%;
    outline: none;
    border: none;
    height: 26px;
    font-size: 1em;
    background: transparent;
  }
  [x][textfield]::after {
    position: absolute;
    display: block;
    content: '';
    bottom: 0;
    left: calc(50% - 5px);
    height: 2px;
    width: 10px;
    visibility: hidden;
    background-color: #8e44ad;
  }
  [x][textfield]:has(input:focus)::after {
    left: 0;
    width: 100%;
    visibility: visible;
    transition: 0.2s ease all;
  }

  /** 
   * placeholder shown
   */
  [x][textfield]:has(input:placeholder-shown):has(input:not(:focus)) .label {
    font-size: 16px;
    top: 16px;
  }
  [x][textfield]:has(input:placeholder-shown):has(input:not(:focus)) input {
    opacity: 0;
  }

  /* disabled */
  [x][textfield]:has(input:disabled) {
    pointer-events: none;
    opacity: 0.5;
  }

  /* witout label */
  [x][textfield]:not(:has(.label)) {
    padding: 0 8px 0 4px;
  }
  `;
