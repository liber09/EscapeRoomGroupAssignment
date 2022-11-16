const filterSection = document.querySelector(".filter");
const filterButton = document.querySelector("#filterButton");
const filterCloseButton = document.querySelector(".filterCloseButton")

document.querySelector(".main-nav-toggle").addEventListener("click", () => {
  document.querySelector(".main-nav").classList.toggle("open");
});

filterButton.addEventListener("click", () => {
  filterSection.style.display = "flex";
  filterButton.style.display = "none"
  filterButton.setAttribute("aria-expanded", true);
})

filterCloseButton.addEventListener("click", () => {
  filterSection.style.display = "none";
  filterButton.style.display = "block"
  filterButton.setAttribute("aria-expanded", false);
})