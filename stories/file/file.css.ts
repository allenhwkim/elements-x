export default /* css */ `
  x-file {
    display: inline-block;
    background: #F5F5F5;
    padding: 16px;
    border: 1px solid #F5F5F5;
    box-sizing: border-box;
  }

  x-file .x-file-input {
    cursor: pointer;
  }

  x-file .x-file-input input {
    display: none;
  }

  x-file .x-file-list {
    color: #666;
  }

  x-file .x-file-list .x-file { /* file info */
    display: flex;
    padding: 4px;
    position: relative;
    justify-content: space-between;
  }

  x-file .x-file-list .x-file:first-child {
    border-top: 1px solid #ccc;
  }

  x-file .x-file-list .x-file:not(:last-child) {
    border-bottom: 1px solid #ccc;
  }

  x-file .x-file-list .x-file .x-name {
    width: 50%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  x-file .x-file-list .x-file .x-preview {
    width: calc(50% - 40px);
  }
  x-file .x-file-list .x-file .x-preview img {
    width: auto;
    height: 1.5em;
    margin: 0 4px;
  }

  x-file .x-file-list .x-file .x-buttons * {
    border: 0;
    background: transparent;
    cursor: pointer;
  }
`;