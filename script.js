// -------------------- MOBILE MENU --------------------
document.querySelector(".main-nav-toggle").addEventListener("click", () => {
  document.querySelector(".main-nav").classList.toggle("open");
});

// -------------------- FILTER SECTION  --------------------
// Only runs filter code on the right html file
const host = "http://127.0.0.1:5500/";
const hostOnline = "https://liber09.github.io/EscapeRoomGroupAssignment/";
if (
  window.location.href == host + "challenges.html" ||
  window.location.href == hostOnline + "challenges.html"
) {
  const filterSection = document.querySelector(".filter");
  const filterButton = document.querySelector("#filterButton");
  const filterCloseButton = document.querySelector(".filterCloseButton");

  filterButton.addEventListener("click", () => {
    filterSection.style.display = "flex";
    filterButton.style.display = "none";
    filterButton.setAttribute("aria-expanded", true);
  });

  filterCloseButton.addEventListener("click", () => {
    filterSection.style.display = "none";
    filterButton.style.display = "block";
    filterButton.setAttribute("aria-expanded", false);
  });
}

// -------------------- MODAL --------------------

// Trigger "book this room" to open modal
const openModal = document.querySelectorAll(".modal-open");

// Backdrop when modal is open
const backDrop = document.createElement("section");
backDrop.classList.add("backdrop");

// Creates the modal window
const modal = document.createElement("div");
modal.classList.add("modal-content");

// Creates H3 element to use in modal
const modalHeading = document.createElement("h3");
modalHeading.classList.add("modal-heading");

// Close button "X" in modal
const closeBtn = document.createElement("small");
closeBtn.classList.add("modal-close");
closeBtn.innerHTML = "&times;";

// Button
const button = document.createElement("button");
button.classList.add("button", "primary", "modal-button");

// Function to close modal if click outside of modalbox
function closeModal() {
  window.onclick = function (event) {
    if (event.target == backDrop) {
      backDrop.remove();
    }
  };
}
const inputDate = document.createElement("input");
const labelDate = document.createElement("label");
const question = document.createElement("p");
// When user clicks on "book this room", run and create function to open modal
openModal.forEach(function (e) {
  e.addEventListener("click", function () {
    document.body.append(backDrop);
    backDrop.addEventListener("click", closeModal);

    // Remove modal when click on X
    modal.appendChild(closeBtn);
    closeBtn.addEventListener("click", function () {
      backDrop.remove();
    });

    // Set heading inside modal

    modalHeading.innerHTML =
      'Book room <span class="room-title">"Title of room"</span> <br>(step 1)';
    modal.appendChild(modalHeading);

    backDrop.appendChild(modal);
    // Question in modal

    question.style.margin = "40px";
    question.innerText = "What date would you like to come?";
    modal.appendChild(question);

    // Label for input

    labelDate.setAttribute("for", "date");
    labelDate.innerText = "Date:";
    modal.appendChild(labelDate);

    // Date input

    inputDate.id = "date";
    inputDate.type = "date";
    inputDate.valueAsNumber =
      Date.now() - new Date().getTimezoneOffset() * 60000;
    modal.appendChild(inputDate);

    // Button "search available times"
    button.innerHTML = "Search available times";
    button.type = "submit";
    modal.appendChild(button);
    button.addEventListener("click", async function () {
      const res = await fetch(
        `https://lernia-sjj-assignments.vercel.app/api/booking/available-times?date=${inputDate.value}&challenge=3"`
      );
      const data = await res.json();
      console.log(inputDate.value);
      data.slots.forEach((slot) => {
        console.log(slot);
      });
    });
  });
});

// -------------------- END OF MODAL JS --------------------

//---------------------- CREATING MODAL2 ----------------------

//search avalible times button creats new modal
button.addEventListener("click", function () {
  backDrop.remove();
  modalPopUp2();
});

function modalPopUp2() {
  //variables
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

  //object and array for storing input value
  const bookingInfo = {};
  let completedBooking = [];

  //errormessages if input is empty !!!!!! not able yet
  const errorMessages = {
    nameError: "You must enter your team name!",
    emailError: "You must enter an valid email!",
    timeError: "You must enter a time you want to visit!",
  };
  const completedMessages = {
    nameCompleted: "Your team name is valid",
    emailCompleted: "This email is valid",
    timeCompleted: "This time exist",
  };

  //creating modal
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
  input1.type = "text";

  const emailLabel = document.createElement("p");
  emailLabel.classList.add("label");
  emailLabel.innerText = "Email?";
  const input2 = document.createElement("input");
  input2.classList.add("input");
  input2.type = "email";

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

  const closeBtn2 = document.createElement("small");
  closeBtn2.classList.add("modal-close");
  closeBtn2.innerHTML = "&times;";

  //appending all created elements to modal
  form.append(
    nameLabel,
    input1,
    emailLabel,
    input2,
    timeLabel,
    input3,
    participantsLabel,
    input4,
    confirmBtn,
    closeBtn2
  );

  input4.append(option2, option3, option4, option5, option6);

  //closing modal on X Icon
  closeBtn2.addEventListener("click", function () {
    modalSection.remove();
  });

  // storing user input in object an array when submit button is pressed.
  confirmBtn.addEventListener("click", function () {
    event.preventDefault();
    if (input1.value === "") {
      nameLabel.innerText = errorMessages.nameError;
      nameLabel.style.color = "red";
    } else if (input1.value.length < 3) {
      nameLabel.innerText = "Your team name must be at least 3 letters long";
      nameLabel.style.color = "red";
    } else {
      nameLabel.innerText = completedMessages.nameCompleted;
      nameLabel.style.color = "black";
    }

    if (input2.value === "") {
      emailLabel.innerText = "You haven't enter anything";
      emailLabel.style.color = "red";
    } else if (input2.value.length < 10) {
      emailLabel.innerText = "This is not a valid email adress";
      emailLabel.style.color = "red";
    } else if (input2.value) {
      emailLabel.innerText = completedMessages.emailCompleted;
      emailLabel.style.color = "black";
    }

    if (input3.value.length < 2 || input3.value != isNaN) {
      timeLabel.innerText = "You haven't enter a time";
      timeLabel.style.color = "red";
    } else {
      timeLabel.innerText = completedMessages.timeCompleted;
      timeLabel.style.color = "black";
    }

    //moving forward if inputfields are correct
    if (
      nameLabel.innerText == completedMessages.nameCompleted &&
      emailLabel.innerText == completedMessages.emailCompleted &&
      timeLabel.innerHTML == completedMessages.timeCompleted
    ) {
      form.remove(); //removing the "form" element from modal 2
      modalPopUp3(); // replacing vid modal 3
      bookingInfo.nameInfo = input1.value;
      bookingInfo.emailInfo = input2.value;
      bookingInfo.timeInfo = input3.value;
      bookingInfo.participantInfo = input4.value;
      completedBooking.push(bookingInfo);
      console.log(completedBooking);
    }
  });

  //------------------------- Modal 3 ------------------------------

  function modalPopUp3() {
    //creating elements
    const confirmationHeading = document.createElement("h1");
    confirmationHeading.classList.add("heading-modal");
    confirmationHeading.innerText = "Your booking has been confirmed";

    const bookingDoneText1 = document.createElement("h2");
    const bookingDoneText2 = document.createElement("h2");
    const bookingDoneText3 = document.createElement("h2");
    const bookingDoneText4 = document.createElement("h2");

    //displaying info about the booking
    bookingDoneText1.innerText = "Your team name is: " + bookingInfo.nameInfo;
    bookingDoneText2.innerText =
      "We have sent a confirmation mail to: " + bookingInfo.emailInfo;
    bookingDoneText3.innerText = "Your time is: " + bookingInfo.timeInfo;
    bookingDoneText4.innerText =
      "This room is booked for " + bookingInfo.participantInfo;

    //return to homepage tag
    const homePageBtn = document.createElement("a");
    homePageBtn.setAttribute("href", "challenges.html");
    homePageBtn.classList.add("submit-booking");
    homePageBtn.innerText = "Return to homepage";

    //appending all element to modal 3
    modal.append(
      confirmationHeading,
      bookingDoneText1,
      bookingDoneText2,
      bookingDoneText3,
      bookingDoneText4,
      homePageBtn
    );
  }
}
