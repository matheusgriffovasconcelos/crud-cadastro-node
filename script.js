(function() {
  'use strict'

  var forms = document.querySelectorAll('.needs-validation')

  Array.prototype.slice.call(forms)
    .forEach(function(form) {
      form.addEventListener('submit', function(event) {
        if (!form.checkValidity()) {
          form.classList.add('was-validated')
        } else {
          inserir()
          form.classList.remove('was-validated')
          form.reset()
        }
        event.preventDefault()
        event.stopPropagation()
      }, false)
    })
})()


function getLocalStorage() {
  return JSON.parse(localStorage.getItem('bd_celulares')) ?? [];
}

function setLocalStorage(bd_celulares) {
  localStorage.setItem('bd_celulares', JSON.stringify(bd_celulares));
}

function limparTabela() {
  var elemento = document.querySelector("#tabela>tbody");
  while (elemento.firstChild) {
    elemento.removeChild(elemento.firstChild);
  }
}

function atualizarTabela() { // Adaptação da função atualizarTabela (5 pontos)
  limparTabela();

  const bd_celulares = getLocalStorage();
  let index = 0;
  for (celular of bd_celulares) {
    const novaLinha = document.createElement('tr');
    novaLinha.innerHTML = `
        <th scope="row">${index}</th>
        <td>${celular.marca}</td>
        <td>${celular.modelo}</td>
        <td>${celular.cor}</td>
        <td>${celular.armazenamento}</td>
        <td>${celular.memoria}</td>
        <td>${celular.imei}</td>
        <td>
            <button type="button" class="btn btn-danger btn-sm" id="${index}" onclick="excluir(${index})">Excluir</button>
        </td>
    `
    document.querySelector('#tabela>tbody').appendChild(novaLinha)
    index++;
  }
}

function inserir() { // Adaptação da função inserir (10 pontos)
  const celular = {
    marca: document.getElementById('marca').value,
    modelo: document.getElementById('modelo').value,
    armazenamento: document.getElementById('armazenamento').value,
    memoria: document.getElementById('memoria').value,
    cor: document.getElementById('cor').value,
    imei: document.getElementById('imei').value
  }
  const bd_celulares = getLocalStorage();
  bd_celulares.push(celular);
  setLocalStorage(bd_celulares);
  atualizarTabela();
  mostrarMensagem();

}

function mostrarMensagem(tipo) { // Função para mostrar mensagem após inserir um celular com sucesso.


  const mensagem = document.createElement('div');
  if (tipo != 'excluir') {
    mensagem.innerHTML = `
      <div class="alert alert-success alert-dismissible js-alert fade show my-2">
            <b>Celular cadastrado com sucesso!!</b>
            <buttom class="btn-close" data-bs-dismiss="alert"></buttom>
      </div>
    `
  } else {
    mensagem.innerHTML = `
      <div class="alert alert-danger alert-dismissible js-alert fade show my-2">
            <b>Celular excluído com sucesso!!</b>
            <buttom class="btn-close" data-bs-dismiss="alert"></buttom>
      </div>
    `
  }
  document.querySelector('#mensagem').appendChild(mensagem);

  // Temporizador para fechar alert automaticamente após 3s.  
  if (document.querySelector('.js-alert')) {
    document.querySelectorAll('.js-alert').forEach(function($el) {
      setTimeout(() => {
        $el.classList.remove('show');
        document.getElementById('mensagem').innerHTML = '';
      }, 3000);
    });
  }
}

function excluir(index) { // Adaptação da função excluir (5 pontos)
  const bd_celulares = getLocalStorage();
  bd_celulares.splice(index, 1);
  setLocalStorage(bd_celulares);
  atualizarTabela();
  mostrarMensagem('excluir');
}

function validarImei() { // Adaptação da função validar (10 pontos)
  const bd_celulares = getLocalStorage();
  for (celular of bd_celulares) {
    if (imei.value == celular.imei) {
      imei.setCustomValidity("Este número de IMEI já existe!");
      feedbackIMEI.innerText = "Este número de IMEI já existe!";
      return false;
    } else {
      imei.setCustomValidity("");
      feedbackIMEI.innerText = "Informe o IMEI corretamente.";
    }
  }
  return true;
}

function validarModelo() { // Função para validação do NOME do modelo de celular quando a marca for da "Apple"!
  if (marca.value == 'Apple' && (!modelo.value.toLowerCase().includes('iphone'))) {
    modelo.setCustomValidity("Para marca Apple, o nome do modelo deve conter o prefixo 'iPhone'!");
    feedbackModelo.innerText = "Para marca Apple, o nome do modelo deve conter o prefixo 'iPhone'!";
    return false;
  } else {
    modelo.setCustomValidity("");
    feedbackModelo.innerText = "Informe o Modelo corretamente.";
  }
  return true;
}


atualizarTabela();
// Seleção dos elementos e adição do listener para validação customizada (5 pontos)
const imei = document.getElementById("imei");
const feedbackIMEI = document.getElementById("feedbackIMEI");
imei.addEventListener('input', validarImei);


// Listener para validação do Modelo do celular.
const modelo = document.getElementById("modelo");
const marca = document.getElementById("marca");
const feedbackModelo = document.getElementById("feedbackModelo");
modelo.addEventListener('input', validarModelo);
marca.addEventListener('input', validarModelo);