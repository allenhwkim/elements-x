export default /*css*/ `
  side-bar {
    min-width: 200px;
    padding: 12px;
    background-color: #fff;
    position: fixed;
    z-index: 1;
    overflow: auto;
    top: 0;
    left: -100%;
    height: 100%;
    transition: all 0.5s ease;
    box-shadow: 0 4px 10px 0 #333;
  }
  side-bar.visible {
    left: 0;
  }
  side-bar .close-button {
    border: none;
    position: absolute;
    right: 0;
    font-size: 1.5rem;
    background: none;
    color: #666;
    top: 0;
    cursor: pointer;
    padding: .5rem;
  }
`;