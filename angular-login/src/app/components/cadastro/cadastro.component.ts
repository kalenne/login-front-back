import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IUsuario } from 'src/app/core/interface/usuario';
import { UsuarioService } from 'src/app/core/service/usuario.service';
import { cpf } from 'cpf-cnpj-validator';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  formGroup: FormGroup;
  operacao: string = '';
  admin: string = '';
  cpfdialog = false;
  roles = [];

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private ddc: DynamicDialogConfig, private messageService: MessageService, private ref: DynamicDialogRef) {
    this.formGroup = this.fb.group({
      email: this.fb.control(null, [Validators.required]),
      senha: this.fb.control(null, [Validators.required]),
      roles: this.fb.control(null),
      nome: this.fb.control(null, [Validators.required]),
      datanasc: this.fb.control(null, [Validators.required]),
      cpf: this.fb.control(null, [Validators.required])
    });
  }

  ngOnInit(): void {
    this.operacao = this.ddc.data.operacao;
    this.admin = this.ddc.data.admin;
    this.getRoles()

    if (this.operacao === 'update') {
      this.editarUsuario();
    }
  }

  getRoles(){
    this.usuarioService.roles().subscribe(data => {
      this.roles = data
    })
  }

  dialogcpf(): Boolean{
    return this.cpfdialog = true;
  }

  salvarDados(): void {
    const valor = this.formGroup.value;

    if (cpf.isValid(valor.cpf)) {
      const request: IUsuario = {
        ... valor
      };
      if (this.operacao == 'update' && valor.senha != null) {
        this.usuarioService.editar(request).subscribe( data => {
          this.dialogSucesso();
          this.ref.close(data);
        });
      } else if( this.operacao == 'create') {
          this.usuarioService.cadastrarUsuarios(request).subscribe( data => {
            this.dialogSucesso();
            this.ref.close(data);
          });
      }
    } else {
      this.dialogcpf();
    }
  }

dialogSucesso (){
  this.messageService.add({
    severity: 'success',
    summary: 'Sucesso!',
    detail: 'Tudo certo!',
    key:'sucesso'
  });
}

editarUsuario(){
  this.formGroup.get('email')?.patchValue(this.ddc.data.usuario.email);
  this.formGroup.get('roles')?.patchValue(this.ddc.data.usuario.roles);
  this.formGroup.get('nome')?.patchValue(this.ddc.data.usuario.nome);
  this.formGroup.get('datanasc')?.patchValue(this.ddc.data.usuario.datanasc);
  this.formGroup.get('cpf')?.patchValue(this.ddc.data.usuario.cpf);
}

}
