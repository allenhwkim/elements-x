import { NgModule } from '@angular/core';
import { ButtonModule } from './button';
import { CalendarModule } from './calendar';
import { CarouselModule } from './carousel';
import { CheckboxModule } from './checkbox';
import { ClockModule } from './clock';
import { CurrencyModule } from './currency';
import { DialogModule } from './dialog';
import { InputModule } from './input';
import { ListModule } from './list';
import { MenuModule } from './menu';
import { PrismModule } from './prism';
import { RadioModule } from './radio';
import { RippleModule } from './ripple';
import { SwitchModule } from './switch';
import { TabsModule } from './tabs';
import { TextFieldModule } from './text-field';
import { TooltipModule } from './tooltip';

@NgModule({
  imports: [
    ButtonModule,
    CalendarModule,
    CarouselModule,
    CheckboxModule,
    ClockModule, 
    CurrencyModule,
    DialogModule,
    InputModule,
    ListModule,
    MenuModule,
    PrismModule,
    RadioModule,
    RippleModule,
    SwitchModule,
    TabsModule,
    TextFieldModule,
    TooltipModule
  ],
  declarations: [
  ],
  exports: [
    ButtonModule,
    CalendarModule,
    CarouselModule,
    CheckboxModule,
    ClockModule, 
    CurrencyModule,
    DialogModule,
    InputModule,
    ListModule,
    MenuModule,
    PrismModule,
    RadioModule,
    RippleModule,
    SwitchModule,
    TabsModule,
    TextFieldModule,
    TooltipModule
  ]
})
export class ElementsExtendedModule { }
