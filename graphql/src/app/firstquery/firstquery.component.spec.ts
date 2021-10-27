import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstqueryComponent } from './firstquery.component';

describe('FirstqueryComponent', () => {
  let component: FirstqueryComponent;
  let fixture: ComponentFixture<FirstqueryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstqueryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstqueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
