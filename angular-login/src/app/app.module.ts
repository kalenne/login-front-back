import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PrimengModule } from './modules/primeng/primeng.module';
import { HttpClientModule } from '@angular/common/http';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordfilterPipe } from './core/pipes/passwordfilter.pipe';
import { UploadDadosComponent } from './pages/upload-dados/upload-dados.component';
import { PerfilComponent } from './pages/usuarios/perfil/perfil.component';
import { AdminComponent } from './pages/usuarios/admin/admin.component';
import { CpfPipe } from './core/pipes/cpf.pipe';
import { ResetLoginComponent } from './components/reset-login/reset-login.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    CadastroComponent,
    HeaderComponent,
    PasswordfilterPipe,
    UploadDadosComponent,
    PerfilComponent,
    AdminComponent,
    CpfPipe,
    ResetLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PrimengModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
