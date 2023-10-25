export default /*css*/ `
  input-mask {
    display: block;
  }

  input-mask {
    position: relative; /* mask will be positioned absolutely */
    margin-bottom: 12px;
  }

  input-mask input {
    font-family: monospace;
    background: transparent;
    padding: 4px;
    border: 1px solid #CCC;
  }

  input-mask .mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    font-family: monospace;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    border: 1px solid transparent;
    opacity: .3;
  }`;