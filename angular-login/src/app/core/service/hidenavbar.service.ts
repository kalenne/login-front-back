import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HidenavbarService {

  private loginStatus = new BehaviorSubject<boolean>(false);

  constructor() { }

  setLoginStatus(){
    let tokenExiste = sessionStorage.getItem('token') ? true : false;
    console.log(`tokenexiste? ${tokenExiste}`)
    this.loginStatus.next(tokenExiste);
  }

  getLoginStatus(){
    return this.loginStatus.asObservable();
  }
}
