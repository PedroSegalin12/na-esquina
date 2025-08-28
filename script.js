import { createClient } from 'https://esm.sh/@supabase/supabase-js'

const SUPABASE_URL = "https://hbyvmtjwrxvbzioinizj.supabase.co"
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhieXZtdGp3cnh2Ynppb2luaXpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYzMzk2ODgsImV4cCI6MjA3MTkxNTY4OH0.UtsSRuS2vEP7usFnUhkiLsCAjVdieUc-hdY4ywZdWsE" // sua anon key aqui
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)


const listaLojas = document.getElementById("lista-lojas");
const searchInput = document.getElementById("search");

import { supabase } from './script.js'

async function cadastrarUsuario(nome, email, senha) {
  const { data, error } = await supabase
    .from('cadastro_de_usuario')
    .insert([{ nome, email, senha }])

  if (error) {
    console.error("Erro no cadastro:", error)
    alert("Erro ao cadastrar!")
  } else {
    alert("Cadastro realizado com sucesso!")
    window.location.href = "login.html" // redireciona para login
  }
}

// Exemplo: pegando os valores do formulário
document.getElementById("formCadastro").addEventListener("submit", (e) => {
  e.preventDefault()
  const nome = document.getElementById("nome").value
  const email = document.getElementById("email").value
  const senha = document.getElementById("senha").value
  cadastrarUsuario(nome, email, senha)
})


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
