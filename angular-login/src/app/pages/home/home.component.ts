import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/core/service/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  basicData: any;

  dados: any;

  constructor(private usuarioService: UsuarioService) { }
  ngOnInit(): void {
    this.getDados()
  }

  getDados() {
    this.usuarioService.quantidadeRoles().subscribe(response => {
      this.dados = response;
      this.grafico();
    });
  }

  grafico() {
    this.basicData = {
      labels: ['ADMIN', 'USER'],
      datasets: [
          {
              label: 'Quantidade de Usuarios',
              backgroundColor: ['#42A5F5',  "pink"],
              data: [this.dados[0][1],this.dados[1][1]]
          },
      ]
  };
  }

}
