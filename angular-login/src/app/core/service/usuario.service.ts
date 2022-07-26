import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, retryWhen, mergeMap, retry } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUsuario } from '../interface/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  api = `${environment.api}/api/usuario`

  reqHeader:HttpHeaders = new HttpHeaders({
    'Authorization': `${sessionStorage.getItem("token")}`
  })
  constructor(private http: HttpClient) { }

  listarUsuarios(id: number) {
    return this.http.get<any>(`${this.api}/admin/listar/${id}`, {headers: this.reqHeader}).pipe(
      delay(3000),
      retry(3),
    );
  }

  cadastrarUsuarios(usuario: IUsuario):Observable<IUsuario>{
    return this.http.post<IUsuario>(`${this.api}/salvar`, usuario);
  }

  editar(usuario: IUsuario){
    return this.http.put<IUsuario>(`${this.api}/editar`, usuario);
  }

  usuarioLogado(usuario: IUsuario) {
    return this.http.post<IUsuario>(`${this.api}/logado`, usuario);
  }

  deletarUsuario(id: number) {
    return this.http.delete(`${this.api}/excluir/${id}`, {headers: this.reqHeader});
  }

  roles(){
    return this.http.get<any>(`${this.api}/roles`);
  }
}
