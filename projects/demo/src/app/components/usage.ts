export const usageTemplate = `
  import { NgModule, Component } from '@angular/core';
  import { BrowserModule } from '@angular/platform-browser';
  import { FormsModule } from '@angular/forms';

  import { <<MODULE>> } from 'elements-extended';

  @NgModule({
    imports: [BrowserModule, <<MODULE>>, FormsModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
  })
  export class AppModule {}

  @Component({
    selector: 'my-app',
    template: \`<<TEMPLATE>>\`,
    styles: [\`<<STYLE>>\`]
  })
  export class AppComponent {}
`;