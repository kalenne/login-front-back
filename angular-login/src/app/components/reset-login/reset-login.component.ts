import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IUsuario } from 'src/app/core/interface/usuario';
import { Informacao, InformacaoService } from 'src/app/core/service/message.service';
import { UsuarioService } from 'src/app/core/service/usuario.service';

@Component({
  selector: 'app-reset-login',
  templateUrl: './reset-login.component.html',
  styleUrls: ['./reset-login.component.css'],
})
export class ResetLoginComponent implements OnInit {
  formGroup: FormGroup;
  operacao: string = '';

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private ddc: DynamicDialogConfig,
    private ref: DynamicDialogRef
  ) {
    this.formGroup = this.fb.group({
      email: this.fb.control('', [Validators.required]),
      senha: this.fb.control('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getDdcData();
  }

  getDdcData() {
    if(this.ddc.data)
      this.operacao = this.ddc.data.operacao;
  }

  salvarDados() {
    const valor = this.formGroup.value;
    const request: IUsuario = {
      ...valor,
    };
    this.usuarioService.resetSenha(request).subscribe((data) => {
      this.ref.close(data);
    });
  }

  dadosToast(code: number, codeText:string, tipo: string): Informacao {
    const info = {code, codeText, tipo} as Informacao;
    return info;
  }
}
