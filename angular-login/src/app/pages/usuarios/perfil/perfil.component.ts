import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { CadastroComponent } from 'src/app/components/cadastro/cadastro.component';
import { IUsuario } from 'src/app/core/interface/usuario';
import { Informacao, InformacaoService } from 'src/app/core/service/message.service';
import { UsuarioService } from 'src/app/core/service/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  usuario = {} as IUsuario;
  id: string | null= '';

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private dialogService: DialogService,
    private message: InformacaoService
  ) {}

  ngOnInit(): void {
    this.listarUsuarios();
  }

  listarUsuarios() {
    this.id = sessionStorage.getItem('usuario');
    this.usuarioService.listarUsuarios(Number(this.id)).subscribe((data: any) => {
      this.usuario = data;
    }, (err) => {
      this.router.navigate(['/login']);
    });
  }

  dialogExclusao(id: number) {
    this.confirmationService.confirm({
      message: 'Deseja confirmar a exclusão do Usuário ?',
      accept: () => {
        this.excluirUsuario(id);
      },
    });
  }
  excluirUsuario(id: number) {
    this.usuarioService
      .deletarUsuario(id)
      .subscribe((data) => {
        this.router.navigate(['/login']);
        this.message.setData(this.dadosToast(data.status, data.statusText, 'Exclusão'));
      });
  }

  editarUsuario(usuario: IUsuario) {
    let ref = this.dialogService.open(CadastroComponent, {
      header: 'Editar Informações',
      width: '60%',
      data: {
        operacao: 'update',
        admin: usuario.roles,
        usuario: usuario,
      },
    });

    ref.onClose.subscribe((dados) => {
      this.listarUsuarios()
      this.message.setData(this.dadosToast(dados.status, dados.searchText, 'Edição'))
    });
  }

  dadosToast(code: number, codeText:string, tipo: string): Informacao {
    const info = {code, codeText, tipo} as Informacao;
    return info;
  }
}
