import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurarComponent } from './restaurar.component';

describe('RestaurarComponent', () => {
  let component: RestaurarComponent;
  let fixture: ComponentFixture<RestaurarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
