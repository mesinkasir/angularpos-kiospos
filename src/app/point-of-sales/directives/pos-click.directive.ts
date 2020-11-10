import {Directive, HostBinding, HostListener, Input} from '@angular/core';
import {PosService} from '../services/pos.service';

@Directive({
  selector: '[appPosClick]',
})
export class PosClickDirective {
  private clickData: any;
  @Input('dataSrc') set dataSrc(val) {
    this.clickData = val;
  }

  constructor(private posService: PosService) { }

  @HostBinding('style.cursor')
  cursor = 'pointer';

  @HostListener('click', ['$event'])
  clickEvent(event) {
    this.posService.addItem = this.clickData;
  }
}
