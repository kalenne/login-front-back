import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { IUsuario } from 'src/app/core/interface/usuario';
import { UsuarioService } from 'src/app/core/service/usuario.service';

@Component({
  selector: 'app-reset-login',
  templateUrl: './reset-login.component.html',
  styleUrls: ['./reset-login.component.css']
})
export class ResetLoginComponent implements OnInit {

  formGroup: FormGroup;
  operacao: string = '';

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private ddc: DynamicDialogConfig, private messageService: MessageService) {
    this.formGroup = this.fb.group({
      email: this.fb.control('', [Validators.required]),
      senha: this.fb.control('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.operacao = this.ddc.data.operacao;
  }

  salvarDados(){
    const valor = this.formGroup.value;
    const request: IUsuario = {
      ... valor
    };

    this.usuarioService.editar(request).subscribe(data => {
      this.dialogSucesso();
    });
  }

  dialogSucesso (){
    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso!',
      detail: 'Tudo certo!',
      key:'sucesso'
    });
  }

}
