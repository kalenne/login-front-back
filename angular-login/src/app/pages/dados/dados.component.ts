import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUsuario } from 'src/app/core/interface/usuario';
import { UsuarioService } from 'src/app/core/service/usuario.service';

@Component({
  selector: 'app-dados',
  templateUrl: './dados.component.html',
  styleUrls: ['./dados.component.css']
})
export class DadosComponent implements OnInit {

  usuarios: IUsuario[] = [];
  constructor(private usuarioService:UsuarioService) { }

  ngOnInit(): void {
    if(sessionStorage.getItem("token")){
      this.listarUsuarios();
    }
  }

  listarUsuarios(){
    this.usuarioService.listarUsuarios().subscribe(data => this.usuarios = data);
  }
}
