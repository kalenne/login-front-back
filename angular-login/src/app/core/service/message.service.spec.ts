import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Informacao, InformacaoService } from './message.service';


const dadosMock: Informacao = {
  code: 0,
  codeText:  '',
  tipo: ''
}
fdescribe('MessageService', () => {

  let service: InformacaoService;

  beforeEach(()=> {
    TestBed.configureTestingModule({
      imports:[],
      declarations: [],
      providers: [
        InformacaoService
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    });
  });

  beforeEach(()=>{
    service = TestBed.inject(InformacaoService);
  });

  it('InformacaoService instaciou corretamente', ()=>{
    expect(service).toBeTruthy();
  });

  it('setData funciona corretamente', ()=> {

    const data = service['data'];
    const spy = spyOn(data, 'next');
    service.setData(dadosMock);

    expect(spy).toHaveBeenCalled();
  });

  it('getData', ()=>{
    service.setData(dadosMock);

    service.getData().subscribe((response: Informacao) => {
      expect(response).toBe(dadosMock);
    })
  });

});
