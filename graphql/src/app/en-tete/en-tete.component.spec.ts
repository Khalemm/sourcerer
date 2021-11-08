import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnTeteComponent } from './en-tete.component';

describe('EnTeteComponent', () => {
  let component: EnTeteComponent;
  let fixture: ComponentFixture<EnTeteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnTeteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnTeteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
