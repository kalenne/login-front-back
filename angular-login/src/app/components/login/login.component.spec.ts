import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable, of, throwError } from 'rxjs';
import { IUsuario } from 'src/app/core/interface/usuario';
import { LoginService } from 'src/app/core/service/login.service';
import { Informacao, InformacaoService } from 'src/app/core/service/message.service';
import { UsuarioService } from 'src/app/core/service/usuario.service';

import { LoginComponent } from './login.component';

class ComponentTestRouter {}

const usuarioMock: IUsuario  = {
  id: 1,
  email: 'email@test.com',
  senha: 'password',
  roles: 'USER',
  nome: 'Teste',
  datanasc: '01/01/2000',
  cpf: '12345678910',
  ativo: true
}
const dadosMock: Informacao = {
  code: 0,
  codeText:  '',
  tipo: ''
}

const DialogServiceMock = {
  open () {
    return {
      onClose: of(dadosMock)
    }
  }
}
fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let usuService: UsuarioService;
  let loginService: LoginService;
  let infoService: InformacaoService;
  let storage = {} as any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          {path: 'usuario/admin', component: ComponentTestRouter},
          {path: 'usuario/usuario', component: ComponentTestRouter}
        ])
      ],
      providers: [
        LoginService,
        {
          provide: DialogService,
          useValue: DialogServiceMock
        }
        ,
        InformacaoService,
        UsuarioService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

      spyOn(sessionStorage, 'getItem').and.callFake( (key: string) => {
          return storage[key] ? storage[key] : null;
      });

      spyOn(sessionStorage, 'setItem').and.callFake( (key: string, value: string) => {
          return storage[key] = value;
      });

      usuService = fixture.debugElement.injector.get(UsuarioService);
      loginService = TestBed.inject(LoginService);
      infoService = TestBed.inject(InformacaoService);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('routerDados redireciona caso possua token', () => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate');
    component.token = 'abcd';

    component.usuario.roles = 'ADMIN';
    component.routerDados();
    expect(spy).toHaveBeenCalledWith(['/usuario/admin']);

    component.usuario.roles = 'USER';
    component.routerDados();
    expect(spy).toHaveBeenCalledWith(['/usuario/usuario']);
  });

  it ('dadosToast retorna tipo Informacao', ()=> {
    let code = 0;
    let codeText = '';
    let tipo = '';
    let info: Informacao = component.dadosToast(code, codeText, tipo);

    expect(info.code).toBe(code);
  });

  it ('dadosUsuario retorna mensagem ao concluir o dialogo', () => {
    let operacao = 'op'
    let service = TestBed.inject(InformacaoService);
    let message = spyOn(service, 'setData');
    spyOn(component, 'dadosToast').and.callThrough();

    component.dadosUsuario(operacao);

    expect(message).toHaveBeenCalled();
  });

  it ('resetUsuario retorna mensagem ao concluir o dialogo', () => {
    let operacao = 'op'
    let service = TestBed.inject(InformacaoService);
    let message = spyOn(service, 'setData');
    spyOn(component, 'dadosToast').and.callThrough();

    component.resetUsuario(operacao);

    expect(message).toHaveBeenCalled();
  });

  it('usuariosLogado retorna a rota quando tiver um usuario ativo e mensagem caso desativo', () => {
    let usuarioService = TestBed.inject(UsuarioService);
    let messageService = TestBed.inject(InformacaoService);
    let usuarioLogado = spyOn(usuarioService, 'usuarioLogado').and.returnValue(of(usuarioMock));
    let message = spyOn(messageService, 'setData');
    let rota = spyOn(component, 'routerDados');

    component.usuariosLogado();
    expect(component.usuario).not.toBeNull();
    expect(component.usuario).toBe(usuarioMock);
    expect(rota).toHaveBeenCalled();

    usuarioMock.ativo = false;
    component.usuariosLogado()
    expect(message).toHaveBeenCalled();

  })

  it('funcao login chama usuarioLogado quando possui token', () => {
    let token = 'abc';
    let spyUsuarioLogado = spyOn(usuService, 'usuarioLogado').and.callThrough();
    let spyLogin = spyOn(loginService, 'login');
    spyLogin.and.returnValue(of(token))

    component.usuario = usuarioMock;
    component.login();
    expect(spyUsuarioLogado).toHaveBeenCalled();

    spyLogin.and.returnValue(throwError(dadosMock));
    const spyInfo = spyOn(infoService, 'setData').and.callThrough();
    component.login();
    expect(spyInfo).toHaveBeenCalled();
  });

});
