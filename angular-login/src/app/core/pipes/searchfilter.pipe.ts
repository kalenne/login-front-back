import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchfilter'
})
export class SearchfilterPipe implements PipeTransform {

  transform(usuarios: any[], searchText: string, tipo: string): any[] {

    if (!usuarios) {
      return [];
    }

    if (!searchText) {
      return usuarios;
    }

    searchText = searchText.toLowerCase();

    return usuarios.filter(pessoa=> pessoa[tipo].toLowerCase().includes(searchText));
  }

}
