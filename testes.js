<<<<<<< HEAD

function testar(nome, fn) {
  try {
    fn();
    console.log(`✅ ${nome}`);
  } catch (erro) {
    console.error(`❌ ${nome}`);
    console.error(erro.message);
  }
}


function validarCadastro(nome, endereco, categoria, contato) {
  return nome.trim() !== "" && endereco.trim() !== "" && categoria.trim() !== "" && contato.trim() !== "";
}

testar("Validação correta deve retornar true", () => {
  if (!validarCadastro("Loja", "Rua A", "Roupas", "11999999999")) {
    throw new Error("Cadastro válido deveria retornar true");
  }
});

testar("Nome vazio deve retornar false", () => {
  if (validarCadastro("", "Rua A", "Roupas", "11999999999")) {
    throw new Error("Nome vazio deveria retornar false");
  }
});

testar("Categoria vazia deve retornar false", () => {
  if (validarCadastro("Loja", "Rua A", "", "11999999999")) {
    throw new Error("Categoria vazia deveria retornar false");
  }
});


testar("Renderização de 2 produtos no DOM", () => {
  const listaMock = [
    { nome: "Produto 1", endereco: "Rua A", categoria: "Roupas", contato: "1199" },
    { nome: "Produto 2", endereco: "Rua B", categoria: "Eletrônicos", contato: "1188" }
  ];

  const div = document.createElement("div");
  div.id = "lista-produtos";
  document.body.appendChild(div);

  exibirProdutos(listaMock);

  const cards = document.querySelectorAll(".card-produto");
  if (cards.length !== 2) throw new Error("Devia renderizar 2 cards");

  div.remove();
});

testar("Abrir modal deve adicionar classe show", () => {
  const modal = document.createElement("div");
  modal.id = "modalCadastro";
  document.body.appendChild(modal);

  window.abrirCadastro();
  if (!modal.classList.contains("show")) throw new Error("Modal deveria ter classe 'show'");
  modal.remove();
});

testar("Fechar modal deve remover classe show", () => {
  const modal = document.createElement("div");
  modal.id = "modalCadastro";
  modal.classList.add("show");
  document.body.appendChild(modal);

  window.fecharCadastro();
  if (modal.classList.contains("show")) throw new Error("Modal não deveria ter classe 'show'");
  modal.remove();
});


testar("Máscara de CNPJ formata corretamente", () => {
  const input = document.createElement("input");
  input.id = "CNPJ";
  document.body.appendChild(input);

  const evento = new Event("input");
  input.value = "12345678000199";
  input.dispatchEvent(evento);

  if (!input.value.includes("/") || !input.value.includes("-")) {
    throw new Error("CNPJ não foi formatado corretamente");
  }

  input.remove();
});


testar("Busca retorna produtos filtrados corretamente", async () => {
  const dados = [
    { nome: "Camisa", endereco: "Rua 1", categoria: "Roupas" },
    { nome: "Celular", endereco: "Rua 2", categoria: "Eletrônicos" }
  ];
  const termo = "celular";

  const filtrados = dados.filter(p =>
    p.nome.toLowerCase().includes(termo) ||
    p.endereco.toLowerCase().includes(termo) ||
    p.categoria.toLowerCase().includes(termo)
  );

  if (filtrados.length !== 1 || filtrados[0].nome !== "Celular") {
    throw new Error("Busca não retornou o item correto");
  }
});


testar("Clique cria span ripple dentro do botão", () => {
  const btn = document.createElement("button");
  btn.textContent = "Clique";
  document.body.appendChild(btn);

  btn.addEventListener("click", (e) => {
    const ripple = document.createElement("span");
    ripple.className = "ripple";
    btn.appendChild(ripple);
  });

  btn.click();

  const rippleElement = btn.querySelector(".ripple");
  if (!rippleElement) throw new Error("Ripple não foi criado");

  btn.remove();
});

=======
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
>>>>>>> 98e708eea15ccb18a672ce466507d440a113a065
