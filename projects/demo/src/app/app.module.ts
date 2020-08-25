import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './404.component';
import { AngularExtendedModule } from '../../../lib/src';
import { ComponentsComponent } from './components.component';

const routes : Routes = [
  { path: 'components/:name', component: ComponentsComponent },
  { path: '', redirectTo: 'components', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    BrowserModule,
    AngularExtendedModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [
    AppComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }
