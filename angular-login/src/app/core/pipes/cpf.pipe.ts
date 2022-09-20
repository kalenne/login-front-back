import { Pipe, PipeTransform } from '@angular/core';
import { cpf } from 'cpf-cnpj-validator';

@Pipe({
  name: 'cpf'
})
export class CpfPipe implements PipeTransform {

  transform(value: string): string {
    if(value.length === 11 && Number(value)){
      return cpf.format(value);
    }
    return '';
  }
}


