import { HttpClient } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { AppConstants } from 'src/app/app-constants';
import { environment } from 'src/environments/environment';
import { IUsuario } from '../interface/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  api = `${environment.api}/login`
  constructor(private http:HttpClient) { }

  public login (usuario: IUsuario){
    return this.http.post(this.api, JSON.stringify(usuario), {responseType: 'text'});
  }
}
