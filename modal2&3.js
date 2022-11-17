const nameInput = document.querySelector(".name-input");
const emailInput = document.querySelector(".email-input");
const timeInput = document.querySelector(".time-input");
const participantsInput = document.querySelector("#participants");
const errorMessageName = document.querySelector(".error-message-name");
const errorMessageEmail = document.querySelector(".error-message-email");
const errorMessageTime = document.querySelector(".error-message-time");

const errorMessages = {
  nameError: "You must enter your name!",
  emailError: "You must enter an email!",
  timeError: "You must enter a time you want to visit!",
};
const completedBooking = [];
const bookingInfo = {};

document.querySelector("input");
addEventListener("submit", function () {
  this.event.preventDefault();

  //taking input from all the input element with when the string is not empty.

  if (nameInput.value == "") {
    errorMessageName.innerHTML = errorMessages.nameError;
  } else if (nameInput.value != "") {
    bookingInfo.nameInfo = nameInput.value;
    errorMessageName.innerHTML = null;
  }

  if (emailInput.value === "") {
    errorMessageEmail.innerHTML = errorMessages.emailError;
  } else {
    bookingInfo.emailInfo = emailInput.value;
    errorMessageEmail.innerHTML = null;
  }

  if (timeInput.value === "") {
    errorMessageTime.innerHTML = errorMessages.timeError;
  } else if (timeInput.value != "") {
    bookingInfo.timeInfo = timeInput.value;
    errorMessageTime.innerHTML = null;
  }
  bookingInfo.participants = participantsInput.value;

  // expression to go through to modal3

  if (nameInput.value && emailInput.value && timeInput.value != "") {
    completedBooking.push(bookingInfo); //adding object to array.

    document.querySelector("#completed-booking-info1").innerHTML =
      bookingInfo.nameInfo + " is your groupname";
    document.querySelector("#completed-booking-info2").innerHTML =
      bookingInfo.emailInfo + " will recive an email with your confirmation";
    document.querySelector("#completed-booking-info3").innerHTML =
      " Your time is :" + " " + bookingInfo.timeInfo;
    document.querySelector("#completed-booking-info4").innerHTML =
      "A team of " + bookingInfo.participants + " participants";
  }
});
