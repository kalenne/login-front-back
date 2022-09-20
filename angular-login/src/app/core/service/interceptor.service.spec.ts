import { HttpClient, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { Interceptor } from './interceptor.service';

fdescribe('InterceptorService', () => {
  let service: Interceptor;
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;
  let storage = {} as any;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule],
      providers:[
        {provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true}
      ]
    });
    service = TestBed.inject(Interceptor);
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);

    spyOn(sessionStorage, 'getItem').and.callFake( (key: string) => {
      return storage[key] ? storage[key] : null;
    });

    spyOn(sessionStorage, 'setItem').and.callFake( (key: string, value: string) => {
        return storage[key] = value;
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('interceptor retorna o authorization', () => {
    sessionStorage.setItem('token', 'abc');
    const httpHandler = {handle(req) {}} as HttpHandler;
    const httpRequest = {clone(){}} as HttpRequest<any>;
    const spyHandler = spyOn(httpHandler, 'handle');
    service.intercept(httpRequest, httpHandler);

    httpClient.get('/teste').subscribe();
    let req = httpMock.expectOne('/teste');
    expect(spyHandler).toHaveBeenCalled();
    expect(req.request.url).toBe('/teste');
    expect(req.request.headers.get('Authorization')).toBe('abc');
  });
});
