import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { UsuarioService } from 'src/app/core/service/usuario.service';
import {  CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { RestaurarComponent } from './restaurar.component';
import { IUsuario } from 'src/app/core/interface/usuario';
import { of } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

const DynamicDialogRefMock = {
  close: () => null
}

@Pipe({name: 'searchfilter'})
class searchFilterMock implements PipeTransform {
  transform(value: any, ...args: any[]) {
    return '';
  }
}
fdescribe('RestaurarComponent', () => {
  let component: RestaurarComponent;
  let fixture: ComponentFixture<RestaurarComponent>;
  let usuarioService: UsuarioService;
  let dynamicRef: DynamicDialogRef;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ],
      declarations: [ RestaurarComponent, searchFilterMock ],
      providers: [
        {provide: DynamicDialogRef, useValue: DynamicDialogRefMock},
        UsuarioService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurarComponent);
    component = fixture.componentInstance;

    usuarioService = TestBed.inject(UsuarioService);
    dynamicRef = TestBed.inject(DynamicDialogRef);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('restaurarUsuario retorna uma lista do tipo IUsuario', ()=> {
    let lista: IUsuario[] = [];
    spyOn(usuarioService, 'listaRestaurar').and.callFake(() => of(lista))

    component.id = '1';

    component.restaurarUsuario();

    expect(component.usuarios).toBe(lista);
    expect(component.usuarios).toEqual(lista);

  });
  it('dadosModal chama o close ao conseguir restaurar o usuario', () => {
    let lista = {status: 0} as HttpResponse<Object>
    spyOn(usuarioService, 'restaurarUsuario').and.callFake(() => of(lista))
    let spyComp = spyOn(component, 'restaurarUsuario').and.callThrough();
    let spyRef = spyOn(dynamicRef, 'close');

    component.dadosModal(1);

  expect(spyComp).toHaveBeenCalled();
  expect(spyRef).toHaveBeenCalled();
  expect(spyRef).toHaveBeenCalledWith(lista);

  });
});
