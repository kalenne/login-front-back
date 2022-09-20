import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map, retry } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUsuario } from '../interface/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  api = `${environment.api}/api/usuario`

  constructor(private http: HttpClient) { }

  listarUsuarios(id: number) {
    return this.http.get<any>(`${this.api}/admin/listar/${id}`);
  }

  listaRestaurar(id: number){
    return this.http.get<any>(`${this.api}/admin/restaurar/${id}`);
  }

  cadastrarUsuarios(usuario: IUsuario){
    return this.http.post<IUsuario>(`${this.api}/salvar`, usuario, {observe: 'response'});
  }

  usuarioLogado(usuario: IUsuario) {
    return this.http.post<IUsuario>(`${this.api}/logado`, usuario);
  }

  editar(usuario: IUsuario){
    return this.http.put<IUsuario>(`${this.api}/editar`, usuario, {observe: 'response'});
  }

  deletarUsuario(id: number) {
    return this.http.put(`${this.api}/excluir`, id, {observe: 'response'});
  }

  restaurarUsuario(id: number){
    return this.http.put(`${this.api}/restaurar`, id, {observe: 'response'});
  }

  roles(){
    return this.http.get<any>(`${this.api}/roles`);
  }

  quantidadeRoles() {
    return this.http.get<any>(`${this.api}/quantidaderoles`);
  }

  resetSenha(usuario: IUsuario) {
    return this.http.put<IUsuario>(`${this.api}/resetsenha`, usuario, {observe:'response'});
  }
}
