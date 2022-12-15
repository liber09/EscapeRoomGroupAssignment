// -------------------- MOBILE MENU --------------------
document.querySelector(".main-nav-toggle").addEventListener("click", () => {
  document.querySelector(".main-nav").classList.toggle("open");
});

document.querySelector(".contact-button").addEventListener("click", () => {
  const message = document.querySelector(".message");
  message.style.color = "green";
  message.style.fontWeight = "900";
  message.value =
    "Thank you for getting in touch! We appreciate you contacting us. One of our colleagues will get back in touch with you soon! Have a great day!";
});
