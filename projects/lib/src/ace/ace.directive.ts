import * as ace from 'brace';
import { Directive, Input, Output, EventEmitter, NgZone, ElementRef, AfterViewInit } from '@angular/core';
import * as prettier from 'prettier';
import * as cssParser from 'prettier/parser-postcss';
import * as jsParser from 'prettier/parser-babel';
import * as htmlParser from 'prettier/parser-html';

@Directive({
  selector: '[ace]'
})
export class AceDirective implements AfterViewInit {
  editor: ace.Editor;
  @Input() mode = 'text';
  @Input() theme = 'terminal';
  @Input() value: string;
  @Output() initialized = new EventEmitter();

  constructor( private zone: NgZone, private el: ElementRef) {}

  ngAfterViewInit() {
    this.zone.runOutsideAngular(_ => {
      const code = this.el.nativeElement.innerText;
      this.editor = ace.edit(this.el.nativeElement);
      this.editor.$blockScrolling = Infinity;

      const value = prettier.format(this.value || code, {
        parser: <any>(this.mode === 'js' ? 'babel' : this.mode),
        plugins: [cssParser, jsParser, htmlParser]
      }); // TODO
      this.editor.setValue(value);
      this.editor.clearSelection();

      const height =
        this.editor.getSession().getScreenLength() * 
        this.editor.renderer.lineHeight + 
        this.editor.renderer['scrollBar'].getWidth();
      this.el.nativeElement.style.height  =height + "px";
      this.editor.resize();

      this.editor.setOption('useWorker', false); // disable error highlighting
      this.editor.setOption('maxLines', 200);
      this.editor.setOption('mode', 'ace/mode/' + this.mode);
      this.editor.setOption('theme', 'ace/theme/' + this.theme);
      this.initialized.emit(this.editor);
    })

    const eventNames=`blur,focus,copy,paste,change,changeSession`;
    
    eventNames.split(',').forEach(eventName => {
      this.editor.on(eventName, args => {
        const event = new CustomEvent(eventName, { 
          detail: {args, value: this.editor.getValue()}
        });
        this.el.nativeElement.dispatchEvent(event);
      });
    });
  }
}
