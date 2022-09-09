import { PasswordfilterPipe } from "./passwordfilter.pipe";

fdescribe ('PasswordFilterPipe', ()=> {
  let pipe: PasswordfilterPipe

  beforeEach(()=> {
    pipe = new PasswordfilterPipe();
  });

  it('PasswordFilter instanciado corretamente', ()=> {
    expect(pipe).toBeTruthy();
  });

  it ('transform modifica se houver qualquer string', () => {
    const password = '123456';
    const novoPassword = pipe.transform(password);

    expect(novoPassword.length).toBe(password.length);
  });

  it ('transform nao modifica se nao houver valores', () => {
    const password = '';
    const novoPassword = pipe.transform(password);

    expect(novoPassword.length > 1).toBeFalse();
  });

});
