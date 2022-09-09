import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { IUsuario } from '../interface/usuario';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { UsuarioService } from './usuario.service';

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
fdescribe('UsuarioService', () => {
  let service: UsuarioService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        UsuarioService,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
    service = TestBed.inject(UsuarioService);
    httpMock = TestBed.inject(HttpTestingController);
    spyOn(service, 'listarUsuarios').and.callFake(() => of(listaUsuarioMock));

  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('listarUsuarios funciona corretamente', () => {
    const id = 1;
    let retorno:IUsuario[] = [];

    service.listarUsuarios(id).subscribe((response:IUsuario[]) => {
      expect(response).toBe(listaUsuarioMock);
      retorno = response;
    });
    expect(retorno).toBe(listaUsuarioMock);
  });

  it('cadastrarUsuario envia os dados por POST e JSON', ()=> {
    service.cadastrarUsuarios(usuarioMock).subscribe();
    const http = httpMock.expectOne(`${service.api}/salvar`);
    expect( http.request.method).toBe('POST');
    expect( http.request.responseType).toEqual('json');
    expect(http.request.body).toBe(usuarioMock);
  });

  it('editar enviar os dados modificados por PUT e formato jSON', ()=> {
    service.editar(usuarioMock).subscribe();
    const http = httpMock.expectOne(`${service.api}/editar`);
    expect( http.request.method).toBe('PUT');
    expect( http.request.responseType).toEqual('json');
    expect(http.request.body).toBe(usuarioMock);
  });

  it('deletarUsuario modifica os dados pelo metodo PUT', () => {
    let id = 1;

    service.deletarUsuario(id).subscribe();

    const http = httpMock.expectOne(`${service.api}/excluir`);
    expect( http.request.method).toBe('PUT');
    expect(http.request.body).toBe(1);
  });

  it('resetSenha envia a requisição utilizando o metodo PUT', () => {
    service.resetSenha(usuarioMock).subscribe();

    const http = httpMock.expectOne(`${service.api}/resetsenha`);
    expect( http.request.method).toBe('PUT');
    expect(http.request.body).toBe(usuarioMock);
  });

  it('restaurarUsuario modifica a requisicao atraves do metodo PUT', () => {
    const id = 1;
    service.restaurarUsuario(1).subscribe();

    const http = httpMock.expectOne(`${service.api}/restaurar`);
    expect( http.request.method).toBe('PUT');
    expect(http.request.body).toBe(1);
  });

  it('roles retorna os valores', () => {

    service.roles().subscribe();
    const http = httpMock.expectOne(`${service.api}/roles`);
    expect( http.request.method).toBe('GET');

  })

});
