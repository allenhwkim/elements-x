import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './404.component';
import { ElementsXModule } from '../../../lib/src';
import { ComponentComponent } from './component.component';
import { ArticleComponent } from './article.component';
import { ToolComponent } from './tool.component';
import { IndexComponent as ComponentsIndexComponent } from './components/index.componnt';
import { IndexComponent as ArticlesIndexComponent } from './articles/index.componnt';
import { IndexComponent as ToolsIndexComponent } from './tools/index.componnt';

// ace editor imports
import 'brace/mode/html';
import 'brace/mode/css';
import 'brace/mode/javascript';
import 'brace/theme/terminal';
import 'brace/theme/github';

//
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-scss';
import { HttpClientModule } from '@angular/common/http';

const routes : Routes = [
  { path: 'components', component: ComponentsIndexComponent },
  { path: 'components/:name', component: ComponentComponent },
  { path: 'articles', component: ArticlesIndexComponent },
  { path: 'articles/:name', component: ArticleComponent },
  { path: 'tools', component: ToolsIndexComponent },
  { path: 'tools/:name', component: ToolComponent },
  { path: '', redirectTo: 'components', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    BrowserModule,
    ElementsXModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [
    AppComponent, ComponentComponent, ArticleComponent, ToolComponent
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
