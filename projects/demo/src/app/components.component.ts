import { Component, ViewChild, ViewContainerRef, ComponentFactoryResolver, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CONFIG } from './config';

@Component({
  template: `
    <div class="header vcentered">
      <h2 class="name">{{component.text}}</h2>
      <div class="links">
        <ax-button class="no-border no-shadow icon" title="code">
          <i class="fab fa-js-square"></i>
        </ax-button>
        <ax-button class="no-border no-shadow icon" title="issues">
          <i class="fas fa-comments"></i>
        </ax-button>
      </div>
    </div>

    <div class="contents">
      <ax-tabs>
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
            <pre>{{usageText}}</pre>
          </div>
        </div>  
      </ax-tabs>
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
  `]
})
export class ComponentsComponent {
  componentName: string;
  component: any;
  usageText: string;
  @ViewChild('dynContainer', {read: ViewContainerRef}) dynContainer: ViewContainerRef;

  constructor(
    private cfr: ComponentFactoryResolver, 
    private injector: Injector,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      this.componentName = params.name;
      this.loadComponent();
    });
  }

  async loadComponent() {
    this.component = CONFIG.components[this.componentName];
    const klassName = `${this.component.text}Component`;
    this.dynContainer && this.dynContainer.clear();
    const imported: any = await import(`./components/${this.componentName}.component`);
    const btnCompFactory = this.cfr.resolveComponentFactory(imported[klassName]);
    const {instance} = this.dynContainer.createComponent(btnCompFactory, null, this.injector);
  
    const usageText = await import(`raw-loader!./components/${this.componentName}-usage.txt`);
    this.usageText = usageText.default;
  }
}
