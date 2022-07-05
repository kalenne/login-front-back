import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, DoCheck {
  itens: MenuItem[] = [];
  label: string = 'Login';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.itens = [
      {
          label: 'Usuários',
          icon: 'pi pi-fw pi-table',
          items: [
              {
                  label: 'Novo',
                  icon: 'pi pi-fw pi-plus',
                  routerLink: '/cadastrar'
              },
              {
                  label: 'Listar',
                  icon: 'pi pi-fw pi-user-edit',
                  routerLink: '/dados'
              }
          ]
      },
    ];
  }

  ngDoCheck(): void {
    console.log("vezes que checou");
    if(sessionStorage.getItem("logout") === 'Logout'){
      this.label = 'Logout';
    }
  }

  login() {
    this.router.navigate(['/login']);
    if (sessionStorage.getItem("logout") === 'Logout'){
      sessionStorage.clear();
      this.label = 'Login';
    }
  }
}
