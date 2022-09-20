import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { LoginService } from './login.service';
import { IUsuario } from '../interface/usuario';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';


const loginMock: IUsuario = {
    id: 1,
    email: 'email@email.com',
    senha: 'email',
    roles: 'ADMIN',
    nome: 'Teste ',
    datanasc: '01/01/2000',
    cpf: '30042513375',
    ativo: true
}

fdescribe('LoginService', () => {
  let service: LoginService;
  let httpMock: HttpTestingController;
  let token = 'abc';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        LoginService
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    });

    service = TestBed.inject(LoginService);
    httpMock = TestBed.inject(HttpTestingController);

    //spyOn(service, 'login').and.callFake(() => of(token));
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('LoginService instanciado', () => {
    expect(service).toBeTruthy();
  });

  it('login funciona corretamente', <any> fakeAsync( ():void =>{
    const api = 'http://localhost:8080/login';
    service.login(loginMock).subscribe()

    const http = httpMock.expectOne({method: 'POST'})
    expect(http.request.method).toBe('POST');
    expect(http.request.url).toBe(api);
  }));



});
