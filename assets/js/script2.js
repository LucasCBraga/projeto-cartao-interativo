const titularCartao = document.getElementById("nome-cartao");
const numeroCartao = document.getElementById("numero-cartao");
const expiracao = Array.from(document.querySelectorAll(".expiracao"));
const cvc = document.getElementById("cvc");
const submit = document.getElementById("submit");
const nomeNoCartao = document.querySelector(".nome-cartao-display");
const numeroNoCartao = document.querySelector(".numero-cartao-display");
const expiracaoMes = document.querySelector(".expiracao-mes-display");
const expiracaoAno = document.querySelector(".expiracao-ano-display");
const cvcDisplay = document.querySelector(".cvc-cartao");
const thankYou = document.getElementById("thank-you-header");
const thankYouSection = document.getElementById("thank-you");
const continueBtn = document.getElementById("continue");
const form = document.getElementById("formulario");
const erroExpiracaoMsg = document.getElementById("expiry-error");

// Formulário //
function inputName() {
  nomeNoCartao.innerHTML = titularCartao.value;
  thankYou.innerHTML = `Obrigado ${titularCartao.value}`;
  if (nomeNoCartao.innerHTML == "") {
    nomeNoCartao.innerHTML = titularCartao.placeholder;
  }
}

function inputNumeroCartao() {
  let cartaoNumeroInput = numeroCartao.value;
  // Não permite que usuários escrevam caracteres inválidos //
  let formatacaoNumeroCartao = cartaoNumeroInput.replace(/[^\d]/g, "");
  formatacaoNumeroCartao = formatacaoNumeroCartao.substring(0, 16);
  // Divida o número do cartão em grupos de 4 //
  let secaoNumeroCartao = formatacaoNumeroCartao.match(/\d{1,4}/g);
  if (secaoNumeroCartao !== null) {
    formatacaoNumeroCartao = secaoNumeroCartao.join(" ");
  }
  // Se o formatacaoNumeorCartao for diferente do que é mostrado, altere o valor //
  if (cartaoNumeroInput !== formatacaoNumeroCartao) {
    numeroCartao.value = formatacaoNumeroCartao;
  }
  numeroNoCartao.innerHTML = numeroCartao.value;
  if (numeroCartao.value === "") {
    numeroNoCartao.innerHTML = numeroCartao.placeholder;
  }
}
function inputMes() {
  let formattedMM = expiracao[0].value;
  formattedMM = formattedMM.substring(0, 2);
  expiracao[0].value = formattedMM;
  if (expiracao[0].value === "") {
    expiracaoMes.innerHTML = "00";
  } else {
    expiracaoMes.innerHTML = expiracao[0].value;
  }
}
function inputAno() {
  let formattedYY = expiracao[1].value;
  formattedYY = formattedYY.substring(0, 4);
  expiracao[1].value = formattedYY;
  if (expiracao[1].value === "") {
    expiracaoAno.innerHTML = "0000";
  } else {
    expiracaoAno.innerHTML = expiracao[1].value;
  }
}
function inputCvc() {
  let formatacaoCvc = cvc.value;

  formatacaoCvc = formatacaoCvc.substring(0, 3);
  cvc.value = formatacaoCvc;
  if (cvc.value === "") {
    cvcDisplay.innerHTML = "000";
  } else {
    cvcDisplay.innerHTML = cvc.value;
  }
}

function totalValidade() {
  function validadeNome() {
    let cardholderExp = /^[A-Z a-z]+$/;
    let errorMsg = document.getElementById("errorMsg");
    if (titularCartao.value.match(cardholderExp)) {
      errorMsg.textContent = "Por favor, digite o nome do titular do cartão!";
    } else {
      errorMsg.innerHTML = "Por favor, digite o nome do titular do cartão!";
    }
  }
  function validadeCartao() {
    let erroNumeroCartao = document.getElementById("card-num-error");
    if (numeroCartao.value.length > 0 && numeroCartao.value.length < 16) {
      erroNumeroCartao.innerHTML = "Formato incorreto!";
    } else if (numeroCartao.value == "") {
      erroNumeroCartao.innerHTML = "Não pode ficar em branco!";
    } else {
      erroNumeroCartao.innerHTML = "";
    }
  }
  function validadeExpiracao() {
    let expMes = /^(0[0-9]|1[1-2]){2}$/;
    let expAno = /^[0-9][0-2]{4}$/;

    if (expiracao[0].value.match(expMes)) {
      erroExpiracaoMsg.innerHTML = "";
    } else if (
      expiracao[0].value.match(expMes) &&
      expiracao[1].value.match(expAno)
    ) {
      erroExpiracaoMsg.innerHTML = "";
    } else if (expiracao[0] == "") {
      erroExpiracaoMsg.innerHTML = "Não pode ficar em branco!";
    } else {
      erroExpiracaoMsg.innerHTML = "Formato incorreto!";
    }
  }
  function validadeCvc() {
    let erroCvcMsg = document.getElementById("error-cvc");
    let cvcExp = /^[0-9]{3}$/;
    if (cvc.value === "") {
      erroCvcMsg.innerHTML = "Não pode ficar em branco!";
    } else if (cvc.value.match(cvcExp)) {
      erroCvcMsg.innerHTML = "";
    } else {
      erroCvcMsg.innerHTML = "Formato incorreto!";
    }
  }

  validadeNome();
  validadeCartao();
  validadeExpiracao();
  validadeCvc();

  if (
    nomeNoCartao.innerHTML == titularCartao.placeholder ||
    numeroNoCartao.innerHTML == numeroCartao.placeholder ||
    expiracaoMes.innerHTML == "00" ||
    expiracaoAno.innerHTML == "0000" ||
    cvcDisplay.innerHTML == "000" ||
    (numeroCartao.value.length > 0 && numeroCartao.value.length < 16)
  ) {
    return false;
  } else {
    return true;
  }
}
// Botão de Envio //
submit.addEventListener("click", function () {
  totalValidade();
  if (totalValidade() == false) {
    event.preventDefault();
  } else {
    event.preventDefault();

    form.classList.add("hidden");
    thankYouSection.classList.remove("hidden");
  }
  // console.log(cardNumber.value.length > 0 && cardNumber.value.length < 16); //
});

// Continuação Botão //
continueBtn.addEventListener("click", function () {
  event.preventDefault();
  thankYouSection.classList.add("hidden");
  form.classList.remove("hidden");
  nomeNoCartao.innerHTML = titularCartao.placeholder;
  numeroNoCartao.innerHTML = numeroCartao.placeholder;
  expiracaoMes.innerHTML = "00";
  expiracaoAno.innerHTML = "0000";
  cvcDisplay.innerHTML = "000";
  titularCartao.value = "";
  numeroCartao.value = "";
  expiracao[0].value = "";
  expiracao[1].value = "";
  cvc.value = "";
  erroExpiracaoMsg.innerHTML = "";
});