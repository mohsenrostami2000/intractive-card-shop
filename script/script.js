// VARIABLES

// form inputs
const nameInp = document.getElementById("name-input");
const numberInp = document.getElementById("card-number-input");
const monthInp = document.getElementById("month-input");
const yearInp = document.getElementById("year-input");
const cvcInp = document.getElementById("cvc-number");

const allInputs = document.querySelectorAll("input");

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
const formSection = document.getElementsByClassName("form-container");
const completedSection = document.getElementsByClassName("completed-section");

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
      }
      if (inpID == "card-number-input") {
        input.value = input.value.replace(/\D/g, ""); // Avoid letters
        input.value = input.value.replace(/\d{4}/g, "$& "); // Avoid letters

        cardNumber.innerText = input.value;
        console.log(input.value);
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
    } else {
      // defaut value of card information
      if (inpID == "name-input") {
        cardName.innerText = "jane appleseed";
      }
      if (inpID == "card-number-input") {
        cardNumber.innerText = "0000 0000 0000 0000";
      }
      if (inpID == "month-input") {
        cardMonth.innerText = "00";
      }
      if (inpID == "year-input") {
        cardYear.innerText = "00";
      }
      if (inpID == "cvc-number") {
        cardCvc.innerText = "000";
      }
    }
  });
  input.addEventListener("blur", () => {
    input.value == ""
      ? input.classList.add("error")
      : input.classList.remove("error");
  });
});
