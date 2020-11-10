import {ChangeDetectionStrategy, Component, Inject, LOCALE_ID, NgZone, OnDestroy, OnInit} from '@angular/core';
import {TimeService} from '../services/time.service';
import {BehaviorSubject, Subject} from 'rxjs';
import {take} from 'rxjs/operators';
import {PosService} from './services/pos.service';
import {CartItem, ConfigJson, Promotion} from './models/ConfigModel';

@Component({
  selector: 'app-point-of-sales',
  templateUrl: './point-of-sales.component.html',
  styleUrls: ['./point-of-sales.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PointOfSalesComponent implements OnInit, OnDestroy {
  private unsubscribe: Subject<any> = new Subject<any>();

  private configJson: ConfigJson;

  public cartItems$: BehaviorSubject<CartItem[]>;


  constructor(@Inject(LOCALE_ID) private locale: string,
              private zone: NgZone,
              private timeService: TimeService,
              private posService: PosService) {
  }

  ngOnInit() {

    this.posService.config
      .pipe(take(1))
      .subscribe(c => {
        this.configJson = c;
      });

    this.cartItems$ = this.posService.items;
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public filterBasedOnDayOfWeek(promotion: Promotion[]): Promotion[] {
    if (!promotion) {
      return;
    }
    return promotion.filter(p => p.available.includes(this.timeService.dayOfWeekStr));
  }

}
