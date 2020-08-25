import { Component, VERSION, HostBinding } from '@angular/core';
import { CONFIG } from './config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @HostBinding('class.collapsed') collapsed;
  CONFIG = CONFIG;
  components = Object.entries(CONFIG.components);
}
