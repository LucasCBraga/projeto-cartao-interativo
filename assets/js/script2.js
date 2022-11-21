const titularCartao = document.getElementById("nome-cartao");
const numeroCartao = document.getElementById("numero-cartao");
const expiracao = Array.from(document.querySelectorAll(".expiracao"));
const cvc = document.getElementById("cvc");
const submit = document.getElementById("submit");
const nomeNoCartao = document.querySelector(".nome-cartao-display");
const numeroNoCartao = document.querySelector(".numero-cartao-display");
// parei aqui //
const expMM = document.querySelector(".expiracao-mes-display");
const expYY = document.querySelector(".expiracao-ano-display");
const cvcDisplay = document.querySelector(".cvc-cartao");
const thankYou = document.getElementById("thank-you-header");
const thankYouSection = document.getElementById("thank-you");
const continueBtn = document.getElementById("continue");
const form = document.getElementById("formulario");
const expiryErrorMsg = document.getElementById("expiry-error");

function inputName() {
    nomeNoCartao.innerHTML = titularCartao.value;
  thankYou.innerHTML = `Thank You ${titularCartao.value}`;
  if (nomeNoCartao.innerHTML == "") {
    nomeNoCartao.innerHTML = titularCartao.placeholder;
  }
}

function inputCardNum() {
  let cardNumberInput = numeroCartao.value;
  // Do not allow users to write invalid characters
  let formattedCardNumber = cardNumberInput.replace(/[^\d]/g, "");
  formattedCardNumber = formattedCardNumber.substring(0, 16);
  // Split the card number is groups of 4
  let cardNumberSections = formattedCardNumber.match(/\d{1,4}/g);
  if (cardNumberSections !== null) {
    formattedCardNumber = cardNumberSections.join(" ");
  }
  // If the formmattedCardNumber is different to what is shown, change the value
  if (cardNumberInput !== formattedCardNumber) {
    numeroCartao.value = formattedCardNumber;
  }
  numeroNoCartao.innerHTML = numeroCartao.value;
  if (numeroCartao.value === "") {
    numeroNoCartao.innerHTML = numeroCartao.placeholder;
  }
}
function inputMM() {
  let formattedMM = expiracao[0].value;
  formattedMM = formattedMM.substring(0, 2);
  expiracao[0].value = formattedMM;
  if (expiracao[0].value === "") {
    expMM.innerHTML = "00";
  } else {
    expMM.innerHTML = expiracao[0].value;
  }
}
function inputYY() {
  let formattedYY = expiracao[1].value;
  formattedYY = formattedYY.substring(0, 4);
  expiracao[1].value = formattedYY;
  if (expiracao[1].value === "") {
    expYY.innerHTML = "0000";
  } else {
    expYY.innerHTML = expiracao[1].value;
  }
}
function inputCvc() {
  let formattedCvc = cvc.value;

  formattedCvc = formattedCvc.substring(0, 3);
  cvc.value = formattedCvc;
  if (cvc.value === "") {
    cvcDisplay.innerHTML = "000";
  } else {
    cvcDisplay.innerHTML = cvc.value;
  }
}

function massValidate() {
  function validateName() {
    let cardholderExp = /^[A-Z a-z]+$/;
    let errorMsg = document.getElementById("errorMsg");
    if (titularCartao.value.match(cardholderExp)) {
      errorMsg.textContent = "";
    } else {
      errorMsg.innerHTML = "Please enter cardholder name!";
    }
  }
  function validateCard() {
    let cardNumError = document.getElementById("card-num-error");
    if (numeroCartao.value.length > 0 && numeroCartao.value.length < 16) {
      cardNumError.innerHTML = "Wrong format!";
    } else if (numeroCartao.value == "") {
      cardNumError.innerHTML = "Can't be blank!";
    } else {
      cardNumError.innerHTML = "";
    }
  }
  function validateExpiry() {
    let expMonth = /^(0[0-9]|1[1-2]){2}$/;
    let expYear = /^[0-9][0-2]{4}$/;

    if (expiracao[0].value.match(expMonth)) {
      expiryErrorMsg.innerHTML = "";
    } else if (
        expiracao[0].value.match(expMonth) &&
        expiracao[1].value.match(expYear)
    ) {
      expiryErrorMsg.innerHTML = "";
    } else if (expiracao[0] == "") {
      expiryErrorMsg.innerHTML = "Can't be blank!";
    } else {
      expiryErrorMsg.innerHTML = "Wrong format!";
    }
  }
  function validateCvc() {
    let cvcErrorMsg = document.getElementById("error-cvc");
    let cvcExp = /^[0-9]{3}$/;
    if (cvc.value === "") {
      cvcErrorMsg.innerHTML = "Can't be blank";
    } else if (cvc.value.match(cvcExp)) {
      cvcErrorMsg.innerHTML = "";
    } else {
      cvcErrorMsg.innerHTML = "Wrong format!";
    }
  }
  validateCard();
  validateName();
  validateExpiry();
  validateCvc();
  if (
    nomeNoCartao.innerHTML == titularCartao.placeholder ||
    numeroNoCartao.innerHTML == numeroCartao.placeholder ||
    expMM.innerHTML == "00" ||
    expYY.innerHTML == "0000" ||
    cvcDisplay.innerHTML == "000" ||
    (numeroCartao.value.length > 0 && numeroCartao.value.length < 16)
  ) {
    return false;
  } else {
    return true;
  }
}
// Submit Button

submit.addEventListener("click", function () {
  massValidate();
  if (massValidate() == false) {
    event.preventDefault();
  } else {
    event.preventDefault();

    form.classList.add("hidden");
    thankYouSection.classList.remove("hidden");
  }
  //   console.log(cardNumber.value.length > 0 && cardNumber.value.length < 16);
});

// Continue Button

continueBtn.addEventListener("click", function () {
  event.preventDefault();
  thankYouSection.classList.add("hidden");
  form.classList.remove("hidden");
  nomeNoCartao.innerHTML = titularCartao.placeholder;
  numeroNoCartao.innerHTML = numeroCartao.placeholder;
  expMM.innerHTML = "00";
  expYY.innerHTML = "0000";
  cvcDisplay.innerHTML = "000";
  titularCartao.value = "";
  numeroCartao.value = "";
  expiracao[0].value = "";
  expiracao[1].value = "";
  cvc.value = "";
  expiryErrorMsg.innerHTML = "";
});