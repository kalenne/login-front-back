import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { CadastroComponent } from 'src/app/components/cadastro/cadastro.component';
import { IUsuario } from 'src/app/core/interface/usuario';
import { UsuarioService } from 'src/app/core/service/usuario.service';
import { Informacao, InformacaoService } from 'src/app/core/service/message.service';
import { RestaurarComponent } from './restaurar/restaurar.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  usuarios = [] as IUsuario[];
  usuarioAtivo = Number (sessionStorage.getItem('usuario'));
  columns: any[] = [];
  loading: boolean = true;

  searchText: string = '';
  id: string | null = '';

  constructor(
    private usuarioService: UsuarioService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private message: InformacaoService,
    private router: Router,
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
    this.id = sessionStorage.getItem('usuario');
    this.usuarioService.listarUsuarios(Number(this.id)).subscribe(
      (response)=> this.usuarios = response,
      (err) => {
        this.router.navigate(['/login']);
        this.message.setData(this.dadosToast(err.status, err.statusText, 'Dados'))
      });
  }

  exportPDF() {
    window.print();
  }

  deletarUsuario(id: number) {
    this.usuarioService
      .deletarUsuario(id)
      .subscribe((data) => {
        this.listarUsuarios();
        this.message.setData(this.dadosToast(data.status, data.statusText, 'Exclusão'));
      });
  }

  dadosModal(operacao: string, usuario?: IUsuario) {
    let header = operacao === 'create' ? 'Criação' : 'Edição';
    let ref = this.dialogService.open(CadastroComponent, {
      header: operacao === 'create' ? 'Cadastro' : 'Editar Informações',
      width: '55%',
      height: '130%',
      data: {
        operacao: operacao,
        admin: 'admin',
        usuario: usuario,
      },
    });

    ref.onClose.subscribe((data:any) => {
      if(data){
        this.listarUsuarios();
        this.message.setData(this.dadosToast(data.status, data.statusText, header));
      }
    });
  }

  dialogExclusao(id: number) {
    this.confirmationService.confirm({
      message: 'Deseja desativar o Usuário?',
      accept: () => {
        this.deletarUsuario(id);
      },
    });
  }

  restaurarModal() {
    let ref = this.dialogService.open( RestaurarComponent, {
      header: 'Usuarios Desativos',
      width: '90%',
    });

    ref.onClose.subscribe((data) => {
      if (data) {
        this.listarUsuarios();
        this.message.setData(this.dadosToast(data.status, data.statusText, "Restauração"));
      }
    });
  }

  dadosToast(code?: number, codeText?:string, tipo?: string): Informacao {
    const info = {code, codeText, tipo} as Informacao;
    return info;
  }
}
