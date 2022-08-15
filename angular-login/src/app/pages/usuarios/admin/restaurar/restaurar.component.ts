import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { IUsuario } from 'src/app/core/interface/usuario';
import { UsuarioService } from 'src/app/core/service/usuario.service';

@Component({
  selector: 'app-restaurar',
  templateUrl: './restaurar.component.html',
  styleUrls: ['./restaurar.component.css']
})
export class RestaurarComponent implements OnInit {

  usuarios: IUsuario[] = [];

  searchText:string = '';

  constructor(private usuarioService: UsuarioService, private ref: DynamicDialogRef) { }

  ngOnInit(): void {
    this.restaurarUsuario();
  }

  restaurarUsuario(){
    let id = sessionStorage.getItem('usuario');
    this.usuarioService.listaRestaurar(Number(id)).subscribe(dados => this.usuarios = dados)
  }

  dadosModal(id: number){
    this.usuarioService.restaurarUsuario(id).toPromise().then(response => {
      this.restaurarUsuario();
      this.ref.close(response);
    });
  }

}
