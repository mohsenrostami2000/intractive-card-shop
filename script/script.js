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
console.log(date);
console.log(year);
console.log(month);

// FUNCTIONS///////////////////////

allInputs.forEach((input) => {
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
    const inpID = input.id;
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
        if (input.value < year % 100) {
          console.log("year expierd");
          showError(input, "Expierd month");
        }
        cardYear.innerText = input.value;
      }
      if (inpID == "month-input") {
        if (input.value < month) {
          showError(input, "Expierd month");
          console.log("month expierd");
        }
        cardMonth.innerText = input.value;
      }
      if (inpID == "cvc-number") {
        cardCvc.innerText = input.value;
      }
    }

    const nameInputID = inpID == "name-input";
    const cardInputID = inpID == "card-number-input";
    const monthInputID = inpID == "month-input";
    const yearInputID = inpID == "year-input";
    const cvcInputID = inpID == "cvc-number";

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
    showError(input, "Can't be blank");
    hideError(input);
    checkLength(input);
  });
});

// ADD EVENT TO CONFIRM BUTTON
confirmBtn.addEventListener("click", () => {
  if (!allInputs.every((input) => input.value)) {
    allInputs.forEach((input) => {
      showError(input, "Can't be blank");
    });
  }
});

// ADD EVENT TO CONTINIUE BTN
continueBtn.addEventListener("click", () => {
  const startCountdown = (seconds) => {
    let time = seconds;

    setInterval(() => {
      console.log(time);
      if (time > 1) {
        time--;
      }
    }, 1000);
  };

  startCountdown(3);

  setTimeout(() => {
    completedSection.style.display = "none";
    formSection.style.display = "block";
    window.location.reload();
  }, 4000);
});

// SHOW ERROR FUNCTION
const showError = (x, errorText) => {
  const errorLabel = document.createElement("label");
  errorLabel.classList.add("error-label");
  errorLabel.innerText = errorText;
  if (x.value == "") {
    x.classList.add("error");

    if (!x.parentNode.lastElementChild.classList.contains("error-label")) {
      x.parentNode.appendChild(errorLabel);
    }

    errorLabel.style.display = "block";
  }
};

// CHECK INPUT LENGTH
const checkLength = (x) => {
  if (x.value != "") {
    const errorLabel = document.createElement("label");
    errorLabel.classList.add("error-label");
    errorLabel.innerText = "Must be 16 digits";
    if (x.id == "card-number-input") {
      if (x.value.length < 19) {
        if (!x.parentNode.lastElementChild.classList.contains("error-label")) {
          x.parentNode.appendChild(errorLabel);
        }

        errorLabel.style.display = "block";
        x.classList.add("error");
      }
    }

    if (x.id == "cvc-number") {
      if (x.value.length < 3) {
        if (!x.parentNode.lastElementChild.classList.contains("error-label")) {
          x.parentNode.appendChild(errorLabel);
        }
        errorLabel.innerText = "Must be 3 digits";

        errorLabel.style.display = "block";
        x.classList.add("error");
      }
    }

    if (x.id == "month-input" || x.id == "year-input") {
      if (x.value < 10 && x.value.length < 2) {
        x.value = `0${x.value}`;
      }

      if (x.id == "year-input") {
        if (x.value < year % 100) {
          console.log("year expierd");
          showError(x, "Expierd month");
        }
        cardYear.innerText = x.value;
      }
      if (x.id == "month-input") {
        if (x.value < month) {
          showError(x, "Expierd month");
          console.log("month expierd");
        }
        cardMonth.innerText = x.value;
      }
    }
  }
};

// HIDE ERROR FUNCTION
const hideError = (x) => {
  const errorLabel = document.createElement("label");
  if (x.value != "") {
    if (!x.parentNode.lastElementChild.classList.contains("error-label")) {
      x.parentNode.appendChild(errorLabel);
    }
    x.classList.remove("error");
    if (x.parentNode.hasChildNodes(errorLabel)) {
      x.parentNode.removeChild(x.parentNode.lastChild);
    }
  }
};
