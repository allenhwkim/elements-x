import { Component, ViewChild, ViewContainerRef, ComponentFactoryResolver, Injector, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TabsComponent } from '../../../lib/src';
import { config } from './config';
import { tools } from './tools/index';
import { usageTemplate } from './components/usage';

@Component({
  template: `
    <div class="header vcentered">
      <h2 class="name">{{tool?.text}}</h2>
      <div class="links">
        links
      </div>
    </div>

    <div class="contents">
      <div class="tool-contents">
        contents
        <ng-container #dynContainer></ng-container>
      </div>
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
    .tool-contents {
      width: calc(100% - 250px);
    }
  `]
})
export class ToolComponent implements AfterViewInit {
  toolName: string;
  tool: any;
  @ViewChild('dynContainer', {read: ViewContainerRef}) dynContainer: ViewContainerRef;

  constructor(
    private cfr: ComponentFactoryResolver, 
    private injector: Injector,
    private route: ActivatedRoute, 
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    this.route.params.subscribe(params => {
      this.toolName = params.name;
      this.loadComponent();
    });
  }

  async loadComponent() {
    this.tool = tools[this.toolName];
    this.cdr.detectChanges();
    const klassName = `${this.tool.text}Component`;
    this.dynContainer && this.dynContainer.clear();

    try {
      const imported: any = await import(`./tools/${this.toolName}.component`);
      const btnCompFactory = this.cfr.resolveComponentFactory(imported[klassName]);
      const {instance} = this.dynContainer.createComponent(btnCompFactory, null, this.injector);
    } catch(e) {
      console.error(`Cannot find ./tools/${this.toolName}.component`);
      throw e;
    }
  }
}
