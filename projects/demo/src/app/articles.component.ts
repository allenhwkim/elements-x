import { Component, ViewChild, ViewContainerRef, ComponentFactoryResolver, Injector, AfterViewInit, ChangeDetectorRef, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { articles } from './articles/index';
import { HttpClient } from '@angular/common/http';

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
    .article {
      width: calc(100% - 250px); 
      color: rgb(41,41,41);
      font-size: 20px;
    }
    .article ::ng-deep h1 {
      font-size: 24px;
    }
    .article ::ng-deep blockquote {
      line-height: 28px;
      font-style: italic;
      border-left: 2px solid #333;
      margin: 20px 0;
      padding: 0 20px;
    }
    .article ::ng-deep li.number {
      list-style-type: decimal;
      list-style-position: inside;
      text-indent: -22px;
      padding-left: 26px;
    }
    .article ::ng-deep li.bulletin {
      list-style-type: disc;
      list-style-position: inside;
      text-indent: -26px;
      padding-left: 26px;
    }
    .article ::ng-deep p {
      line-height: 28px;
    }
    .article ::ng-deep figcaption { 
      color: #A1A1A1;
    }
    .article ::ng-deep pre { 
      background: #EEE;
      padding: 16px;
      font-size: 16px;
      white-space: pre-wrap;
    }
    .article ::ng-deep pre + pre { 
      margin-top: -32px;
    }
    .article ::ng-deep .title { 
      display: none;
    }
    .article ::ng-deep .subtitle { 
      font-family: sans-serif, "Lucidia Grande";
      color: #A1A1A1;
      font-weight: normal;
      font-size: 24px;
    }
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
  html: any;
  article: any;

  constructor(
    private el: ElementRef,
    private http: HttpClient,
    private route: ActivatedRoute, 
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer
  ) {}

  ngAfterViewInit() {
    this.route.params.subscribe(params => {
      this.loadArticle(params.name);
    });
  }

  async loadArticle(name) {
    const id = name.match(/-([a-z0-9]+)$/)[1];
    this.article = articles[id];
    this.cdr.detectChanges();

    const imported: any = await import(`raw-loader!./articles/${name}.html`);
    this.html = this.sanitizer.bypassSecurityTrustHtml(imported.default) ;
    this.cdr.detectChanges();

    setTimeout(_ => {
      const iframes = this.el.nativeElement.querySelectorAll('iframe[data-script]');
      Array.from(iframes).forEach( (iframe: HTMLIFrameElement) => {
        const iframeDoc =  iframe.contentWindow.document;
        iframeDoc.write(`<script src="${iframe.getAttribute('data-script')}"><\/script>`) 
        iframe.style.display = 'initial';
        setTimeout(_ => {
          iframe.setAttribute('height', ''+iframeDoc.body.scrollHeight);
        }, 1500);
      });
    }, 500);
  }
}
