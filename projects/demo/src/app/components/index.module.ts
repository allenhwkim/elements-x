import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { PageNotFoundComponent } from '../404.component';
import { ButtonComponent } from './button.component';
import { CalendarComponent } from './calendar.component';
import { CarouselComponent } from './carousel.component';
import { CheckboxComponent } from './checkbox.component';
import { ClockComponent } from './clock.component';
import { CurrencyComponent } from './currency.component';
import { DialogComponent } from './dialog.component';
import { InputComponent } from './input.component';
import { ListComponent } from './list.component';
import { MenuComponent } from './menu.component';
import { RadioComponent } from './radio.component';
import { SwitchComponent } from './switch.component';
import { TabsComponent } from './tabs.component';
import { TextFieldComponent } from './text-field.component';
import { TooltipComponent } from './tooltip.component';
import { AngularExtendedModule } from '../../../../lib/src';

const routes: Routes = [
    { path: 'button', component: ButtonComponent },
    { path: 'calendar', component: CalendarComponent },
    { path: 'carousel', component: CarouselComponent },
    { path: 'checkbox', component: CheckboxComponent },
    { path: 'clock', component: ClockComponent },
    { path: 'currency', component: CurrencyComponent },
    { path: 'dialog', component: DialogComponent },  
    { path: 'input', component: InputComponent },
    { path: 'list', component: ListComponent },
    { path: 'menu', component: MenuComponent },
    { path: 'radio', component: RadioComponent },
    { path: 'switch', component: SwitchComponent },
    { path: 'tabs', component: TabsComponent },
    { path: 'text-field', component: TextFieldComponent },
    { path: 'tooltip', component: TooltipComponent },
    { path: '**', component: PageNotFoundComponent }
  ];

@NgModule({
  declarations: [
    ButtonComponent,
    CalendarComponent,
    CarouselComponent,
    CheckboxComponent,
    ClockComponent,
    CurrencyComponent,
    DialogComponent,
    InputComponent,
    ListComponent,
    MenuComponent,
    RadioComponent,
    SwitchComponent,
    TabsComponent,
    TextFieldComponent,
    TooltipComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    AngularExtendedModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class IndexModule { }
