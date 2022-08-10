import { AfterContentChecked, AfterViewInit, Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import { HidenavbarService } from 'src/app/core/service/hidenavbar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, DoCheck {
  itens: MenuItem[] = [];
  label: string = 'Login';

  loginStatus: boolean = false;

  constructor(private router: Router, private navbar: HidenavbarService) { }

  ngOnInit(): void {
    this.itens = [
      {
      },
    ];

    this.getLoginStatus();
  }

  ngDoCheck(): void {
    if(sessionStorage.getItem("logout") === 'Logout'){
      this.label = 'Logout';
    }
  }

  login() {
    this.router.navigate(['/login']);
    if (sessionStorage.getItem("logout") === 'Logout'){
      sessionStorage.clear();
      this.label = 'Login';
      this.loginStatus = false;
    }
  }

  getLoginStatus(){
    this.navbar.getLoginStatus().subscribe(data => {
      this.loginStatus = data;
      console.log(data)
    })
  }

}
