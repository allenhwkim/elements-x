import { Component, ViewChild, ViewContainerRef, ComponentFactoryResolver, Injector, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TabsComponent } from '../../../lib/src';
import { config } from './config';
import { components } from './components/index';
import { usageTemplate } from './components/usage';

@Component({
  template: `
    <div class="header vcentered">
      <h2 class="name">{{component?.text}}</h2>
      <div class="links">
        <a target="_blank" href="${config.githubRepo}/blob/master/projects/lib/src/{{componentName}}/{{componentName}}.component.ts">
          <ee-button class="no-border no-shadow icon" title="code">
            <i class="fab fa-angular"></i>
          </ee-button>
        </a>
        <a target="_blank" href="${config.githubRepo}/issues?q={{componentName}}+in%3Atitle">
          <ee-button class="no-border no-shadow icon" title="issues">
            <i class="fas fa-comments"></i>
          </ee-button>
        </a>
      </div>
    </div>

    <div class="contents">
      <ee-tabs #tabs>
        <div class="tabs">
          <div ripple tab-for="overview">OVERVIEW</div>
          <div ripple tab-for="usage">USAGE</div>
          <div class="underline-bar"></div>
        </div>
        <div class="tab-contents">
          <div contents-for="overview">
            <ng-container #dynContainer></ng-container>
          </div>
          <div class="usage" contents-for="usage">
            <pre ee-prism class="dark" [code]="usageText"></pre>
          </div>
        </div>  
      </ee-tabs>
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
    .tab-contents {
      width: calc(100% - 250px);
    }
  `]
})
export class ComponentsComponent implements AfterViewInit {
  componentName: string;
  component: any;
  usageText: string;
  tabSelected;
  @ViewChild('dynContainer', {read: ViewContainerRef}) dynContainer: ViewContainerRef;
  @ViewChild('tabs', {read: TabsComponent}) tabs: TabsComponent;

  constructor(
    private cfr: ComponentFactoryResolver, 
    private injector: Injector,
    private route: ActivatedRoute, 
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    this.route.params.subscribe(params => {
      this.componentName = params.name;
      this.loadComponent();
    });
  }

  async loadComponent() {
    this.component = components[this.componentName];
    this.cdr.detectChanges();
    const klassName = `${this.component.text}Component`;
    this.dynContainer && this.dynContainer.clear();
    this.tabs.selectTabAndContents('overview');

    try {
      const imported: any = await import(`./components/${this.componentName}.component`);
      const btnCompFactory = this.cfr.resolveComponentFactory(imported[klassName]);
      const {instance} = this.dynContainer.createComponent(btnCompFactory, null, this.injector);
      try {
        if (imported.usage) {
          this.usageText = usageTemplate
            .replace(/<<MODULE>>/g, `${this.component.text}Module`)
            .replace(/<<TEMPLATE>>/g, imported.usage.template)
            .replace(/<<STYLE>>/g, imported.usage.style ||'')
        } else {
          const usageText = await import(`./components/${this.componentName}-usage`);
          this.usageText = usageText.usage;
        }
      } catch(e) {
        this.usageText = '';
        console.error(`Cannot find usage for ${this.componentName}`);
      }
    } catch(e) {
      console.error(`Cannot find ./components/${this.componentName}.component`);
      throw e;
    }
  }
}
