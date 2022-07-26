import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Interceptor } from 'src/app/core/service/interceptor.service';

import { HTTP_INTERCEPTORS } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    Interceptor,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    }
  ]
})
export class InterceptorModule { }
