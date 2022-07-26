import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { IUsuario } from 'src/app/core/interface/usuario';
import { LoginService } from 'src/app/core/service/login.service';
import { UsuarioService } from 'src/app/core/service/usuario.service';
import { CadastroComponent } from '../cadastro/cadastro.component';
import { ResetLoginComponent } from '../reset-login/reset-login.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class  LoginComponent implements OnInit, OnDestroy {
  usuario = {} as IUsuario;

  constructor(
    private usuarioService: UsuarioService,
    private loginService: LoginService,
    private messageService: MessageService,
    private router: Router,
    public dialogService: DialogService
  ) {}
  display = false;

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  public login() {

    this.loginService.login(this.usuario).subscribe((data) => {
      if (data) {
        let token = data;
        sessionStorage.setItem('token', token);

        this.usuarioService.usuarioLogado(this.usuario).subscribe(usuario => {
          this.usuario = usuario;
          sessionStorage.setItem('usuario', `${usuario.id}`);
        });

        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso!',
          detail: 'Logado com Sucesso!',
        });

        this.display = true;
      }
    },
    err => {
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Usuário Inválido!', key: 'error'});
    }
    );
  }

  routerDados() {
    if (sessionStorage.getItem('token')) {

      if(this.usuario.roles === 'ADMIN') {
        this.router.navigate(['/usuario/admin']);
      }
      if (this.usuario.roles === 'USER'){
        this.router.navigate(['/usuario/usuario']);
      }
      let logout = 'Logout';
      sessionStorage.setItem('logout', logout);
    }
  }

  dadosUsuario(operacao: string){
    let ref = this.dialogService.open(CadastroComponent, {
      header: 'Cadastrar',
      width: '55%',
      data: {
        operacao: operacao
      }
  });
  }

  resetUsuario(operacao: string){
    let ref = this.dialogService.open(ResetLoginComponent, {
      header: 'Esqueceu sua conta?',
      width: '55%',
      data: {
        operacao: operacao
      }
  });
  }
}
