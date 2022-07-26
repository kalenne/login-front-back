import { Pipe, PipeTransform } from '@angular/core';
import { cpf } from 'cpf-cnpj-validator';

@Pipe({
  name: 'cpf'
})
export class CpfPipe implements PipeTransform {

  transform(value: any): any {
    if(value){
      return cpf.format(value);
    }
  }
}


