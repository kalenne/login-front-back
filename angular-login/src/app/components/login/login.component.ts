import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { IUsuario } from 'src/app/core/interface/usuario';
import { HidenavbarService } from 'src/app/core/service/hidenavbar.service';
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
export class LoginComponent implements OnInit, OnDestroy {
  usuario = {} as IUsuario;

  loading = false;

  constructor(
    private usuarioService: UsuarioService,
    private loginService: LoginService,
    private messageService: MessageService,
    private router: Router,
    public dialogService: DialogService,
    private message: InformacaoService,
    private navbar: HidenavbarService
  ) {}
  display = false;

  ngOnInit(): void {
    sessionStorage.clear();
  }

  ngOnDestroy(): void {}

  public login() {
    this.loading = true;
    this.loginService.login(this.usuario).subscribe(
      (data) => {
        if (data) {
          this.loading = false;
          let token = data;
          sessionStorage.setItem('token', token);

          this.usuarioService
            .usuarioLogado(this.usuario)
            .subscribe((usuario) => {
              this.usuario = usuario;
              sessionStorage.setItem('usuario', `${usuario.id}`);
              this.routerDados();
            });

            this.navbar.setLoginStatus();
        }
      },
      (err) => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Usuário Inválido!',
          key: 'error',
        });
      }
    );
  }

  routerDados() {
    if (sessionStorage.getItem('token')) {
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

  dadosToast(code: number, codeText: string, tipo: string): Informacao {
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
}
