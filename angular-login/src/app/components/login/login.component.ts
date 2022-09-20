import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { IUsuario } from 'src/app/core/interface/usuario';
import { LoginService } from 'src/app/core/service/login.service';
import {
  Informacao,
  InformacaoService,
} from 'src/app/core/service/message.service';
import { UsuarioService } from 'src/app/core/service/usuario.service';
import { CadastroComponent } from '../cadastro/cadastro.component';
import { ResetLoginComponent } from '../reset-login/reset-login.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  usuario = {} as IUsuario;
  token:string = '';
  loading = false;

  constructor(
    private usuarioService: UsuarioService,
    private loginService: LoginService,
    private router: Router,
    public dialogService: DialogService,
    private message: InformacaoService,
  ) {}
  display = false;

  ngOnInit(): void {
    sessionStorage.clear();
  }


  public login() {
    this.loading = true;
    this.loginService.login(this.usuario).subscribe(
      (data) => {
        if (data) {
          this.loading = false;
          this.token = data;
          sessionStorage.setItem('token', this.token);
          this.usuariosLogado();
        }
      },
      (err) => {
        this.loading = false;
        this.message.setData(this.dadosToast(err.status, err.statusText, 'Erro ao entrar'))
      }
    );
  }

  routerDados() {
    if (this.token) {
      if (this.usuario.roles === 'ADMIN') {
        this.router.navigate(['/usuario/admin']);
      }
      if (this.usuario.roles === 'USER') {
        this.router.navigate(['/usuario/usuario']);
      }
      let logout = 'Logout';
      sessionStorage.setItem('logout', logout);
    }
  }

  dadosToast(code?: number, codeText?: string, tipo?: string): Informacao {
    const info = { code, codeText, tipo } as Informacao;
    return info;
  }

  dadosUsuario(operacao: string) {
    let ref = this.dialogService.open(CadastroComponent, {
      header: 'Cadastrar',
      width: '55%',
      data: {
        operacao: operacao,
      },
    });

    ref.onClose.subscribe((data) => {
      this.message.setData(
        this.dadosToast(data.status, data.statusText, 'Cadastro')
      );
    });
  }

  resetUsuario(operacao: string) {
    let ref = this.dialogService.open(ResetLoginComponent, {
      header: 'Esqueceu sua conta?',
      width: '55%',
      data: {
        operacao: operacao,
      },
    });

    ref.onClose.subscribe((data) => {
      this.message.setData(
        this.dadosToast(data.status, data.statusText, 'Atualização')
      );
    });
  }

  usuariosLogado() {
    this.usuarioService
            .usuarioLogado(this.usuario)
            .subscribe(usuario => {
              if(usuario.ativo) {
                this.usuario = usuario;
                sessionStorage.setItem('usuario', `${usuario.id}`);
                this.routerDados();
              } else {
                this.message.setData(this.dadosToast(undefined, 'inativo'));
              }
            });
  }
}
