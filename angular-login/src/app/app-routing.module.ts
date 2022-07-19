import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { UploadDadosComponent } from './pages/upload-dados/upload-dados.component';
import { AdminComponent } from './pages/usuarios/admin/admin.component';
import { PerfilComponent } from './pages/usuarios/perfil/perfil.component';

const routes: Routes = [
  {path: '', component:HomeComponent },
  {path: 'login', component:LoginComponent},
  {path: 'cadastrar', component:CadastroComponent},
  {path:'uploadDados', component: UploadDadosComponent},
  {path: 'usuario/admin', component: AdminComponent},
  {path: 'usuario/usuario', component: PerfilComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
