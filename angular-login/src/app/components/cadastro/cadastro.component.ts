import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IUsuario } from 'src/app/core/interface/usuario';
import { UsuarioService } from 'src/app/core/service/usuario.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  formGroup: FormGroup;
  operacao: string = '';

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private ddc: DynamicDialogConfig) {
    this.formGroup = this.fb.group({
      email: this.fb.control('', [Validators.required]),
      senha: this.fb.control('', [Validators.required]),
    });
  }

  ngOnInit(): void {
  }

  salvarDados(): void {
    const valor = this.formGroup.value;
    const request: IUsuario = {
      ... valor,
    };

    if (this.operacao === 'update') {
      this.usuarioService.atualizarSenha(request).subscribe();
    } else {
      this.usuarioService.cadastrarUsuarios(request).subscribe();
    }
  }


}
