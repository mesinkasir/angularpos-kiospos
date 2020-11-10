import {ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {PosService} from '../services/pos.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent implements OnInit {
  @ViewChild('items', {static: false}) items: ElementRef;

  public displayedColumns = ['delete', 'product', 'quantity', 'price'];

  private tableData = [];
  @Input() set dataSource(src) {
    this.tableData = [...src];
    if (this.items) {
      this.items.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }
  }

  constructor(private posService: PosService) { }

  ngOnInit() {
  }

  public getCostBeforeDiscount() {
    return this.posService.getCostBeforeDiscount();
  }

  public removeItem(item: number) {
    this.posService.removeItem(item);
  }

}
