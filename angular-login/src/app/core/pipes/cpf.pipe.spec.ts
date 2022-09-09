import { CpfPipe } from "./cpf.pipe";

fdescribe('cpfPipe', () => {
  let pipe: CpfPipe;

  beforeEach(()=>{
    pipe = new CpfPipe();
  });

  it('cpfPipe instanciou corretamente', ()=>{
    expect(pipe).toBeTruthy();
  });

  it('transform retorna corretamente', () => {
    const cpf = '12345678910';
    const cpfFormatado = pipe.transform(cpf);
    expect(cpfFormatado.length).toBe(14);
  })

  it('transform nao modifica se valor for letra', () => {
    const cpf = 'abcdefg';
    const cpfFormatado = pipe.transform(cpf);
    expect(cpfFormatado.length).toBe(0);
  })

  it('transform nao modifica se valor for maior que 11 numeros', () => {
    const cpf = '123456789101';
    const cpfFormatado = pipe.transform(cpf);
    expect(cpfFormatado.length).toBe(0);
  })

});
