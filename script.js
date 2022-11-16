const filterSection = document.querySelector(".filter");
const filterButton = document.querySelector("#filterButton");
const filterCloseButton = document.querySelector(".filterCloseButton");

document.querySelector(".main-nav-toggle").addEventListener("click", () => {
  document.querySelector(".main-nav").classList.toggle("open");
});

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

// Modal
const openModal = document.querySelector("#modal-open");
const modal = document.querySelector(".modal");
const closeModal = document.querySelector(".modal-close");

// When user clicks on "book this room", open modal
openModal.addEventListener("click", function () {
  modal.style.display = "block";
});
// When user clicks on "X", close modal
closeModal.addEventListener("click", function () {
  modal.style.display = "none";
});

// If user clicks outside of modal-content, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
