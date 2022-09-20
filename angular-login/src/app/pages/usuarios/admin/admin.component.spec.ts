import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { IUsuario } from 'src/app/core/interface/usuario';
import { Informacao, InformacaoService } from 'src/app/core/service/message.service';
import { UsuarioService } from 'src/app/core/service/usuario.service';
import {  CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';

import { AdminComponent } from './admin.component';
import { of, throwError } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

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

const listaUsuarioMock:IUsuario[] = [
  {
    id: 1,
    email: 'email@email.com',
    senha: 'email',
    roles: 'ADMIN',
    nome: 'Teste',
    datanasc: '01/01/2000',
    cpf: '30042513375',
    ativo: true
  },
  {
    id: 2,
    email: 'email2@email.com',
    senha: 'email2',
    roles: 'USER',
    nome: 'Teste2',
    datanasc: '01/01/2000',
    cpf: '30042513375',
    ativo: true
  },
  {
    id: 3,
    email: 'email3@email.com',
    senha: 'email3',
    roles: 'USER',
    nome: 'Teste3',
    datanasc: '01/01/2000',
    cpf: '30042513375',
    ativo: true
  },
  {
    id: 4,
    email: 'email4@email.com',
    senha: 'email4',
    roles: 'ADMIN',
    nome: 'Teste4',
    datanasc: '01/01/2000',
    cpf: '30042513375',
    ativo: false
  }
]

const dadosMock:Informacao = {
  code: 0,
  codeText:  '',
  tipo: ''
}

@Pipe({name: 'searchfilter'})
class searchFilterMock implements PipeTransform {
  transform(value: any, ...args: any[]) {
    return '';
  }
}

const dialogServiceMock = {
  open () {
    return {
      onClose: of(dadosMock)
    }
  }
}


fdescribe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let httpMock: HttpTestingController;
  let usuService: UsuarioService;
  let infoService: InformacaoService;
  let confirmaService: ConfirmationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          {path: 'login', component: ComponentMock
        }
        ])
      ],
      declarations: [ AdminComponent, searchFilterMock ],
      providers: [
        UsuarioService,
        {provide: DialogService, useValue: dialogServiceMock},
        ConfirmationService,
        InformacaoService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    usuService = TestBed.inject(UsuarioService);
    infoService = TestBed.inject(InformacaoService);
    confirmaService = TestBed.inject(ConfirmationService);


    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('listarUsuarios retorna os dados para o usuario e mostra a mensagem quando houver erro', ()=>{
    const spyUsuService = spyOn(usuService, 'listarUsuarios');
    spyUsuService.and.returnValue(of(listaUsuarioMock));
    component.listarUsuarios();
    expect(component.usuarios).toBe(listaUsuarioMock);
    expect(component.usuarios).toEqual(listaUsuarioMock);

    spyUsuService.and.returnValue(throwError(dadosMock));
    const info = spyOn(infoService, 'setData').and.callThrough();
    component.listarUsuarios();
    expect(info).toHaveBeenCalled();

  });


  it ('deletarUsuario funciona corretamente', ()=> {
    let id = 1;
    let dados = {status: 0, statusText: ''} as HttpResponse<Object>
    const info = spyOn(infoService, 'setData').and.callFake(() => null);
    const service = spyOn(usuService, 'deletarUsuario').and.returnValue(of(dados));
    const spyDadosToast = spyOn(component, 'dadosToast');

    component.deletarUsuario(id);
    expect(service).toHaveBeenCalled();
    expect(info).toHaveBeenCalled();
    expect(spyDadosToast).toHaveBeenCalled();
  });

  it('dadosToast funciona corretamente', ()=>{
    let retornoDados = component.dadosToast(0, '', '');
    expect(retornoDados).toEqual(dadosMock);
  });

  it ('dialogExclusao funciona corretamente', () => {
    const id = 1;
    spyOn(component, 'deletarUsuario').and.callThrough();
    spyOn(confirmaService, 'confirm').and.callFake((confirmacao: any) => confirmacao.accept());
    const excluir = spyOn(usuService, 'deletarUsuario').and.callThrough();
    confirmaService.confirm({accept: () => {}})

    component.dialogExclusao(1);
    expect(excluir).toHaveBeenCalled();
  });

  it ('dadosModal chama lista de usuarios e envar os dados recebidos para o InformacaoService', () => {
    let operacao = 'create';
    let info = spyOn(infoService, 'setData');
    let lista = spyOn(component, 'listarUsuarios');
    component.dadosModal(operacao);
    expect(info).toHaveBeenCalled();
    expect(lista).toHaveBeenCalled()

    operacao = 'update';
    component.dadosModal(operacao);
    expect(info).toHaveBeenCalled();
    expect(lista).toHaveBeenCalled()
  });

  it ('restaurarModal chama lista de usuarios e envar os dados recebidos para o InformacaoService', () => {
    let info = spyOn(infoService, 'setData');
    let lista = spyOn(component, 'listarUsuarios');
    component.restaurarModal();
    expect(info).toHaveBeenCalled();
    expect(lista).toHaveBeenCalled()
  });

  it('exportPdf chama o print', () => {
    let spyWindow = spyOn(window, 'print');
    component.exportPDF();
    expect(spyWindow).toHaveBeenCalled();
  })



});
