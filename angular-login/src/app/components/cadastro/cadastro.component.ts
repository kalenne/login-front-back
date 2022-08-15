import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IUsuario } from 'src/app/core/interface/usuario';
import { UsuarioService } from 'src/app/core/service/usuario.service';
import { cpf } from 'cpf-cnpj-validator';
import { Informacao, InformacaoService } from 'src/app/core/service/message.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent implements OnInit {
  formGroup: FormGroup;
  operacao: string = '';
  admin: string = '';
  cpfdialog = false;
  roles = [];

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private ddc: DynamicDialogConfig,
    private messageService: MessageService,
    private ref: DynamicDialogRef,
    private message: InformacaoService
  ) {
    this.formGroup = this.fb.group({
      email: this.fb.control(null, [Validators.required]),
      senha: this.fb.control(null, [Validators.required]),
      roles: this.fb.control(null),
      nome: this.fb.control(null, [Validators.required]),
      datanasc: this.fb.control(null, [Validators.required]),
      cpf: this.fb.control(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.operacao = this.ddc.data.operacao;
    this.admin = this.ddc.data.admin;
    this.getRoles();

    if (this.operacao === 'update') {
      this.editarUsuario();
    }
  }

  getRoles() {
    this.usuarioService.roles().subscribe((data) => {
      this.roles = data;
    });
  }

  dialogcpf(): Boolean {
    return (this.cpfdialog = true);
  }

  salvarDados(): void {
    const valor = this.formGroup.value;

    if (cpf.isValid(valor.cpf)) {
      const request: IUsuario = {
        ...valor,
      };

      let header = this.operacao === 'create' ? 'Criação' : 'Edição';

      if (this.operacao == 'update') {
        this.usuarioService.editar(request).subscribe((data) => {
          this.ref.close(data);
        }, (err) => {
          this.message.setData(this.dadosToast(err.status, err.statusText, header ))
        });
      } else if (this.operacao == 'create') {
        this.usuarioService.cadastrarUsuarios(request).subscribe(
          (data) => {
            this.ref.close(data);
          },
          (err) => {
            this.message.setData(this.dadosToast(err.status, err.statusText, header ))
          }
        );
      }
    } else {
      this.dialogcpf();
    }
  }


  editarUsuario() {
    this.formGroup.get('email')?.patchValue(this.ddc.data.usuario.email);
    this.formGroup.get('roles')?.patchValue(this.ddc.data.usuario.roles);
    this.formGroup.get('nome')?.patchValue(this.ddc.data.usuario.nome);
    this.formGroup.get('datanasc')?.patchValue(this.ddc.data.usuario.datanasc);
    this.formGroup.get('cpf')?.patchValue(this.ddc.data.usuario.cpf);

  }

  dadosToast(code: number, codeText:string, tipo: string): Informacao {
    const info = {code, codeText, tipo} as Informacao;
    return info;
  }
}
