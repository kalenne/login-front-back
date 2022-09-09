import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Informacao, InformacaoService } from 'src/app/core/service/message.service';
import { UsuarioService } from 'src/app/core/service/usuario.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';

import { PerfilComponent } from './perfil.component';
import { HttpResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { IUsuario } from 'src/app/core/interface/usuario';

class ComponentMock {}

const usuarioMock: IUsuario = {
  id: 1,
  email: 'email@email.com',
  senha: 'email',
  roles: 'ADMIN',
  nome: 'Teste ',
  datanasc: '01/01/2000',
  cpf: '30042513375',
  ativo: true
}

const dadosMock:Informacao = {
  code: 0,
  codeText:  '',
  tipo: ''
}

const dialogServiceMock = {
  open () {
    return {
      onClose: of(dadosMock)
    }
  }
}

@Pipe({name: 'passwordfilter'})
class PasswordFilterMock implements PipeTransform {
  transform(value: any, ...args: any[]) {
    return '';
  }
}
@Pipe({name: 'cpf'})
class CpfMock implements PipeTransform {
  transform(value: any, ...args: any[]) {
    return '';
  }
}

fdescribe('PerfilComponent', () => {
  let component: PerfilComponent;
  let fixture: ComponentFixture<PerfilComponent>;
  let httpMock: HttpTestingController;
  let usuService: UsuarioService;
  let infoService: InformacaoService;
  let router: Router;
  let confirmService: ConfirmationService
  let dialogS: DialogService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          {path: 'login', component: ComponentMock}
        ])
      ],
      declarations: [ PerfilComponent, PasswordFilterMock, CpfMock ],
      providers: [
        InformacaoService,
        ConfirmationService,
        UsuarioService,
        {provide: DialogService, useValue: dialogServiceMock}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    usuService = TestBed.inject(UsuarioService);
    infoService = TestBed.inject(InformacaoService);
    router = TestBed.inject(Router);
    confirmService = TestBed.inject(ConfirmationService);
    dialogS = TestBed.inject(DialogService);



    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('excluirUsuario funciona corretamente', () => {
    let id = 1;
    let dados = {status: 200} as HttpResponse<Object>
    const info = spyOn(infoService, 'setData').and.callFake(() => null);
    spyOn(usuService, 'deletarUsuario').and.returnValue(of(dados));
    const spyRouter = spyOn(router, 'navigate');
    component.excluirUsuario(id);

    expect(info).toHaveBeenCalled();
    expect(spyRouter).toHaveBeenCalledWith(['/login']);
  });

  it ('dialogExclusao funciona corretamente', () => {
    const id = 1;
    spyOn(component, 'excluirUsuario').and.callThrough();
    spyOn(confirmService, 'confirm').and.callFake((confirmacao: any) => confirmacao.accept());
    const excluir = spyOn(usuService, 'deletarUsuario').and.callThrough();
    confirmService.confirm({accept: () => {}})

    component.dialogExclusao(1);
    expect(excluir).toHaveBeenCalled();
  });

  it('editarUsuario apos o subscribe retorna a lista e uma mensagem via InformacaoService', () => {
    const spyListaUsuario = spyOn(component, 'listarUsuarios');
    const spyInfoService = spyOn(infoService, 'setData');
    component.editarUsuario(usuarioMock);
    expect(spyListaUsuario).toHaveBeenCalled();
    expect(spyInfoService).toHaveBeenCalled();
  });



  it('listarUsuarios retorna os dados para a variavel usuario', () => {
    let lista = {} as IUsuario;
    const spy = spyOn(usuService, 'listarUsuarios');
    spy.and.returnValue(of(lista));
    component.listarUsuarios();
    expect(component.usuario).toBe(lista);
    expect(component.usuario).toEqual(lista);

    spy.and.returnValue(throwError(() => new Error('')))
    const spyRouter = spyOn(router, 'navigate');
    component.listarUsuarios();
    expect(spyRouter).toHaveBeenCalledWith(['/login']);
  });

});
