import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from 'src/app/core/service/usuario.service';
import 'jspdf-autotable';
import { DocpdfService } from 'src/app/core/service/docpdf.service';
import { MessageService } from 'primeng/api';
import { IUsuario } from 'src/app/core/interface/usuario';


@Component({
  selector: 'app-dados',
  templateUrl: './dados.component.html',
  styleUrls: ['./dados.component.css']
})
export class DadosComponent implements OnInit {

  usuarios: any[] = [];

  columns:any[] = [];
  loading: boolean = true;

  constructor(private usuarioService:UsuarioService, private docpdf: DocpdfService, private messageService: MessageService) {
    this.columns = [
      {title: 'id', dataKey: 'id'},
      {title: 'Email', dataKey: 'email'},
      {title: 'Senha', dataKey:'senha'}
    ];
}

  ngOnInit(): void {
    if(sessionStorage.getItem('token')){
      this.listarUsuarios();
    }
  }

  listarUsuarios(){
    let id = sessionStorage.getItem('usuario');
    this.usuarioService.listarUsuarios(Number(id)).subscribe(data => {
      console.log(data)
    this.usuarios = data;
    });
  }
  exportPDF(){
    window.print();
  }


  // exportPDF(){
  //   let pdf = new jsPDF('p', 'pt');

  //   autoTable(pdf, {
  //     columns: this.columns,
  //     body: this.usuarios,
  //     didDrawPage: (dataArg) => {
  //       pdf.text('Usuarios', dataArg.settings.margin.left, 10);
  //     }
  //   });
  //   pdf.save('usuario.pdf');
  // }

  uploadPdf(event: any) {
    for(let file of event.files) {
      this.docpdf.uploadPdf(file).subscribe()
    }
    this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
  }
}

