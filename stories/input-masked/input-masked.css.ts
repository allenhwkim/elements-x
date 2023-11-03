export default /*css*/ `
  x-input-masked {
    display: block;
  }

  x-input-masked {
    position: relative; /* mask will be positioned absolutely */
    margin-bottom: 12px;
  }

  x-input-masked input {
    font-family: monospace;
    background: transparent;
    padding: 4px;
    border: 1px solid #CCC;
  }

  x-input-masked .mask {
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