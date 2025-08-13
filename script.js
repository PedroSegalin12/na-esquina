import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://gvkanntuocgmdcuyhwkp.supabase.co';
const supabaseKey = 'sua-chave-aqui';
const supabase = createClient(supabaseUrl, supabaseKey);

const listaLojas = document.getElementById("lista-lojas");
const searchInput = document.getElementById("search");

async function carregarLojas() {
  const { data, error } = await supabase.from("lojas").select("*");
  if (error) {
    console.error("Erro ao buscar lojas:", error.message);
    return;
  }
  exibirLojas(data);
}

function exibirLojas(lista) {
  listaLojas.innerHTML = "";
  lista.forEach(prod => {
    const card = `<div class="card-lojas">
      <h3>${prod.nome}</h3>
      <p><strong>Endereço:</strong> ${prod.endereco}</p>
      <p><strong>Categoria:</strong> ${prod.categoria}</p>
      <p><strong>Contato:</strong> ${prod.contato}</p>
    </div>`;
    listaLojas.innerHTML += card;
  });
}

async function filtrarCategoria(categoria) {
  const { data, error } = await supabase
    .from("lojas")
    .select("*")
    .eq("categoria", categoria);

  if (error) {
    console.error("Erro ao filtrar:", error.message);
    return;
  }
  exibirLojas(data);
}

searchInput.addEventListener("input", async () => {
  const termo = searchInput.value.toLowerCase();
  const { data, error } = await supabase.from("lojas").select("*");
  if (error) return;

  const filtrados = data.filter(p =>
    p.nome.toLowerCase().includes(termo) ||
    p.endereco.toLowerCase().includes(termo) ||
    p.categoria.toLowerCase().includes(termo)
  );
  exibirLojas(filtrados);
});

function abrirCadastro() {
  document.getElementById('modalCadastro').style.display = 'flex';
}

function fecharCadastro() {
  document.getElementById('modalCadastro').style.display = 'none';
}

async function enviarCadastro() {
  const nome = document.getElementById('nomeLoja').value.trim();
  const contato = document.getElementById('contatoLoja').value.trim();
  const endereco = document.getElementById('enderecoLoja').value.trim();
  const categoria = document.getElementById('categoriaLoja').value;

  if (!nome || !contato || !endereco || !categoria) {
    alert('Preencha todos os campos!');
    return;
  }

  const { error } = await supabase.from("lojas").insert([
    { nome, contato, endereco, categoria }
  ]);

  if (error) {
    alert("Erro ao cadastrar loja: " + error.message);
    console.error(error);
  } else {
    alert("Loja cadastrada com sucesso!");
    fecharCadastro();
    carregarLojas();
  }
}

document.getElementById('contatoLoja').addEventListener('input', function (e) {
  let valor = e.target.value.replace(/\D/g, '');
  if (valor.length > 11) valor = valor.slice(0, 11);
  let formatado = valor;
  if (valor.length > 0) formatado = '(' + valor.substring(0, 2);
  if (valor.length >= 3) formatado += ') ' + valor.substring(2, 7);
  if (valor.length >= 8) formatado += '-' + valor.substring(7, 11);
  e.target.value = formatado;
});

window.abrirCadastro = abrirCadastro;
window.fecharCadastro = fecharCadastro;
window.enviarCadastro = enviarCadastro;
window.filtrarCategoria = filtrarCategoria;

carregarLojas();
