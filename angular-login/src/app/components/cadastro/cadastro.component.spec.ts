import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputMaskModule, INPUTMASK_VALUE_ACCESSOR } from 'primeng/inputmask';
import { PasswordModule, Password_VALUE_ACCESSOR } from 'primeng/password';
import { Informacao, InformacaoService } from 'src/app/core/service/message.service';
import { UsuarioService } from 'src/app/core/service/usuario.service';
import { of, throwError } from 'rxjs';
import { CadastroComponent } from './cadastro.component';
import { IUsuario } from 'src/app/core/interface/usuario';
import { HttpResponse } from '@angular/common/http';

const DynamicDialogRefMock = {
  close: () => null
}

const dynamicDialogConfigMock = {
  data: {
    operacao: null,
    admin: '1',
    usuario: {
      email: 'email',
      roles: 'ADMIN',
      nome: 'teste',
      datanasc: '01/01/2000',
      cpf: '12345678910'
    }
  }
}

const dadosMock: Informacao = {
  code: 0,
  codeText:  '',
  tipo: ''
}
fdescribe('CadastroComponent', () => {
  let component: CadastroComponent;
  let fixture: ComponentFixture<CadastroComponent>;
  let dynamicRef: DynamicDialogRef;
  let role = ['0', '1'];
  let usuServ: UsuarioService;
  let infoService: InformacaoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        PasswordModule,
        InputMaskModule
        ],
      declarations: [ CadastroComponent ],
      providers:[
        {provide: DynamicDialogConfig, useValue: dynamicDialogConfigMock},
        {provide: DynamicDialogRef, useValue: DynamicDialogRefMock},
        InformacaoService,
        UsuarioService
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA, INPUTMASK_VALUE_ACCESSOR, NG_VALUE_ACCESSOR, Password_VALUE_ACCESSOR]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroComponent);
    component = fixture.componentInstance;
    dynamicRef = TestBed.inject(DynamicDialogRef);
    usuServ = TestBed.inject(UsuarioService);
    infoService = TestBed.inject(InformacaoService);
    spyOn(usuServ, 'roles').and.callFake(()=> of(role));

    fixture.detectChanges();
    component.operacao = 'update';
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getRoles retorna valores da lista mockada', ()=>{
    component.getRoles();
    expect(component.roles[0]).toBe(role[0]);
  });

  it('dadosToast retorna objeto na interface Informacao', ()=>{
    const code = 0;
    const text = '';
    const tipo = '';

    let retornoInfo = component.dadosToast(code, text, tipo);
    expect(retornoInfo.code).toBe(code);
  });

  it('editarUsuario retorna os usuarios que vieram atraves do data', () => {
    component.editarUsuario();
    expect(component.formGroup.value.email).toBe('email');
    expect(component.formGroup.value.roles).toBe('ADMIN');
    expect(component.formGroup.value.nome).toBe('teste');
    expect(component.formGroup.value.datanasc).toBe('01/01/2000');
    expect(component.formGroup.value.cpf).not.toBeNull();
  });

  it('dialogCpf retorna cpfdialog como true', ()=> {
    expect(component.cpfdialog).toBeFalse()
    component.dialogcpf();
    expect(component.cpfdialog).toBeTrue();
  });
  it('salvarDados retorna dados para o ref quando operacao for create', ()=> {
    const lista = {status: 200} as HttpResponse<IUsuario>;
    const spyUsuServ = spyOn(usuServ, 'cadastrarUsuarios');
    spyUsuServ.and.callFake(() => of(lista));
    const spy = spyOn(dynamicRef, 'close');

    component.formGroup.value.cpf = '00746444087';
    component.operacao = 'create'
    component.salvarDados();
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(lista);

    spyUsuServ.and.returnValue(throwError(dadosMock));
    const spyMessage = spyOn(infoService, 'setData').and.callThrough();
    component.salvarDados();
    expect(spyMessage).toHaveBeenCalled();
  });

  it('salvarDados retorna dados para o ref quando operacao for update', ()=> {
    const lista = {status: 200} as HttpResponse<IUsuario>;
    const spyUsuServ = spyOn(usuServ, 'editar');
    spyUsuServ.and.callFake(() => of(lista));
    const spy = spyOn(dynamicRef, 'close');

    component.formGroup.value.cpf = '00746444087';
    component.operacao = 'update'
    component.salvarDados();
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(lista);

    spyUsuServ.and.returnValue(throwError(dadosMock));
    const spyMessage = spyOn(infoService, 'setData').and.callThrough();
    component.salvarDados();
    expect(spyMessage).toHaveBeenCalled();
  });

  it('salvarDados retorna mensagem do dialog quando o cpf nao for valido', ()=> {
    const spy = spyOn(component, 'dialogcpf').and.callThrough();

    component.formGroup.value.cpf = '00000';
    component.salvarDados();
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalled();
  });

});
