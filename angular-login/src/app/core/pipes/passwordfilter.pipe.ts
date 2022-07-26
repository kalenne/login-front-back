import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'passwordfilter'
})
export class PasswordfilterPipe implements PipeTransform {

  transform(value: String): any {

    if(value){
      return "*******";
    }
  }

}
