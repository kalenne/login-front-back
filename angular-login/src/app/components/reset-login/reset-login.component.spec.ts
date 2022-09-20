import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PasswordModule, Password_VALUE_ACCESSOR } from 'primeng/password';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { ResetLoginComponent } from './reset-login.component';
import { UsuarioService } from 'src/app/core/service/usuario.service';
import { HttpResponse } from '@angular/common/http';
import { IUsuario } from 'src/app/core/interface/usuario';

const DynamicDialogRefMock = {
  close: () => null
}

const dynamicDialogConfigMock = {
  data: {
    operacao: '0'
  }
}
fdescribe('ResetLoginComponent', () => {
  let component: ResetLoginComponent;
  let fixture: ComponentFixture<ResetLoginComponent>;
  let usuarioService: UsuarioService;
  let dynamicRef: DynamicDialogRef;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        PasswordModule
      ],
      declarations: [ ResetLoginComponent ],
      providers: [
        {provide: DynamicDialogConfig, useValue: dynamicDialogConfigMock},
        {provide: DynamicDialogRef, useValue: DynamicDialogRefMock},
        UsuarioService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Password_VALUE_ACCESSOR]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetLoginComponent);
    component = fixture.componentInstance;
    usuarioService = TestBed.inject(UsuarioService);
    dynamicRef = TestBed.inject(DynamicDialogRef);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getDdcData operacao recebe o valor da data via DynamicDialogConfig', () => {
    expect(component.operacao).toBe('0');
  });

  it('dadosToast retorna objeto na interface Informacao', ()=>{
    const code = 0;
    const text = '';
    const tipo = '';

    let retornoInfo = component.dadosToast(code, text, tipo);
    expect(retornoInfo.code).toBe(code);
  });

  it('salvarDados ao salvar fecha o dialogo do DynamicDialogRef', () => {
    const lista = {status: 200} as HttpResponse<IUsuario>;
    spyOn(usuarioService, 'resetSenha').and.callFake(() => of(lista));
    const spy = spyOn(dynamicRef, 'close');

    component.salvarDados();
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(lista);


  });
});
