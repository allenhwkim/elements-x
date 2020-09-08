import { NgModule } from '@angular/core';
import { AceModule } from './ace/ace.module';
import { ButtonModule } from './button/button.module';
import { CalendarModule } from './calendar/calendar.module';
import { CarouselModule } from './carousel/carousel.module';
import { CheckboxModule } from './checkbox/checkbox.module';
import { ClockModule } from './clock/clock.module';
import { CurrencyModule } from './currency/currency.module';
import { DialogModule } from './dialog/dialog.module';
import { FileModule } from './file/file.module';
import { InputModule } from './input/input.module';
import { ListModule } from './list/list.module';
import { MenuModule } from './menu/menu.module';
import { OverlayModule } from './overlay/overlay.module';
import { PrismModule } from './prism/prism.module';
import { RadioModule } from './radio/radio.module';
import { RippleModule } from './ripple/ripple.module';
import { SwitchModule } from './switch/switch.module';
import { TabsModule } from './tabs/tabs.module';
import { TextFieldModule } from './text-field/text-field.module';
import { TooltipModule } from './tooltip/tooltip.module';
import { A11yOutlineModule } from './a11y-outline/a11y-outline.module';

@NgModule({
  imports: [
    A11yOutlineModule,
    AceModule,
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
    OverlayModule,
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
    A11yOutlineModule,
    AceModule,
    ButtonModule,
    CalendarModule,
    CarouselModule,
    CheckboxModule,
    ClockModule, 
    CurrencyModule,
    DialogModule,
    FileModule,
    InputModule,
    ListModule,
    MenuModule,
    OverlayModule,
    PrismModule,
    RadioModule,
    RippleModule,
    SwitchModule,
    TabsModule,
    TextFieldModule,
    TooltipModule
  ]
})
export class ElementsXModule { }
