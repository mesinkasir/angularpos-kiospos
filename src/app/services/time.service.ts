import {Inject, Injectable, LOCALE_ID, OnDestroy} from '@angular/core';
import {Observable, Subject, timer} from 'rxjs';
import {map, share, shareReplay, takeUntil} from 'rxjs/operators';
import {formatDate} from '@angular/common';
import {ConfigJson} from '../point-of-sales/models/ConfigModel';

@Injectable()
export class TimeService implements OnDestroy {
  public appTime$: Observable<Date>;

  private unsubscribe: Subject<any> = new Subject<any>();

  public dayOfWeekStr: string;
  private dayOfWeekNum: number;
  private usWeekDays: string[] = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];

  constructor(@Inject(LOCALE_ID) private locale: string) {
    this.appTime$ =
      timer(0, 1000)
        .pipe(
          map(() => new Date()),
          share()
        );


    this.appTime$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(t => {
        this.dayOfWeekStr = formatDate(t, 'EEE', this.locale);
        this.dayOfWeekNum = this.usWeekDays.indexOf(this.dayOfWeekStr);
      });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
