const modalSection = document.createElement("section");
modalSection.classList.add("backdrop");
const modal = document.createElement("div");
modal.classList.add("modal-content");
const form = document.createElement("form");
form.classList.add("form-content");
const headingModal = document.createElement("h1");
headingModal.classList.add("heading-modal");
const confirmBtn = document.createElement("button");
confirmBtn.innerText = "Submit booking";
confirmBtn.classList.add("submit-booking");

const bookingInfo = {};
const completedBooking = [];

const errorMessages = {
  nameError: "You must enter your name!",
  emailError: "You must enter an email!",
  timeError: "You must enter a time you want to visit!",
};

document.querySelector("click");
addEventListener("click", modalPopUp2());

function modalPopUp2() {
  document.body.append(modalSection);
  modalSection.append(modal);

  modal.append(form);
  form.append(headingModal);
  headingModal.innerText = 'Book room "Title of room" (step 2)';

  const nameLabel = document.createElement("p");
  nameLabel.classList.add("label");
  nameLabel.innerText = "Name?";
  const input1 = document.createElement("input");
  input1.classList.add("input");

  const emailLabel = document.createElement("p");
  emailLabel.classList.add("label");
  emailLabel.innerText = "Email?";
  const input2 = document.createElement("input");
  input2.classList.add("input");

  const timeLabel = document.createElement("p");
  timeLabel.classList.add("label");
  timeLabel.innerText = "What time would you like to come?";
  const input3 = document.createElement("input");
  input3.classList.add("input");

  const participantsLabel = document.createElement("p");
  participantsLabel.classList.add("label");
  participantsLabel.innerText = "How many?";
  const input4 = document.createElement("select");
  input4.classList.add("input");

  const option2 = document.createElement("option");
  option2.innerText = "2 participants";
  const option3 = document.createElement("option");
  option3.innerText = "3 participants";
  const option4 = document.createElement("option");
  option4.innerText = "4 participants";
  const option5 = document.createElement("option");
  option5.innerText = "5 participants";
  const option6 = document.createElement("option");
  option6.innerText = "6 participants";

  form.append(
    nameLabel,
    input1,
    emailLabel,
    input2,
    timeLabel,
    input3,
    participantsLabel,
    input4,
    confirmBtn
  );

  input4.append(option2, option3, option4, option5, option6);

  //------------------------- Modal 3 ------------------------------

  confirmBtn.addEventListener("click", function () {
    event.preventDefault();

    console.log(bookingInfo);

    form.remove(); //removing the "form" element from modal 2
    modalPopUp3(); // replacing vid modal 3
  });

  function modalPopUp3() {
    const confirmationHeading = document.createElement("h1");
    confirmationHeading.classList.add("heading-modal");
    confirmationHeading.innerText = "Your booking has been confirmed";

    modal.append(confirmationHeading);
  }
}

/*  const nameInput = document.querySelector(".name-input");
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
*/
