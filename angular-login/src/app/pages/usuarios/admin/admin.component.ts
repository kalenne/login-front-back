import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { CadastroComponent } from 'src/app/components/cadastro/cadastro.component';
import { IUsuario } from 'src/app/core/interface/usuario';
import { DocpdfService } from 'src/app/core/service/docpdf.service';
import { UsuarioService } from 'src/app/core/service/usuario.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  usuarios = [] as IUsuario[];

  columns:any[] = [];
  loading: boolean = true;

  constructor(private usuarioService:UsuarioService, private docpdf: DocpdfService, private messageService: MessageService, private dialogService: DialogService) {
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

  deletarUsuario(id: number){
    this.usuarioService.deletarUsuario(id).subscribe(data => this.listarUsuarios());
  }

  cadastroModal(){
    let ref = this.dialogService.open(CadastroComponent, {
      header: 'Cadastro',
      width: '50%',
      data: {
        operacao: 'admin'
      }
  });
  }
}

