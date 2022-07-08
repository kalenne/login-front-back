import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUsuario } from '../interface/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  api = `${environment.api}/api/usuario`

  reqHeader:HttpHeaders = new HttpHeaders({
    'Authorization': `Bearer ${sessionStorage.getItem("token")}`
  })
  constructor(private http: HttpClient) { }

  listarUsuarios() {
    return this.http.get<IUsuario[]>(`${this.api}/listar`, {headers: this.reqHeader});
  }

  cadastrarUsuarios(usuario: IUsuario):Observable<IUsuario>{
    return this.http.post<IUsuario>(`${this.api}/salvar`, usuario);
  }

  atualizarSenha(usuario: IUsuario){
    return this.http.post<IUsuario>(`${this.api}/trocarsenha`, usuario);
  }
}
