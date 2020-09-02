import { Component, HostBinding, EventEmitter, Input, Output, HostListener } from '@angular/core';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'ee-file',
  template: `
    <label class="label">
      <input class="input" type="file" multiple (change)="fileSelected($event)" />
      <ng-content></ng-content>
    </label>
    <div *ngIf="showList">
      <div class="list" *ngFor="let file of files; let i=index">
        <div class="name">{{file.name}}</div>
        <div class="size" title="{{file.type}}">{{formatSize(file.size)}}</div>
        <img class="preview" src="{{file.dataURL}}" />
        <div class="buttons">
          <button class="delete" (click)="files.splice(i, 1)">🗑</button>
          <button class="upload" [disabled]="file.progress" (click)="upload(file)">⇧</button>
        </div>
        <div class="progress" [style.width]="file.progress"></div>
      </div>
    </div>
  `,
  styles: [`
    .label {
      display: block;
      cursor: grab;
      background: #F5F5F5;
      padding: 1em;
      border: 1px solid #F5F5F5;
      box-sizing: border-box;
    }
    :host .label:hover,
    :host.dragover .label {
      background: #FFF;
      border: 1px solid #CCC;
    }
    .input[type="file"] {
      display: none;
    }
    .list {
      margin: 8px 0;
      display: flex;
      background: #F5F5F5;
      padding: 8px;
      position: relative;
      justify-content: space-between;
    }
    .list .preview {
      max-width: 60px;
      max-height: 40px;
    }
    .list .buttons * {
      border: 0;
      background: transparent;
    }
    .list .buttons .upload {
      font-size: 1.1em;
    }
    .list .progress {
      position: absolute;
      left: 0;
      bottom: 0;
      height: 2px;
      transition: width .3s;
      background: red;
    }
  `]
})
export class FileComponent  {
  @HostBinding('class.dragover') dragover: boolean;
  @HostListener('dragover', ['$event']) onDragOver(evt) { this.setDragover(evt, true); }
  @HostListener('dragleave', ['$event']) onDragLeave(evt) { this.setDragover(evt, false); }

  @Input() showList = true;
  @Input() uploadFn;

  @Output() filesChanged = new EventEmitter<any>();
  @HostListener('drop', ['$event'])
  @HostListener('paste', ['$event']) onpaste(evt) {
    this.setDragover(evt, false);
    this.changeFiles(evt);
  }

  files = [];

  constructor(private http: HttpClient) {}

  setDragover(evt, value) {
    evt.preventDefault();
    evt.stopPropagation();
    this.dragover = value;
  }

  fileSelected(event) {
    this.changeFiles(event);
  }

  changeFiles(evt) {
    const files = [...(
        evt.dataTransfer ||  // drag and drop
        evt.clipboardData || // copy and paste
        evt.target           // open and select
      ).files];
    this.files = this.files.concat(files);
    this.files.forEach(async file => file.dataURL = await this.readURL(file))
    files.length > 0 && this.filesChanged.emit(files);
  }

  private readURL(file) {
    return new Promise((res, rej) => {
      const reader = new FileReader();
      reader.onload = e => res(e.target.result);
      reader.onerror = e => rej(e);
      reader.readAsDataURL(file);
    });
  }

  formatSize(bytes: number, decimalPoint: number = 2) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1000));
    return parseFloat((bytes / Math.pow(1000, i))
      .toFixed(decimalPoint)) + ' ' + sizes[i];
  }

  upload(file) {
    this.uploadFn(file).subscribe(resp => {
      if (resp.type === HttpEventType.UploadProgress) { // 1
        file.progress = Math.round(100 * resp.loaded / resp.total) + '%';
      } else if (resp instanceof HttpResponse) {
        console.log('....upload', resp)
      }
    });
  }
}
