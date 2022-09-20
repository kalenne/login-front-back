import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'passwordfilter'
})
export class PasswordfilterPipe implements PipeTransform {

  transform(value: String): string {

    if(value){
      return "*".repeat(value.length)
    }
    return '';
  }

}
