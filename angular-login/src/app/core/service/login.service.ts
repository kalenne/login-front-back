import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IUsuario } from '../interface/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  api = `${environment.api}/login`;
  constructor(private http:HttpClient) { }

  public login (usuario: IUsuario){
    return this.http.post(this.api, JSON.stringify(usuario), {responseType: 'text'}).pipe(
    );

  }
}
