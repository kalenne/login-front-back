import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUsuario } from 'src/app/core/interface/usuario';
import { UsuarioService } from 'src/app/core/service/usuario.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { getLocaleDateFormat } from '@angular/common';
import { Data } from '@angular/router';
import * as FileSaver from 'file-saver';

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

  exportPDF(): void {
    const dataAutal = new Date().toLocaleString();
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 210;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 10;
      PDF.setFontSize(8);
      PDF.text(`PDF gerado em ${dataAutal} `, 4, position-3);
      PDF.addImage(FILEURI, 'PNG', 2, position, fileWidth, fileHeight)
      PDF.save('lista-usuario.pdf');
    });
  }

}

