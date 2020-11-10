import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {take} from 'rxjs/operators';
import {CartItem, ConfigJson, Product, Promotion} from '../models/ConfigModel';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable()
export class PosService implements OnDestroy {
  private unsubscribe: Subject<any> = new Subject<any>();
  private configJson: Subject<ConfigJson> = new Subject<ConfigJson>();
  private itemsInCart: CartItem[] = [];
  private cartItems: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>(this.itemsInCart);

  private applyOncePromotions: string[] = [];

  public set addItem(item: Promotion | Product) {
    let inList: CartItem = this.itemsInCart.filter(i => i.product === item.name)[0];
    if (inList && inList.category !== 'discount') {
      inList.quantity += 1;
      inList.total_price = +(+inList.price * inList.quantity).toFixed(2);

      const promo: CartItem = this.itemsInCart.filter(i => i.appliedTo === item.id)[0];
      if (promo) {
        promo.price = promo.total_price = -((inList.price * inList.quantity) / 2);
      }
    } else {
      inList = {
        id: item.id,
        category: item.category,
        delete: null,
        product: item.name,
        quantity: 1,
        price: +item.price,
        total_price: +item.price,
        discountsApplied: '',
        appliedTo: '',
        applyTo: item.applyTo
      };
      this.checkDiscount(inList);
    }
    this.cartItems.next([...this.itemsInCart]);
  }

  public get items() {
    return this.cartItems;
  }

  public get totalItems() {
    return this.getItemsCount(this.itemsInCart);
  }

  public get config(): Subject<ConfigJson> {
    return this.configJson;
  }

  constructor(private http: HttpClient) {
    this.init();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public init() {
    this.http.get('../../assets/json/config.json')
      .pipe(take(1))
      .subscribe((c: ConfigJson) => this.configJson.next(c));
  }

  public removeItem(itemNum: number) {
    const item: CartItem = this.itemsInCart[itemNum];
    this.itemsInCart.forEach((i) => {
      if (item.appliedTo === i.id) {
        i.appliedTo = '';
        i.discountsApplied = '';
      }
    });

    if (item.quantity > 1) {
      item.quantity -= 1;
      item.total_price = +(+item.price * item.quantity).toFixed(2);
    } else {
      this.itemsInCart.splice(itemNum, 1);
    }

    this.cartItems.next([...this.itemsInCart]);
  }

  public getCostBeforeDiscount(): number {
    let cost = 0;
    this.itemsInCart.forEach(d => cost += d.total_price);
    return +cost.toFixed(2);
  }

  private getItemsCount(itemsInCart: CartItem[]): number {
    let total = 0;
    itemsInCart.forEach(d => total += d.quantity);
    return total;
  }

  private checkDiscount(item: CartItem) {
    let onlyApplyOnce = false;
    this.itemsInCart.forEach((i) => {
      switch (item.id) {
        case 'promo00001':
          if (i.quantity >= 3 && i.discountsApplied !== item.id) {
            item.price = item.total_price = -(i.price * 2);
          }
          break;
        case 'promo00002':
          if (this.applyOncePromotions.indexOf(i.id) === 0) {
            onlyApplyOnce = true;
          }
          if (i.total_price >= i.price && i.discountsApplied !== item.id) {
            item.price = item.total_price = -(i.price / 2);
            this.applyOncePromotions.push(i.id);
          }
          break;
        case 'promo00003':
          if (this.applyOncePromotions.indexOf(i.id) === 0) {
            onlyApplyOnce = true;
          }
          if (this.getCostBeforeDiscount() > 50 && i.discountsApplied === '') {
            item.price = item.total_price = -10;
          }
          break;
        case 'promo00004':
          if (i.quantity >= 3 && i.id === item.applyTo && i.discountsApplied !== item.id) {
            item.price = item.total_price = -(i.price * 2);
          }
          break;
        case 'promo00005':
          if (i.id === item.applyTo && i.discountsApplied !== item.id) {
            item.price = item.total_price = -((i.price * i.quantity) / 2);
          }
          break;
        case 'promo00006':

          break;
        default:

      }
      item.quantity = 1;
      item.appliedTo = i.id;
      i.discountsApplied = item.id;
    });

    if (!onlyApplyOnce) {
      this.itemsInCart.unshift(item);
    }
  }
}
