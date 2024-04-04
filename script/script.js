// VARIABLES

// form inputs
const nameInp = document.getElementById("name-input");
const numberInp = document.getElementById("card-number-input");
const monthInp = document.getElementById("month-input");
const yearInp = document.getElementById("year-input");
const cvcInp = document.getElementById("cvc-number");

const allInputs = [...document.querySelectorAll("input")];

// card information
const cardCvc = document.getElementById("cvc");
const cardNumber = document.getElementById("credit-card-number");
const cardName = document.getElementById("name");
const cardMonth = document.getElementById("month");
const cardYear = document.getElementById("year");

//  buttons
const confirmBtn = document.getElementById("confirm-btn");
const continueBtn = document.getElementById("continue-btn");

// form section
const formSection = document.querySelector(".form-container");
const completedSection = document.querySelector(".completed-section");

const date = new Date();
const year = date.getUTCFullYear() % 100;
const month = date.getMonth();

// FUNCTIONS///////////////////////

allInputs.forEach((input) => {
  const inpID = input.id;
  const nameInputID = inpID == "name-input";
  const cardInputID = inpID == "card-number-input";
  const monthInputID = inpID == "month-input";
  const yearInputID = inpID == "year-input";
  const cvcInputID = inpID == "cvc-number";
  input.addEventListener("input", () => {
    input.value = input.value.replace(/^\s/g, ""); // Avoid whiteSpace

    // set max-lenght to input
    const setAttributeInp = (lenght) => {
      input.setAttribute("maxlength", lenght);
    };

    // AVOID LETTER FUNCTION
    const numberOnly = () => {
      input.value = input.value.replace(/\D/g, ""); // Avoid letters
    };

    // set max-length bassed on ID

    inpID == "name-input"
      ? setAttributeInp(25)
      : inpID == "card-number-input"
      ? setAttributeInp(19)
      : inpID == "month-input" || inpID == "year-input"
      ? setAttributeInp(2)
      : setAttributeInp(3);

    if (input.value != "" && input.length != 0) {
      if (inpID == "name-input") {
        cardName.innerText = input.value;
      } else {
        numberOnly();
      }
      if (inpID == "card-number-input") {
        const ZeroNumbers = 16 - input.value.length;
        const zeroArr = [];
        for (let i = 0; i < ZeroNumbers; i++) {
          zeroArr.push(0);
        }

        input.value = input.value.replace(/\d{4}/g, "$& "); // Avoid letters
        cardNumber.innerText = (
          input.value + zeroArr.join("").toString()
        ).replace(/\d{4}/g, "$& ");
      }
      if (inpID == "year-input") {
        cardYear.innerText = input.value;
      }
      if (inpID == "month-input") {
        cardMonth.innerText = input.value;
      }
      if (inpID == "cvc-number") {
        cardCvc.innerText = input.value;
      }
    }

    if (input.value == "") {
      // defaut value of card information
      if (nameInputID) {
        cardName.innerText = "jane appleseed";
      }
      if (cardInputID) {
        cardNumber.innerText = "0000 0000 0000 0000";
      }
      if (monthInputID) {
        cardMonth.innerText = "00";
      }
      if (yearInputID) {
        cardYear.innerText = "00";
      }
      if (cvcInputID) {
        cardCvc.innerText = "000";
      }
    }
  });

  input.addEventListener("blur", () => {
    if (input.value == "") {
      hideError(input);
      input.classList.add("error");
      showError(input, "Can't be blank");
    }
    if (input.value != "") {
      hideError(input);
      if (cardInputID) {
        if (input.value.length < 19) {
          showError(input, "Must be 16 digits");
        }
      }
      if (monthInputID) {
        if (input.value < 10 && input.value.length < 2) {
          input.value = `0${input.value}`;
        }
        if (input.value < month) {
          showError(input, "Expierd Month");
        }
      }
      if (yearInputID) {
        if (input.value < 10 && input.value.length < 2) {
          input.value = `0${input.value}`;
        }

        if (input.value < year % 100) {
          showError(input, "Expierd Year");
        }
      }
      if (cvcInputID) {
        if (input.value.length < 3) {
          showError(input, "Must be 3 digit");
        }
      }
    }
  });
});

// ADD EVENT TO CONFIRM BUTTON
confirmBtn.addEventListener("click", () => {
  allInputs.forEach((input) => {
    if (input.value == "") {
      showError(input, "Can't be blank");
    }
  });
  const errorLabel = document.querySelectorAll(".error-label");
  console.log(errorLabel);
  if (errorLabel.length == 0) {
    formSection.style.display = "none";
    completedSection.style.display = "block";
  }
});

// ADD EVENT TO CONTINIUE BTN
continueBtn.addEventListener("click", () => {
  alert("reload the page");

  window.location.reload();
});

// SHOW ERROR FUNCTION
const showError = (x, errorText) => {
  const errorLabel = document.createElement("label");

  errorLabel.classList.add("error-label");
  errorLabel.innerText = errorText;
  x.classList.add("error");

  if (!x.parentNode.lastElementChild.classList.contains("error-label")) {
    x.parentNode.appendChild(errorLabel);
  }

  errorLabel.style.display = "block";
};

// HIDE ERROR FUNCTION
const hideError = (x) => {
  const errorLabel = document.createElement("label");
  if (!x.parentNode.lastElementChild.classList.contains("error-label")) {
    x.parentNode.appendChild(errorLabel);
  }
  x.classList.remove("error");
  if (x.parentNode.hasChildNodes(errorLabel)) {
    x.parentNode.removeChild(x.parentNode.lastChild);
  }
};
