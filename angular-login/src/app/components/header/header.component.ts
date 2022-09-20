import { AfterContentChecked, AfterViewInit, Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, DoCheck {
  itens: MenuItem[] = [];
  label: string = 'Logout';

  loginStatus: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.itens = [
      {
        label: 'Dashboard', routerLink: '/home',
      },
      {
        label: 'Usuario', routerLink: '/usuario/admin'
      }
    ];

  }

  ngDoCheck(): void {
    this.loginStatus = sessionStorage.getItem('usuario') ? true : false;
  }

  login() {
    this.router.navigate(['/login']);
    if (this.loginStatus === true){
      sessionStorage.clear();
      this.loginStatus = false;
    }
  }

}
