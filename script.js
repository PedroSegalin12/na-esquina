const produtos = [
  {
    nome: "Camisa Polo",
    categoria: "Roupas",
    preco: "R$ 100,00",    loja: "Visual",
    endereco: "Rua Afonso Pena, 123",
  },
    {
    nome: "Calção preto",
    categoria: "Roupas",
    preco: "R$ 79,99",
    loja: "Lojas Magrão",
    endereco: "Rua Oiapoque, 147",
  },
    {
    nome: "Camisa branca básica",
    categoria: "Roupas",
    preco: "R$ 10,00",
    loja: "Luca 10",
    endereco: "Rua Bandeirante, 323",
  },
      {
    nome: "Tênis nike SB",
    categoria: "Roupas",
    preco: "R$ 299,90",
    loja: "Pitol",
    endereco: "Rua Travessa guarani, 723",
  },
  {
    nome: "Chuveiro Elétrico",
    categoria: "Construção",
    preco: "R$ 149,99",
    loja: "Gerbran",
    endereco: "Av. Central, 456",
  },
    {
    nome: "Manômetro",
    categoria: "Construção",
    preco: "R$ 49,90",
    loja: "Sabedott",
    endereco: "Travessa Mundo, 956",
  },
    {
    nome: "Luminária",
    categoria: "Construção",
    preco: "R$ 99,90",
    loja: "Zanardi",
    endereco: "Rua 7 de setembro, 496",
  },
      {
    nome: "Maçaneta de porta",
    categoria: "Construção",
    preco: "R$ 49,90",
    loja: "Stalar",
    endereco: "Rua Agostini, 776",
  },
  {
    nome: "IPHONE 15 pro MAX",
    categoria: "Eletrônicos",
    preco: "R$ 14000,00",
    loja: "Leo Celulares",
    endereco: "Rya do calçadão, 789",
  },
    {
    nome: "Fone Bluetooth",
    categoria: "Eletrônicos",
    preco: "R$ 149,90",
    loja: "smo celulares",
    endereco: "Rua Ernesto Zanquin, 666",
  },
      {
    nome: "Capinha Samsung AS23",
    categoria: "Eletrônicos",
    preco: "R$ 49,90",
    loja: "smo Celulares",
    endereco: "Av. Salgado Filho, 996",
  },
    {
    nome: "Carregador tipo C",
    categoria: "Eletrônicos",
    preco: "R$ 100,00",
    loja: "Bernatcell assistência",
    endereco: "Rua Barão do Rio Branco, 159",
  },
{
  nome: "Preço do Litro de Gasolina",
  categoria: "Posto de Gasolina",
  preco: "R$ 5,99 p/L",
  loja: "Volta Grande",
  endereco: "Willy Barth, 778"
},
{
  nome: "Preço do Litro de Gasolina",
  categoria: "Posto de Gasolina",
  preco: "R$ 5,87 p/L",
  loja: "Max",
  endereco: "Rua das Palmeiras, 321"
},
{
  nome: "Preço do Litro de Gasolina",
  categoria: "Posto de Gasolina",
  preco: "R$ 6,05 p/L",
  loja: "Garoto",
  endereco: "Avenida Brasil, 987"
},
{
  nome: "Preço do Litro de Gasolina",
  categoria: "Posto de Gasolina",
  preco: "R$ 5,93 p/L",
  loja: "Santo Anjo",
  endereco: "Rua Santa Luzia, 456"
},
{
  nome: "Aspirina",
  categoria: "Farmácia",
  preco: "R$ 5,93",
  loja: "São Miguel",
  endereco: "Rua das Flores, 111"
},
{
  nome: "Paracetamol",
  categoria: "Farmácia",
  preco: "R$ 3,50",
  loja: "Farmácia Agostini",
  endereco: "Avenida das Palmeiras, 222"
},
{
  nome: "Dipirona Gotas",
  categoria: "Farmácia",
  preco: "R$ 6,20",
  loja: "Farmácia São Bento",
  endereco: "Rua do Progresso, 333"
},
{
  nome: "Desodorante Rexona",
  categoria: "Farmácia",
  preco: "R$ 9,80",
  loja: "Farmácia São João",
  endereco: "Travessa Central, 444"
},
{
  nome: "Caderno 96 folhas",
  categoria: "Papelaria",
  preco: "R$ 14,90",
  loja: "R2",
  endereco: "Rua dos Estudantes, 101"
},
{
  nome: "Caneta Azul",
  categoria: "Papelaria",
  preco: "R$ 1,50",
  loja: "Arco-Íris",
  endereco: "Avenida das Letras, 202"
},
{
  nome: "Bobbie's Goods",
  categoria: "Papelaria",
  preco: "R$ 14,90",
  loja: "Marcar",
  endereco: "Travessa Criativa, 303"
},
{
  nome: "Agenda ",
  categoria: "Papelaria",
  preco: "R$ 19,99",
  loja: "Agostini",
  endereco: "Praça Central, 404"
}
];

const listaProdutos = document.getElementById("lista-produtos");
const searchInput = document.getElementById("search");

function exibirProdutos(lista) {
  listaProdutos.innerHTML = "";
  lista.forEach(prod => {
    const card = `<div class="card-produto">
      <img src="${prod.imagem}" alt="${prod.nome}">
      <h3>${prod.nome}</h3>
      <p><strong>Preço:</strong> ${prod.preco}</p>
      <p><strong>Loja:</strong> ${prod.loja}</p>
      <p><strong>Endereço:</strong> ${prod.endereco}</p>
    </div>`;
    listaProdutos.innerHTML += card;
  });
}

function filtrarCategoria(categoria) {
  const filtrados = produtos.filter(p => p.categoria === categoria);
  exibirProdutos(filtrados);
}

searchInput.addEventListener("input", () => {
  const termo = searchInput.value.toLowerCase();
  const filtrados = produtos.filter(p =>
    p.nome.toLowerCase().includes(termo) ||
    p.loja.toLowerCase().includes(termo)
  );
  exibirProdutos(filtrados);
});

function abrirCadastro() {
  document.getElementById('modalCadastro').style.display = 'flex';
}

function fecharCadastro() {
  document.getElementById('modalCadastro').style.display = 'none';
}

function enviarCadastro() {
  const nome = document.getElementById('nomeLoja').value;
  const endereco = document.getElementById('enderecoLoja').value;
  const categoria = document.getElementById('categoriaLoja').value;
  if (nome && endereco && categoria) {
    alert("Loja cadastrada com sucesso!\nNome: " + nome + "\nEndereço: " + endereco + "\nCategoria: " + categoria);
    fecharCadastro();
  } else {
    alert("Por favor, preencha todos os campos.");
  }
}

exibirProdutos(produtos);

//testes unitariso abaixo
function rodarTestes() {
  const output = [];
  const print = (msg, ok = true) => {
    console.log(`${ok ? '✅' : '❌'} ${msg}`);
    output.push(`${ok ? '✅' : '❌'} ${msg}`);
  };

  try {
    const produtosTeste = [{
      nome: "Produto Teste",
      categoria: "Roupas",
      preco: "R$ 99,00",
      loja: "Loja X",
      endereco: "Rua Teste",
      imagem: "https://via.placeholder.com/250"
    }];

    exibirProdutos(produtosTeste);
    const cards = document.querySelectorAll('.card-produto');
    if (cards.length === 1 && cards[0].textContent.includes("Produto Teste")) {
      print("exibirProdutos() funciona corretamente");
    } else {
      print("exibirProdutos() falhou ao exibir produto", false);
    }

    filtrarCategoria("Roupas");
    const filtrados = document.querySelectorAll('.card-produto');
    if (filtrados.length >= 1 && filtrados[0].textContent.includes("Camisa Polo")) {
      print("filtrarCategoria() funciona corretamente");
    } else {
      print("filtrarCategoria() não retornou produto esperado", false);
    }

    abrirCadastro();
    const modal = document.getElementById('modalCadastro');
    if (modal && modal.style.display === 'flex') {
      print("abrirCadastro() exibe o modal corretamente");
    } else {
      print("abrirCadastro() não exibiu o modal", false);
    }

    searchInput.value = "fone";
    searchInput.dispatchEvent(new Event("input"));
    const resultadosBusca = document.querySelectorAll('.card-produto');
    const encontrou = Array.from(resultadosBusca).some(c => c.textContent.toLowerCase().includes("fone"));
    if (encontrou) {
      print("Busca por nome funciona corretamente");
    } else {
      print("Busca por nome falhou", false);
    }

  } catch (err) {
    print("Erro ao executar testes: " + err.message, false);
  }

  return output;
}

//teste componentes abaixo
function testarComponenteProduto() {
  const mock = [{
    nome: "Tênis Esportivo",
    categoria: "Roupas",
    preco: "R$ 199,90",
    loja: "Esporte Forte",
    endereco: "Av. Atlética, 100",
    imagem: "https://via.placeholder.com/250"
  }];
  
  exibirProdutos(mock);
  const card = document.querySelector(".card-produto");

  const passou = (
    card &&
    card.querySelector("h3").textContent === "Tênis Esportivo" &&
    card.querySelector("p").textContent.includes("R$ 199,90")
  );

  console.log(passou ? "✅ Componente card-produto renderizado corretamente" : "❌ Componente card-produto falhou");
}

function testarComponenteModalCadastro() {
  abrirCadastro();
  const modal = document.getElementById("modalCadastro");
  const visivel = modal && modal.style.display === "flex";

  fecharCadastro();
  const invisivel = modal && modal.style.display === "none";

  console.log(visivel ? "✅ Modal foi exibido corretamente" : "❌ Modal não abriu");
  console.log(invisivel ? "✅ Modal foi fechado corretamente" : "❌ Modal não fechou");
}

function testarFormularioCadastro() {
  abrirCadastro();
  document.getElementById("nomeLoja").value = "Nova Loja";
  document.getElementById("enderecoLoja").value = "Rua Nova";
  document.getElementById("categoriaLoja").value = "Roupas";

  const alertOriginal = window.alert;
  let alertMsg = "";
  window.alert = (msg) => { alertMsg = msg; };

  enviarCadastro();
  window.alert = alertOriginal;

  const passou = alertMsg.includes("Loja cadastrada com sucesso");
  console.log(passou ? "✅ Formulário de cadastro funcionou" : "❌ Problema no envio do formulário");
}

function rodarTestesComponentes() {
  testarComponenteProduto();
  testarComponenteModalCadastro();
  testarFormularioCadastro();
}
