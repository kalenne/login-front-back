import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { CadastroComponent } from 'src/app/components/cadastro/cadastro.component';
import { IUsuario } from 'src/app/core/interface/usuario';
import { UsuarioService } from 'src/app/core/service/usuario.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  usuarios = [] as IUsuario[];

  columns: any[] = [];
  loading: boolean = true;

  constructor(
    private usuarioService: UsuarioService,
    private messageService: MessageService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService
  ) {
    this.columns = [
      { title: 'id', dataKey: 'id' },
      { title: 'Email', dataKey: 'email' },
      { title: 'Senha', dataKey: 'senha' },
    ];
  }

  ngOnInit(): void {
    this.listarUsuarios();
  }

  listarUsuarios() {
    let id = sessionStorage.getItem('usuario');
    this.usuarioService.listarUsuarios(Number(id)).subscribe((data) => {
      this.usuarios = data;
    });
  }

  exportPDF() {
    window.print();
  }

  deletarUsuario(id: number) {
    this.usuarioService
      .deletarUsuario(id)
      .subscribe((data) => this.listarUsuarios());
  }

  dadosModal(operacao: string, usuario?: IUsuario) {
    let ref = this.dialogService.open(CadastroComponent, {
      header: operacao === 'create' ? 'Cadastro' : 'Editar Informações',
      width: '60%',
      data: {
        operacao: operacao,
        admin: 'admin',
        usuario: usuario,
      },
    });
    ref.onClose.subscribe((data) => {
      this.listarUsuarios();
    });
  }

  dialogExclusao(id: number) {
    this.confirmationService.confirm({
      message: 'Deseja confirmar a exclusão do Usuário?',
      accept: () => {
        this.deletarUsuario(id);
      },
    });
  }

  reload(){
    window.location.reload();
  }
}
