import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadDadosComponent } from './upload-dados.component';

describe('UploadDadosComponent', () => {
  let component: UploadDadosComponent;
  let fixture: ComponentFixture<UploadDadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadDadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadDadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
