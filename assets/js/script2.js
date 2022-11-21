const cardholder = document.getElementById("nome-cartao");
const numeroCartao = document.getElementById("numero-cartao");
const expiry = Array.from(document.querySelectorAll(".expiracao"));
const cvc = document.getElementById("cvc");
const submit = document.getElementById("submit");
const nameOnCard = document.querySelector(".nome-cartao-display");
const numeroNoCartao = document.querySelector(".numero-cartao-display");
const expMM = document.querySelector(".expiracao-mes-display");
const expYY = document.querySelector(".expiracao-ano-display");
const cvcDisplay = document.querySelector(".cvc-cartao");
const thankYou = document.getElementById("thank-you-header");
const thankYouSection = document.getElementById("thank-you");
const continueBtn = document.getElementById("continue");
const form = document.getElementById("formulario");
const expiryErrorMsg = document.getElementById("expiry-error");

function inputName() {
  nameOnCard.innerHTML = cardholder.value;
  thankYou.innerHTML = `Thank You ${cardholder.value}`;
  if (nameOnCard.innerHTML == "") {
    nameOnCard.innerHTML = cardholder.placeholder;
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
  let formattedMM = expiry[0].value;
  formattedMM = formattedMM.substring(0, 2);
  expiry[0].value = formattedMM;
  if (expiry[0].value === "") {
    expMM.innerHTML = "00";
  } else {
    expMM.innerHTML = expiry[0].value;
  }
}
function inputYY() {
  let formattedYY = expiry[1].value;
  formattedYY = formattedYY.substring(0, 4);
  expiry[1].value = formattedYY;
  if (expiry[1].value === "") {
    expYY.innerHTML = "0000";
  } else {
    expYY.innerHTML = expiry[1].value;
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
    if (cardholder.value.match(cardholderExp)) {
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

    if (expiry[0].value.match(expMonth)) {
      expiryErrorMsg.innerHTML = "";
    } else if (
      expiry[0].value.match(expMonth) &&
      expiry[1].value.match(expYear)
    ) {
      expiryErrorMsg.innerHTML = "";
    } else if (expiry[0] == "") {
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
    nameOnCard.innerHTML == cardholder.placeholder ||
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
  nameOnCard.innerHTML = cardholder.placeholder;
  numeroNoCartao.innerHTML = numeroCartao.placeholder;
  expMM.innerHTML = "00";
  expYY.innerHTML = "0000";
  cvcDisplay.innerHTML = "000";
  cardholder.value = "";
  numeroCartao.value = "";
  expiry[0].value = "";
  expiry[1].value = "";
  cvc.value = "";
  expiryErrorMsg.innerHTML = "";
});