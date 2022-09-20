import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { HeaderComponent } from './header.component';

class ComponentMock {}

fdescribe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let storage = {} as any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {path:'login', component: ComponentMock}
        ])
      ],
      declarations: [ HeaderComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;

    spyOn(sessionStorage, 'getItem').and.callFake( (key: string) => {
      return storage[key] ? storage[key] : null;
    });

    spyOn(sessionStorage, 'setItem').and.callFake( (key: string, value: string) => {
        return storage[key] = value;
    });

    fixture.detectChanges();
  });

  afterEach(() => {
    sessionStorage.clear();
  })

  it('HeaderComponent instanciado corretamente', () => {
    expect(component).toBeTruthy();
  });

  it('funcao login redireciona para login caso loginStatus estiver true', () => {
    sessionStorage.setItem('usuario', 'teste');
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate');

    sessionStorage.setItem('usuario', 'teste');

    component.login();
    expect(spy).toHaveBeenCalledWith(['/login']);
    expect(component.loginStatus).toBeFalse();
  });

  it('funcao login nao limpa sessionStorage e nem muda o tipo caso seja falso', () => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate');

    component.login();
    expect(spy).toHaveBeenCalledWith(['/login']);
    expect(component.loginStatus).toBeFalse();
  });

});
