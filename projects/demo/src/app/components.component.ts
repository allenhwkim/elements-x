import { Component, ViewChild, ViewContainerRef, ComponentFactoryResolver, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CONFIG } from './config';

@Component({
  template: `
    <div class="header vcentered" ripple>
      <h2>{{component.text}}</h2>
    </div>
    <div class="contents" ripple>
      <ng-container #dynContainer></ng-container>
    </div>
  `,
  styles: [`
    .header {
      margin: -20px -20px 0 -20px;
      height: 56px;
      padding: 0 20px;
      box-shadow: 0 1px 2px 0 rgba(0,0,0,.1);
      background: #FFF;
    }
    .header h2 { margin: 0; }
    .contents {
      margin-top: 20px;
      padding: 20px;
      background: #FFF;
      box-shadow: 0 1px 2px 0 rgba(0,0,0,.1);
    }
  `]
})
export class ComponentsComponent {
  component: any;
  @ViewChild('dynContainer', {read: ViewContainerRef}) dynContainer: ViewContainerRef;

  constructor(
    private cfr: ComponentFactoryResolver, 
    private injector: Injector,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      this.component = CONFIG.components[params.name];
      this.component && this.loadComponent(params.name, `${this.component.text}Component`);
    });
  }

  async loadComponent(name, klassName) {
    this.dynContainer && this.dynContainer.clear();
    const imported: any = await import(`./components/${name}.component`);
    const btnCompFactory = this.cfr.resolveComponentFactory(imported[klassName]);
    const {instance} = this.dynContainer.createComponent(btnCompFactory, null, this.injector);
  }
}
