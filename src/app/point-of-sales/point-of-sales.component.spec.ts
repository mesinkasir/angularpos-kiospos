import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointOfSalesComponent } from './point-of-sales.component';

describe('PointOfSalesComponent', () => {
  let component: PointOfSalesComponent;
  let fixture: ComponentFixture<PointOfSalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointOfSalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointOfSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
