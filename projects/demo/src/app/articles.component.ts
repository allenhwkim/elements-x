import { Component, ViewChild, ViewContainerRef, ComponentFactoryResolver, Injector, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { config } from './config';
import { components } from './components/index';
import { usageTemplate } from './components/usage';

@Component({
  template: `
    <div class="header vcentered">
      <h2 class="name">{{article?.title}}</h2>
      <div class="links">
        <a target="_blank" href="{{article?.mediumUrl}}">
          <ee-button class="no-border no-shadow icon" title="code">
            <i class="fab fa-medium"></i>
          </ee-button>
        </a>
      </div>
    </div>

    <div class="contents">
      <div class="article" [innerHTML]="html"></div>
    </div>
  `,
  styles: [`
    .header {
      display: flex;
      margin: -20px -20px 0 -20px;
      height: 56px;
      padding: 0 20px;
      box-shadow: 0 1px 2px 0 rgba(0,0,0,.1);
      background: #FFF;
    }
    .header h2 { margin: 0; }
    .header .links {
      flex: 1;
      text-align: right;
      font-size: 1.5em;
      color: #666;
    }
    .contents {
      margin-top: 20px;
      padding: 20px;
      background: #FFF;
      box-shadow: 0 1px 2px 0 rgba(0,0,0,.1);
    }
    .contents ::ng-deep img {
      max-width: 100%;
    }
  `]
})
export class ArticlesComponent implements AfterViewInit {
  html: string;
  article: any;

  constructor(
    private route: ActivatedRoute, 
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    this.route.params.subscribe(params => {
      this.loadArticle(params.name);
    });
  }

  async loadArticle(name) {
    const id = name.match(/-(.*?)$/)[1];
    this.article = components[id];

    const imported: any = await import(`raw-loader!./articles/${name}.html`);
    this.html = imported.default;

    this.cdr.detectChanges();
  }
}
