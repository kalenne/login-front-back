import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { CadastroComponent } from 'src/app/components/cadastro/cadastro.component';
import { IUsuario } from 'src/app/core/interface/usuario';
import { UsuarioService } from 'src/app/core/service/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  usuario = {} as IUsuario;

  constructor(private usuarioService: UsuarioService, private router: Router, private confirmationService: ConfirmationService , private dialogService: DialogService ){ }

  ngOnInit(): void {
    if(sessionStorage.getItem('token')){
      this.listarUsuarios();
    }
  }

  listarUsuarios(){
    let id = sessionStorage.getItem('usuario');
    this.usuarioService.listarUsuarios(Number(id)).subscribe(data => {
      this.usuario = data;
    });
  }

  dialogExclusao(id: number) {
    console.log(this.usuario)
    this.confirmationService.confirm({
        message: 'Deseja confirmar?',
        accept: () => {
            this.excluirUsuario(id);
        }
    });
}
  excluirUsuario(id: number){
    this.usuarioService.deletarUsuario(id).subscribe(data => this.router.navigate(['/login']));
  }

  editarUsuario(usuario: IUsuario){
    let ref = this.dialogService.open(CadastroComponent, {
      header: "Editar Informações",
      width: '60%',
      data: {
        operacao: 'update',
        admin: 'admin',
        usuario: usuario
      }
  });
  }
}
