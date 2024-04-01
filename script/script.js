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

// error label
const errorLabel = [...document.querySelectorAll(".error-label")];

// main functions
// window.addEventListener("DOMContentLoaded", () => {
//   updateName();
//   updateCvc();
//   updateNumber();
//   updateMonth();
//   updateYear();
// });

allInputs.forEach((input) => {
  input.addEventListener("input", () => {
    input.value = input.value.replace(/^\s/g, ""); // Avoid whiteSpace

    // set max-lenght to input
    const setAttributeInp = (x) => {
      input.setAttribute("maxlength", x);
    };

    //AVOID LETTER FUNCTION
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
        input.value = input.value.replace(/\d{4}/g, "$& "); // Avoid letters

        cardNumber.innerText = input.value;
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
    const errorLabel = document.createElement("label");
    errorLabel.classList.add("error-label");
    errorLabel.innerText = "Can't be blank";

    // SHOW ERROR
    if (input.value == "") {
      input.classList.add("error");

      // input.parentNode.lastElementChild.style.display = "block";

      if (
        !input.parentNode.lastElementChild.classList.contains("error-label")
      ) {
        input.parentNode.appendChild(errorLabel);
      }

      errorLabel.style.display = "block";
    }

    // HIDE ERROR
    if (input.value != "") {
      input.classList.remove("error");
      if (input.parentNode.hasChildNodes(errorLabel)) {
        console.log(input.parentNode.hasChildNodes(errorLabel));
        console.log("this is before deleting label", input.parentNode);
        input.parentNode.removeChild(input.parentNode.lastChild);
        console.log("this is after deleting label", input.parentNode);
      }
    }
  });
});

confirmBtn.addEventListener("click", () => {
  if (allInputs.every((input) => input.value)) {
    formSection.style.display = "none";
    completedSection.style.display = "block";
  } else {
    allInputs.forEach((input) => {
      if (input.value == "") {
        input.classList.add("error");
        showErrorLable();
      }
    });
  }
});

// show error laber function
const showErrorLable = () => {
  errorLabel.forEach((label) => {
    label.style.display = "block";
  });
};
