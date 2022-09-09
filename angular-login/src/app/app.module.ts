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
import { PerfilComponent } from './pages/usuarios/perfil/perfil.component';
import { AdminComponent } from './pages/usuarios/admin/admin.component';
import { CpfPipe } from './core/pipes/cpf.pipe';
import { ResetLoginComponent } from './components/reset-login/reset-login.component';
import { InterceptorModule } from './modules/interceptor/interceptor.module';
import { NgxLoadingModule } from "ngx-loading";
import { MessageComponent } from './components/message/message.component';
import { InformacaoService } from './core/service/message.service';
import { RestaurarComponent } from './pages/usuarios/admin/restaurar/restaurar.component';
import { SearchfilterPipe } from './core/pipes/searchfilter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    CadastroComponent,
    HeaderComponent,
    PasswordfilterPipe,
    PerfilComponent,
    AdminComponent,
    CpfPipe,
    ResetLoginComponent,
    MessageComponent,
    RestaurarComponent,
    SearchfilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PrimengModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    InterceptorModule,
    NgxLoadingModule.forRoot({})
  ],
  providers: [
    InformacaoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
