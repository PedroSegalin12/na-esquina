import { loginLoja } from '../src/login';
import { enviarCadastro } from '../src/lojas';


const mockSupabase = {
  from: jest.fn(() => ({
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    single: jest.fn(() => Promise.resolve({ data: { cnpj: '123' }, error: null })),
    insert: jest.fn(() => Promise.resolve({ error: null })),
  })),
};

describe('Testes SIMPLES', () => {
  beforeEach(() => {

    document.body.innerHTML = `
      <input id="cnpj" />
      <input id="senha" />
      <input id="nomeLoja" />
      <input id="enderecoLoja" />
      <select id="categoriaLoja"><option value="Alimentos" selected>Alimentos</option></select>
      <input id="contatoLoja" />
    `;


    global.alert = jest.fn();
    global.localStorage.setItem = jest.fn();
    global.location = { href: '' };
  });

  it('loginLoja - sucesso mínimo', async () => {
    document.getElementById('cnpj').value = '123';
    document.getElementById('senha').value = 'senha123';

    await loginLoja(mockSupabase);

    expect(alert).toHaveBeenCalledWith('Login realizado com sucesso!');
  });

  it('enviarCadastro - sucesso mínimo', async () => {
    document.getElementById('nomeLoja').value = 'Loja Teste';
    document.getElementById('enderecoLoja').value = 'Rua X';
    document.getElementById('categoriaLoja').value = 'Alimentos';
    document.getElementById('contatoLoja').value = '(12) 34567-8901';

    await enviarCadastro(mockSupabase);

    expect(alert).toHaveBeenCalledWith('Loja cadastrada com sucesso!');
  });

  it('Componente - renderização mínima', () => {
    document.body.innerHTML = `
      <form>
        <input id="cnpj" />
        <input id="senha" />
      </form>
    `;

    expect(document.getElementById('cnpj')).not.toBeNull();
    expect(document.getElementById('senha')).not.toBeNull();
  });
});
