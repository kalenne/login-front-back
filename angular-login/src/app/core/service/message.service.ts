import { HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUsuario } from '../interface/usuario';

Injectable({
  providedIn: 'root'
})

export interface Informacao  {
  code?: number,
  codeText?:string,
  tipo?: string
}

export class InformacaoService {

  private data = new BehaviorSubject<Informacao>({});

  constructor() { }

  setData(info: Informacao) {
    this.data.next(info);
  }

  getData(): Observable<Informacao> {
    return this.data.asObservable();
  }

}
