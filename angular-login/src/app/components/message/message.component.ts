import { HttpStatusCode } from '@angular/common/http';
import { Component, DoCheck, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subscription, windowWhen } from 'rxjs';
import {
  Informacao,
  InformacaoService,
} from 'src/app/core/service/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent implements OnInit {
  dados = {} as Informacao;


  constructor(
    private message: InformacaoService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.message.getData().subscribe(response => {
      if(response){
        this.dados = response;
        this.tipos();
      }
    });
  }



  tipos() {
    if (this.dados?.code! >= 200 && this.dados?.code! <= 202) {
      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: `${this.dados?.tipo} realizada com Sucesso!`,
        key: 'info',
      });
    } else if (this.dados?.code! >= 400 && this.dados?.code! <= 499 && this.dados.code != 401) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Aviso',
        detail: `${this.dados?.tipo}: Verifique novamente as informações.`,
        key: 'info',
      });
    } else if (this.dados?.code! >= 500 && this.dados?.code! <= 599) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: `Erro ao realizar a ${this.dados?.tipo}, por favor verifique novamente!`,
        key: 'info',
      });
    } else if (this.dados?.code === 401) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Aviso',
        detail: `Sua conta está inativa, contate o suporte para ativá-la novamete.`,
        key: 'info',
      });
    }
  }

  setDados(response: Informacao) {
    this.dados = response;
  }
}
