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
        formatoNumeroCartao = sessaoNumeroCartao.join("");
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