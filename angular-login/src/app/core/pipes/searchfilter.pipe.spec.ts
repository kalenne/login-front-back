import { SearchfilterPipe } from "./searchfilter.pipe";

const usuarioMock = [
  {nome: 'andre'},
  {nome: 'paula'},
  {nome: 'yago'}
]

fdescribe('SearchFilter', ()=>{
  let pipe: SearchfilterPipe;

  beforeEach(()=>{
    pipe = new SearchfilterPipe();
  });

  it('SearchPipe instanciado corretamente', ()=>{
    expect(pipe).toBeTruthy();
  })

  it('transform retorna vazio caso nao possua lista de usuario', ()=>{
    let usuarios: any[] = [];
    let searchText = 'teste';
    let tipo = 'teste'
    let responsePipe = pipe.transform(usuarios, searchText, tipo);
    expect(responsePipe.length).toBe(0);
  });

  it('transform retorna usuario caso nao possuir texto de pesquisa', ()=>{
    let usuarios = usuarioMock;
    let searchText = '';
    let tipo = 'teste'
    let responsePipe = pipe.transform(usuarios, searchText, tipo);
    expect(responsePipe.length).toBe(usuarios.length);
  });

  it('transform retorna usuario caso nao possuir tipo de pesquisa', ()=>{
    let usuarios = usuarioMock;
    let searchText = 'andre';
    let tipo = ''
    let responsePipe = pipe.transform(usuarios, searchText, tipo);
    expect(responsePipe.length).toBe(usuarios.length);
  });

  it('transform retorna usuario encontrado', () =>{
    let usuarios = usuarioMock;
    let searchText = 'andre';
    let tipo = 'nome'
    let responsePipe = pipe.transform(usuarios, searchText, tipo);

    expect(responsePipe[0].nome).toBe(searchText);
  })
});
