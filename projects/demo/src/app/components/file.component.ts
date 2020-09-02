import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ElementsExtendedModule } from '../../../../lib/src';

export const usage = {
  template: `<ee-file>Select File</ee-file>`,
  style: ``
};

@Component({
  template: `
  <h2> File Select Component </h2>
  
  <li> Supports drag and drop </li>
  <li> Supports copy and paste</li>
  <li> Supports select file</li>
  <li> Supports custom contents and design</li>
  <li> Show preview of image </li>
  <li> Upload a file with function given </li>
  
  <h3>Demo</h3>
  <ee-file [uploadFn]="uploadImage">
    Click and select files,<br/>
    or, Drag and drop files <br/>
    or Copy and paste files here
  </ee-file>
  
  
  <h3>Inputs</h3>
    <li><b>showList</b>: show the list of files collected, default true</li>
    <li><b>uploaFn</b>: a function that returns Observable to upload a file
      <pre>
    uploadImage(imageFile) {{'{'}}'
      const fd = new FormData();
      fd.append('image', imageFile, imageFile.name);
      const options: any = {{'{'}}'
        reportProgress:true,  // <-- to show progress
        observe: 'events'     // <-- to show progress
      };
      return this.http.post('https://examle.com/upload', fd, options);
    }
      </pre>
    </li>
  
  <h3>Outputs</h3> 
  <li><b>filesChanged</b>: fired when collected files are changed with the values of list of files</li>
  
  <h3>Custom List of Files</h3>
  If you want to display your own list instead of using pre-build list, set "showList" as false, and implement your own html with files set from "fileChanged" event.
  
  <pre>
  &lt;ee-file [showList]="false" (filesChanged)="files=$event" >
    Select your file
  &lt;/ee-file>
  
  &lt;div *ngIf="files">
    &lt;div *ngFor="let file of files; let i=index">
      &lt;div>{{'{{'}}file.name}}&lt;/div>
      &lt;div>{{'{{'}}file.size}}&lt;/div>
      &lt;img src="{{'{{'}}file.dataURL}}" />
      &lt;button (click)="files.splice(i, 1)">🗑&lt;/button>
    &lt;/div>
  &lt;/div>
  </pre>`,
  styles: [`<ee-dialog></ee-dialog> `]
})
export class FileComponent {
  files =[]; 

  constructor(private http: HttpClient) {}

  uploadImage(imageFile:File, callback) {
    let formData = new FormData();
    formData.append('image', imageFile, imageFile.name);
    const options: any = {
      headers: new HttpHeaders({
        authorization: 'Client-ID 863c02f211a9506'
      }), 
      reportProgress:true,  // <-- to show progress
      observe: 'events'     // <-- to show progress
    };
    const url = 'https://api.imgur.com/3/image';

    return this.http.post(url, formData, options);
  }
}

@NgModule({
  declarations: [FileComponent],
  imports: [ ElementsExtendedModule, FormsModule, CommonModule]})
class DynModule {}