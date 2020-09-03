import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './404.component';
import { ElementsExtendedModule } from '../../../lib/src';
import { ComponentsComponent } from './components.component';
import { ArticlesComponent } from './articles.component';
import { IndexComponent as ComponentsIndexComponent } from './components/index.componnt';

import 'prismjs/components/prism-css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-scss';
import { HttpClientModule } from '@angular/common/http';

const routes : Routes = [
  { path: 'components', component: ComponentsIndexComponent },
  { path: 'components/:name', component: ComponentsComponent },
  { path: 'articles/:name', component: ArticlesComponent },
  { path: '', redirectTo: 'components', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    BrowserModule,
    ElementsExtendedModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [
    AppComponent, ComponentsComponent, ArticlesComponent
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
