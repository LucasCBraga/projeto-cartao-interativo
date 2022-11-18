const nomeCartao = document.getElementById("nome-cartao");
const numeroCartao = document.getElementById("numero-cartao");
const expiracao = Array.from(document.querySelectorAll(".expiracao"));
const cvc = document.getElementById("cvc");
const submit = document.getElementById("submit");
const numeroNoCartao = document.querySelector("numero-cartao-display");
const nomeNoCartao = document.querySelector(".nome-cartao-display");
const expericaoMes = document.querySelector(".expiracao-mes-display");
const expericaoAno = document.querySelector(".expiracao-ano-display");
const cvcDisplay = document.querySelector(".cvc-cartao");
const thankYouSection = document.getElementById("thank-you");
const thankYou = document.getElementById("thank-you-header");
const continueBtn = document.getElementById("continue");
const formulario = document.getElementById("formulario");
const expiryErrorMsg = document.getElementById("expiry-error");

function inputName() {
  nomeNoCartao.innerHTML = nomeCartao.value;
  thankYou.innerHTML = `Thank You ${nomeCartao.value}`;
  if (nomeNoCartao.innerHTML == "") {
    nomeNoCartao.innerHTML = nomeCartao.placeholder;
  }
}

function inputCardNum() {
  let inputNumeroCartao = numeroCartao.value;
  //Não permitir que os usuários escrevam caracteres inválidos//
  let formatoNumeroCartao = inputNumeroCartao.replace(/[^\d]/g, "");
  formatoNumeroCartao = formatoNumeroCartao.substring(0, 16);
  //Divida o número do cartão em grupos de 4//
  let sessaoNumeroCartao = formatoNumeroCartao.match(/\d{1,4}/g);
  if (sessaoNumeroCartao !== null) {
    formatoNumeroCartao = sessaoNumeroCartao.join(" ");
  }
  //Se o número do cartão formatado for diferente do que é mostrado, altere o valor//
  if (inputNumeroCartao !== formatoNumeroCartao) {
    numeroCartao.value = formatoNumeroCartao;
  }
  numeroNoCartao.innerHTML = numeroCartao.value;
  if (numeroCartao.value === "") {
    numeroNoCartao.innerHTML = numeroCartao.placeholder;
  }
}

function inputMM() {
  let formatoMM = expiracao[0].value;
  formatoMM = formatoMM.substring(0, 2);
  expiracao[0].value = formatoMM;
  if (expiracao[0].value === "") {
    expericaoMes.innerHTML = "00";
  } else {
    expericaoMes.innerHTML = expiracao[0].value;
  }
}

function inputYY() {
  let formatoYY = expiracao[1].value;
  formatoYY = formatoYY.substring(0, 4);
  expiracao[1].value = formatoYY;
  if (expiracao[1].value === "") {
    expericaoAno.innerHTML = "0000";
  } else {
    expericaoAno.innerHTML = expiracao[1].value;
  }
}

function inputCvc() {
  let formatoCvc = cvc.value;
  formatoCvc = formatoCvc.substring(0, 3);
  cvc.value = formatoCvc;
  if (cvc.value === "") {
    cvcDisplay.innerHTML = "000";
  } else {
    cvcDisplay.innerHTML = cvc.value;
  }
}

function massValidade() {
  function validadeNome() {
    let nomecartaoExp = /^[A-Z a-z]+ $/;
    let errorMsg = document.getElementById("errorMsg");
    if (nomeCartao.value.match(nomecartaoExp)) {
      errorMsg.textContent = "";
    } else {
      errorMsg.innerHTML = "Por favor insira o nome no cartão!";
    }
  }

  function validadeCartao() {
    let cartaoNumErro = document.getElementById("card-num-error");
    if (numeroCartao.value.length > 0 && numeroCartao.value.length < 16) {
      cartaoNumErro.innerHTML = "Formato Errado";
    } else if (numeroCartao.value == "") {
      cartaoNumErro.innerHTML = "Nao pode ser em branco!";
    } else {
      cartaoNumErro.innerHTML = "";
    }
  }

  function validadeExpiracao() {
    let expericaoMes = /^(0[0-9]|1[1-2]){2}$/;
    let expericaoAno = /^[0-9][0-2]{4}$/;

    if (expiracao[0].value.match(expericaoMes)) {
      expiryErrorMsg.innerHTML = "";
    } else if (
      expiracao[0].value.match(expericaoMes) &&
      expiracao[1].value.match(expericaoAno)
    ) {
      expiryErrorMsg.innerHTML = "";
    } else if (expiracao[0] == "") {
      expiryErrorMsg.innerHTML = "Nao pode ser em branco!";
    } else {
      expiryErrorMsg.innerHTML = "Formato Errado!";
    }
  }


function validadeCvc() {
  let cvcErrorMsg = document.getElementById("error-cvc");
  let cvcExp = /^[0-9]{3}$/;
  if (cvc.value === "") {
    cvcErrorMsg.innerHTML = "Nao pode ser em branco";
  } else if (cvc.value.match(cvcExp)) {
    cvcErrorMsg.innerHTML = "";
  } else {
    cvcErrorMsg.innerHTML = "Formato Errado!";
  }
}

validadeCartao();
validadeNome();
validadeExpiracao();
validadeCvc();

if (
  nomeNoCartao.innerHTML == nomeCartao.placeholder ||
  numeroNoCartao.innerHTML == numeroCartao.placeholder ||
  expericaoMes.innerHTML == "000" ||
  expericaoAno.innerHTML == "000" ||
  cvcDisplay.innerHTML === "000" ||
  (numeroCartao.value.length > 0 && numeroCartao.value.length < 16)
) {
  return false;
} else {
  return true;
}
}

//Botão de envio//
submit.addEventListener("click", function () {
  massValidade();
  if (massValidade() == false) {
    Event.preventDefault();
  } else {
    Event.preventDefault();

    form.classList.add("hidden");
    thankYouSection.classList.remove("hidden");
  }
});

// Botao Continuar //
continueBtn.addEventListener("click", function () {
  Event.preventDefault();
  thankYouSection.classList.add("hidden");
  form.classList.remove("hidden");
  nomeNoCartao.innerHTML = nomeCartao.placeholder;
  numeroNoCartao.innerHTML = numeroCartao.placeholder;
  expericaoMes.innerHTML = "00";
  expericaoAno.innerHTML = "0000";
  cvcDisplay.innerHTML = "000";
  nomeCartao.value = "";
  numeroCartao.value = "";
  expiracao[0].value = "";
  expiracao[1].value = "";
  cvc.value = "";
  expiryErrorMsg.innerHTML = "";
});