// -------------------- MOBILE MENU --------------------
document.querySelector(".main-nav-toggle").addEventListener("click", () => {
  document.querySelector(".main-nav").classList.toggle("open");
});
// -------------------- FILTER SECTION  --------------------
// Only runs filter code on the right html file
const host = "http://127.0.0.1:5501/";
const hostOnline = "https://liber09.github.io/EscapeRoomGroupAssignment/";
if (
  window.location.href == host + "challenges.html" ||
  window.location.href == hostOnline + "challenges.html"
) {
  const filterSection = document.querySelector(".filter");
  const filterButton = document.querySelector("#filterButton");
  const filterCloseButton = document.querySelector(".filterCloseButton");

  let current_star_level_from = 0;
  let current_star_level_to = 0;

  filterButton.addEventListener("click", () => {
    filterSection.style.display = "flex";
    filterButton.style.display = "none";
    filterButton.setAttribute("aria-expanded", true);
  });

  filterCloseButton.addEventListener("click", () => {
    filterSection.style.display = "none";
    filterButton.style.display = "flex";
    filterButton.setAttribute("aria-expanded", false);
  });

  //Filter by rating Input
  //Added more functionallity, being able to put stars back to 0 --Anton
  const starsFrom = document.querySelectorAll(".star_from");
  const starsTo = document.querySelectorAll(".star_to");
  starsFrom.forEach((starFrom, i) => {
    starFrom.onclick = function () {
      if (current_star_level_from == 1) {
        starFrom.innerHTML = "&#9734";
        current_star_level_from = 0;
      } else {
        current_star_level_from = i + 1;
        starsFrom.forEach((starFrom, j) => {
          if (starsFrom[1].innerHTML == "&#9733") {
            starsFrom[0].innerHTML = "&#9734";
          } else {
            if (current_star_level_from >= j + 1) {
              starFrom.innerHTML = "&#9733";
            } else {
              starFrom.innerHTML = "&#9734";
            }
          }
        });
      }
    };
  });

  starsTo.forEach((starTo, i) => {
    starTo.onclick = function () {
      if (current_star_level_to == 1) {
        starTo.innerHTML = "&#9734";
        current_star_level_to = 0;
      } else {
        current_star_level_to = i + 1;
        starsTo.forEach((starTo, j) => {
          if (current_star_level_to >= j + 1) {
            starTo.innerHTML = "&#9733";
          } else {
            starTo.innerHTML = "&#9734";
          }
        });
      }
    };
  });

  //------ Rating filter -------
  const ratingInput = document.getElementsByName("rating");

  function ratingFilter() {
    let cards = document.querySelectorAll(".challenge-item");
    for (let i = 0; i < cards.length; i++) {
      if (
        cards[i].querySelector("ul.rating").ariaValueNow >=
          current_star_level_from &&
        cards[i].querySelector("ul.rating").ariaValueNow <=
          current_star_level_to
      ) {
        cards[i].classList.remove("is-hidden");
      } else {
        cards[i].classList.add("is-hidden");
      }
    }
  }

  //Trigger for Rating Filter
  for (let rating of ratingInput) {
    rating.addEventListener("click", () => {
      ratingFilter();
    });
  }

  // Free search

  function freeSearch() {
    let cards = document.querySelectorAll(".challenge-item");
    let searchInput = document.querySelector(".searchInput");
    searchInput = searchInput.value;

    for (let i = 0; i < cards.length; i++) {
      if (
        cards[i].innerText.toLowerCase().includes(searchInput.toLowerCase())
      ) {
        cards[i].classList.remove("is-hidden");
      } else {
        cards[i].classList.add("is-hidden");
      }
    }
  }
  // Event listener and search delay on input field
  let typingTimer;
  let typeInterval = 500;
  let searchInput = document.querySelector(".searchInput");

  searchInput.addEventListener("keyup", () => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(freeSearch, typeInterval);
  });

  //------- FILTER BY TYPE --------
  const checkBoxCheck = document.querySelectorAll("input[type=checkbox]");

  function typeFilter() {
    let cards = document.querySelectorAll(".challenge-item");

    if (checkBoxCheck[0].checked == true && checkBoxCheck[1].checked == false) {
      for (let i = 0; i < cards.length; i++) {
        if (
          cards[i]
            .querySelector(".challenge-title")
            .innerText.toLowerCase()
            .includes("online")
        ) {
          cards[i].classList.remove("is-hidden");
        } else {
          cards[i].classList.add("is-hidden");
        }
      }
    } else if (
      checkBoxCheck[1].checked == true &&
      checkBoxCheck[0].checked == false
    ) {
      console.log("Andra Test");
      for (let i = 0; i < cards.length; i++) {
        if (
          cards[i]
            .querySelector(".challenge-title")
            .innerText.toLowerCase()
            .includes("onsite")
        ) {
          cards[i].classList.remove("is-hidden");
        } else {
          cards[i].classList.add("is-hidden");
        }
      }
    } else {
      for (let i = 0; i < cards.length; i++) {
        cards[i].classList.remove("is-hidden");
      }
    }
  }

  //Trigger for checkbox filter
  checkBoxCheck.forEach((checkbox) => {
    checkbox.addEventListener("click", () => {
      typeFilter();
    });
  });
}

// -------------------- MODAL --------------------

// Trigger "book this room" to open modal
const openModal = document.querySelector(".challenge-list");

// Backdrop when modal is open
const backDrop = document.createElement("section");
backDrop.classList.add("backdrop");

// Creates the modal window
const modal = document.createElement("div");
modal.classList.add("modal-content");

// Creates H2 element to use in modal
const modalHeading = document.createElement("h2");
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
openModal.addEventListener("click", function (e) {
  if (e.target.classList.contains("modal-open")) document.body.append(backDrop);
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

  inputDate.valueAsNumber = Date.now() - new Date().getTimezoneOffset() * 60000;

  modal.appendChild(inputDate);

  // Button "search available times"
  button.innerHTML = "Search available times";
  button.type = "submit";
  modal.appendChild(button);

  const today = new Date().toISOString().split("T")[0];
  inputDate.setAttribute("min", today);
  const selectedDate = inputDate.value;

  button.addEventListener("click", async function () {
    const res = await fetch(
      `https://lernia-sjj-assignments.vercel.app/api/booking/available-times?date=${selectedDate}&challenge=3"`
    );
    const data = await res.json();
    console.log(inputDate.value);
    data.slots.forEach((slot) => {
      console.log(slot);
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
  const headingModal = document.createElement("h2");
  headingModal.classList.add("modal-heading");
  const confirmBtn = document.createElement("button");
  confirmBtn.innerText = "Submit booking";
  confirmBtn.classList.add(
    "button",
    "primary",
    "modal-button",
    "submit-button"
  );
  // Close modal when clicking outside
  function closeModal() {
    window.onclick = function (event) {
      if (event.target == modalSection) {
        modalSection.remove();
      }
    };
  }
  modalSection.addEventListener("click", closeModal);

  //errormessages if input is empty !!!!!! not able yet
  const errorMessages = {
    nameError: "You must enter your team name!",
    emailError: "You must enter an valid email!",
    emptyError: "You must enter an valid email!",
    shortError: "Your team name must be at least 3 letters long",
  };
  const completedMessages = {
    nameCompleted: "Your team name is valid",
    emailCompleted: "This email is valid",
  };

  //creating modal
  document.body.append(modalSection);
  modalSection.append(modal);

  const closeBtn2 = document.createElement("small");
  closeBtn2.classList.add("modal-close");
  closeBtn2.innerHTML = "&times;";
  modal.append(closeBtn2);
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
  const input3 = document.createElement("select");
  input3.classList.add("input", "input-time");
  input3.type = "time";

  const participantsLabel = document.createElement("p");
  participantsLabel.classList.add("label");
  participantsLabel.innerText = "How many?";
  const input4 = document.createElement("select");
  input4.classList.add("input", "input-participants");

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
    confirmBtn
  );

  //funktion för participants !! behövs lösas så den kopplar till challanges "id"
  async function participants() {
    const resParticipants = await fetch(
      `https://lernia-sjj-assignments.vercel.app/api/challenges`
    );
    const dataParticipants = await resParticipants.json();

    dataParticipants.challenges.forEach((participants) => {
      const participantsOption = document.createElement("option");

      participantsOption.innerText = participants.minParticipants;
      input4.append(participantsOption);
    });
  }
  participants();

  //function för att få ut tid som är tillgängligt för bokning under det datumet.
  async function time() {
    const resTime = await fetch(
      `https://lernia-sjj-assignments.vercel.app/api/booking/available-times?date=${inputDate.value}&challenge=3"`
    );
    const dataTime = await resTime.json();
    dataTime.slots.forEach((slotTime) => {
      const timeOption = document.createElement("option");
      timeOption.innerText = slotTime;
      input3.append(timeOption);

      console.log(slotTime);
    });
  }
  time();

  //closing modal on X Icon
  closeBtn2.addEventListener("click", function () {
    modalSection.remove();
  });

  // storing user input in object an array when submit button is pressed.
  confirmBtn.addEventListener("click", async function () {
    event.preventDefault();
    if (input1.value === "") {
      nameLabel.innerText = errorMessages.nameError;
      nameLabel.style.color = "red";
    } else if (input1.value.length < 3) {
      nameLabel.innerText = errorMessages.shortError;
      nameLabel.style.color = "red";
    } else {
      nameLabel.innerText = completedMessages.nameCompleted;
      nameLabel.style.color = "black";
    }

    if (input2.value === "") {
      emailLabel.innerText = errorMessages.emptyError;
      emailLabel.style.color = "red";
    } else if (input2.value.length <= 8) {
      emailLabel.innerText = errorMessages.emailError;
      emailLabel.style.color = "red";
    } else if (input2.value.includes("@" && ".")) {
      emailLabel.innerText = completedMessages.emailCompleted;
      emailLabel.style.color = "black";
    }

    if (
      nameLabel.innerText == completedMessages.nameCompleted &&
      emailLabel.innerText == completedMessages.emailCompleted
    ) {
      //POST Request
      const bookingResult = await fetch(
        "https://lernia-sjj-assignments.vercel.app/api/booking/reservations",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            challenge: 3,
            name: input1.value,
            email: input2.value,
            date: inputDate.value,
            time: input3.value,
            participants: parseInt(input4.value.match(/\d+/g)),
          }),
        }
      );
      const booking = await bookingResult.json();
      console.log(booking);
      //moving forward if inputfields are correct
      form.remove(); //removing the "form" element from modal 2
      modalPopUp3(); // replacing vid modal 3
    }
  });

  //------------------------- Modal 3 ------------------------------

  function modalPopUp3() {
    //creating elements
    const confirmationHeading = document.createElement("h2");
    confirmationHeading.classList.add("modal-heading");
    confirmationHeading.style.color = "green";
    confirmationHeading.innerText = "Your booking has been confirmed";

    const bookingDoneText1 = document.createElement("p");
    const bookingDoneText2 = document.createElement("p");
    const bookingDoneText3 = document.createElement("p");
    const bookingDoneText4 = document.createElement("p");

    //object and array for storing input value
    const completedBooking = [];
    const bookingInfo = {};

    bookingInfo.nameInfo = input1.value;
    bookingInfo.emailInfo = input2.value;
    bookingInfo.timeInfo = input3.value;
    bookingInfo.participantInfo = input4.value;
    //displaying info about the booking
    bookingDoneText1.innerText = "Your team name is: " + bookingInfo.nameInfo;
    bookingDoneText2.innerText =
      "We have sent a confirmation mail to: " + bookingInfo.emailInfo;
    bookingDoneText3.innerText = "Your time is: " + bookingInfo.timeInfo;
    bookingDoneText4.innerText =
      "This room is booked for " +
      bookingInfo.participantInfo +
      " participants";

    //return to homepage tag
    const homePageBtn = document.createElement("a");
    homePageBtn.setAttribute("href", "challenges.html");
    homePageBtn.classList.add("submit-booking");
    homePageBtn.innerText = "Return to homepage";

    //adding the bookked object to array

    completedBooking.push(bookingInfo);

    //appending all elements to modal 3
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
