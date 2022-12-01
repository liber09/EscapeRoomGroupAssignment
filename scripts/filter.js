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
  let current_star_level_to = 5;

  filterButton.addEventListener("click", () => {
    filterSection.style.display = "block";
    filterButton.style.display = "none";
    filterButton.setAttribute("aria-expanded", true);
  });

  filterCloseButton.addEventListener("click", () => {
    filterSection.style.display = "none";
    filterButton.style.display = "block";
    filterButton.setAttribute("aria-expanded", false);
  });

  //------- FILTER BY RATING INPUT ----------
  const starsFrom = document.querySelectorAll(".star_from");
  const starsTo = document.querySelectorAll(".star_to");
  starsFrom.forEach((starFrom, i) => {
    starFrom.onclick = function (e) {
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

  //--------- FILTER BY RATING ----------
  const ratingInput = document.getElementsByName("rating");

  class RatingFilter {
    constructor(list) {}
    challengeMatch(card) {
      let cards = document.querySelectorAll(".challenge-item");
      for (let i = 0; i < cards.length; i++) {
        if (
          card.querySelector("ul.rating").ariaValueNow >=
            current_star_level_from &&
          card.querySelector("ul.rating").ariaValueNow <= current_star_level_to
        ) {
          return true;
        } else {
          return false;
        }
      }
    }
  }

  //----------- FILTER BY RATING TRIGGER ---------
  for (let rating of ratingInput) {
    rating.addEventListener("click", () => {
      this.filter = new FilterCollection(this);
      render();
    });
  }

  //----------- FILTER BY SEARCH ------------
  class SearchFilter {
    constructor(list) {}

    challengeMatch(card) {
      let cards = document.querySelectorAll(".challenge-item");
      let searchInput = document.querySelector(".searchInput");
      searchInput = searchInput.value;

      for (let i = 0; i < cards.length; i++) {
        if (card.innerText.toLowerCase().includes(searchInput.toLowerCase())) {
          return true;
        } else {
          return false;
        }
      }
    }
  }

  //--------- FILTER BY SERACH TRIGGER ----------

  searchInput.addEventListener("keyup", () => {
    this.filter = new FilterCollection(this);
    render();
  });

  //--------- FILTER BY TYPE -----------
  const checkBoxCheck = document.querySelectorAll("input[type=checkbox]");
  checkBoxCheck[0].checked = true;
  checkBoxCheck[1].checked = true;

  class TypeFilter {
    constructor(list) {}
    challengeMatch(card) {
      let cards = document.querySelectorAll(".challenge-item");
      if (
        checkBoxCheck[0].checked == true &&
        checkBoxCheck[1].checked == false
      ) {
        for (let i = 0; i < cards.length; i++) {
          if (
            card
              .querySelector(".challenge-type")
              .innerText.toLowerCase()
              .includes("online")
          ) {
            return true;
          } else {
            return false;
          }
        }
      } else if (
        checkBoxCheck[1].checked == true &&
        checkBoxCheck[0].checked == false
      ) {
        for (let i = 0; i < cards.length; i++) {
          if (
            card
              .querySelector(".challenge-type")
              .innerText.toLowerCase()
              .includes("onsite")
          ) {
            return true;
          } else {
            return false;
          }
        }
      } else if (
        checkBoxCheck[0].checked == true &&
        checkBoxCheck[1].checked == true
      ) {
        return true;
      } else {
        for (let j = 0; j < cards.length; j++) {
          return false;
        }
      }
    }
  }

  //----------- FILTER BY TYPE TRIGGER ---------
  checkBoxCheck.forEach((checkbox) => {
    checkbox.addEventListener("click", () => {
      this.filter = new FilterCollection(this);
      render();
    });
  });

  // -------- FILTER BY LABELS -----------
  const tagsBtn = document.querySelectorAll(".tagsButton");
  const filterArray = [];

  class LabelFilter {
    constructor(list) {}
    challengeMatch(card) {
      let cards = document.querySelectorAll(".challenge-item");

      for (let i = 0; i < cards.length; i++) {
        let labelSearch = card.querySelector("ul.rating").ariaLabel;
        if (filterArray.every((element) => labelSearch.includes(element))) {
          return true;
        } else {
          return false;
        }
      }
    }
  }

  //------- FILTER BY LABELS TRIGGER---------
  //------- LABEL ARRAY HANDLING -----------
  tagsBtn.forEach((tag) => {
    tag.addEventListener("click", (e) => {
      if (e.target.classList.contains("tagsButton-active")) {
        for (let i = 0; i < filterArray.length; i++) {
          if (e.target.value == filterArray[i]) {
            filterArray.splice(i, 1);
          }
        }
        e.target.classList.remove("tagsButton-active");
      } else {
        filterArray.push(e.target.value);
        e.target.classList.add("tagsButton-active");
      }
      this.filter = new FilterCollection(this);
      render();
    });
  });

  //---------- FILTER COLLECTION ----------------
  class FilterCollection {
    constructor(list) {
      this.list;
      this.filters = [
        new TypeFilter(list),
        new RatingFilter(list),
        new SearchFilter(list),
        new LabelFilter(list),
      ];
    }

    challengeMatch(card) {
      return this.filters.every((filter) => filter.challengeMatch(card));
    }
  }

  //------ FUNCTION TO SHOW FILTER RESULTS ------
  let cardsDiv = document.querySelector(".challenges");
  const noMatch = document.createElement("p");
  cardsDiv.append(noMatch);
  noMatch.innerText = "No matching challenges";
  noMatch.classList.add("no-match");

  function render() {
    let cards = document.querySelectorAll(".challenge-item");
    let hiddenCount = 0;

    for (let i = 0; i < cards.length; i++) {
      if (this.filter.challengeMatch(cards[i])) {
        cards[i].classList.remove("is-hidden");
      } else {
        cards[i].classList.add("is-hidden");
        hiddenCount++;
      }
    }
    if (hiddenCount == 30) {
      noMatch.style.display = "block";
    } else {
      noMatch.style.display = "none";
    }
  }
}
