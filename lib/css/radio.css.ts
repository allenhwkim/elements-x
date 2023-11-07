export default /*css*/ `
  input[x][type=radio] {
    width: 20px;
    height: 20px;
    box-sizing: border-box;
    position: relative;
    vertical-align: text-bottom
  }

  input[x][type=radio]::after {
    position: absolute;
    top: 0;
    left: 0;
    box-sizing: border-box;
    content: " ";
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: #fff;
    border: 1px solid #333
  }

  input[x][type=radio]:checked::after {
    background: #3751b5;
    box-shadow: inset 0 0 0 2px #fff
  }

  input[x][type=radio]:disabled::after {
    opacity: .5
  }`;