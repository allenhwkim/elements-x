export default /* css */ `
  x-input-file {
    display: inline-block;
    background: #F5F5F5;
    padding: 16px;
    border: 1px solid #F5F5F5;
    box-sizing: border-box;
  }

  x-input-file .x-file-input {
    cursor: pointer;
  }

  x-input-file .x-file-input input {
    display: none;
  }

  x-input-file .x-file-list {
    color: #666;
  }

  x-input-file .x-file-list .x-file { /* file info */
    display: flex;
    padding: 4px;
    position: relative;
    justify-content: space-between;
  }

  x-input-file .x-file-list .x-file:first-child {
    border-top: 1px solid #ccc;
  }

  x-input-file .x-file-list .x-file:not(:last-child) {
    border-bottom: 1px solid #ccc;
  }

  x-input-file .x-file-list .x-file .x-name {
    width: 50%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  x-input-file .x-file-list .x-file .x-preview {
    width: calc(50% - 40px);
  }
  x-input-file .x-file-list .x-file .x-preview img {
    width: auto;
    height: 1.5em;
    margin: 0 4px;
  }

  x-input-file .x-file-list .x-file .x-buttons * {
    border: 0;
    background: transparent;
    cursor: pointer;
  }
`;