import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { LoginComponent } from './components/login/login.component';
import { DadosComponent } from './pages/dados/dados.component';
import { HomeComponent } from './pages/home/home.component';
import { UploadDadosComponent } from './pages/upload-dados/upload-dados.component';

const routes: Routes = [
  {path: '', component:HomeComponent },
  {path: 'login', component:LoginComponent},
  {path: 'cadastrar', component:CadastroComponent},
  {path:'dados', component: DadosComponent},
  {path:'uploadDados', component: UploadDadosComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
