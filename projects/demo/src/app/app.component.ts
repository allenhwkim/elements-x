import { Component, VERSION, HostBinding, AfterViewInit } from '@angular/core';
import { config } from './config';
import { components } from './components/index';
import { articles } from './articles/index';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @HostBinding('class.collapsed') collapsed;
  config = config;
  components = Object.entries(components);
  articles = Object.entries(articles);
  urlGroup: string = 'components';

  constructor(
    private router: Router
  ) {
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        if (event.url.match(/\/([^\/]+)/)) {
          this.urlGroup = event.url.match(/\/([^\/]+)/)[1];
        }
      }
    })
  }

}
