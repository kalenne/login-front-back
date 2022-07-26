import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocpdfService {

  api = `${environment.api}/api/docs`;

  constructor(private http: HttpClient) { }

  uploadPdf(file: File){
    return this.http.post(`${this.api}/uploadfiles`, file);
  }
}
