export default `
#gjs-tools > .bs-pad > * {
  position: absolute;
  background-color: #2679fb;
  border-radius: 200px;
  pointer-events: all;
  opacity: 0.2;
  cursor: pointer;
}

#gjs-tools > .bs-pad > *:hover {
  opacity: 1;
}

#gjs-tools > .bs-pad > .top {
  width: 24px;
  height: 8px;
  left: calc(50% - 12px);
  top: 4px;
}

#gjs-tools > .bs-pad > .bottom {
  width: 24px;
  height: 8px;
  left: calc(50% - 12px);
  bottom: 4px;
}

#gjs-tools > .bs-pad > .left {
  width: 8px;
  height: 24px;
  left: 4px;
  bottom: calc(50% - 12px);
}

#gjs-tools > .bs-pad > .right {
  width: 8px;
  height: 24px;
  right: 4px;
  bottom: calc(50% - 12px);
}`;
