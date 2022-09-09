import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { Informacao, InformacaoService } from 'src/app/core/service/message.service';

import { MessageComponent } from './message.component';

const dadosMock: Informacao = {
  code: 0,
  codeText:  '',
  tipo: ''
}

const MessageServiceMock = {
  add () {}
}

fdescribe('MessageComponent', () => {
  let component: MessageComponent;
  let fixture: ComponentFixture<MessageComponent>;
  let service: InformacaoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageComponent ],
      providers: [
        InformacaoService,
        {
          provide: MessageService,
          useValue: MessageServiceMock
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(InformacaoService);
    spyOn(service, 'getData').and.callFake(()=> of(dadosMock));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('tipos retorna mensagem de acordo com o codigo inserido', () => {
    const service = TestBed.inject(MessageService);
    const spy = spyOn(service, 'add');

    dadosMock.code = 200;
    component.dados = dadosMock;
    component.tipos();
    expect(spy).toHaveBeenCalled();

    dadosMock.code = 400;
    component.dados = dadosMock;
    component.tipos();
    expect(spy).toHaveBeenCalled();

    dadosMock.code = 500;
    component.dados = dadosMock;
    component.tipos();
    expect(spy).toHaveBeenCalled();

    dadosMock.code = 0;
    dadosMock.codeText = 'inativo';
    component.dados = dadosMock;
    component.tipos();
    expect(spy).toHaveBeenCalled();
  });
});
