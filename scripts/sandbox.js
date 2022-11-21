let list = document.querySelector(".challenge-list");

function addChallengesToDom(challenge) {
  list.innerHTML += `
     <li class="challenge-item">
       <img class="challenge-image" alt="Hacker" src=${challenge.image} />
       <h3 class="challenge-title">${challenge.title} (${challenge.type})</h3>
       <ul
         role="meter"
         class="rating"
         aria-label="rating"
         arial-valuemin="0"
         aria-valuemax="5"
         aria-valuenow=${challenge.rating}
         aria-valuetext= " ${challenge.rating} out of 5"
         
       >
         <li class="rating-star active"></li>
         <li class="rating-star active"></li>
         <li class="rating-star active"></li>
         <li class="rating-star active"></li>
         <li class="rating-star"></li>
       </ul>
       <small class="challenge-meta">${challenge.minParticipants}- ${challenge.maxParticipants} participants</small>
       <p class="challenge-description">
        ${challenge.description}
       </p>
       <button class="button primary modal-open">Book this room</button>
     </li>
     
     `;
}

// get alll challenges

async function getChallenges() {
  try {
    let res = await fetch(
      "https://lernia-sjj-assignments.vercel.app/api/challenges"
    );
    if (res.ok) {
      let data = await res.json();
      let ratingsArray = [];

      for (let ratingEl of data.challenges) {
        ratingsArray.push(ratingEl.rating);
      }

      let maxRating = Math.max(...ratingsArray);

      data.challenges.map((challenge) => {
        if (window.location.href === "http://127.0.0.1:5500/index.html") {
          if (
            challenge.rating === maxRating &&
            challenge.maxParticipants >= 7
          ) {
            addChallengesToDom(challenge);
            getRatings();
          }
        } else if (
          window.location.href === "http://127.0.0.1:5500/challenges.html"
        ) {
          addChallengesToDom(challenge);
          getRatings();
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
}
getChallenges();

// get ratings

function getRatings() {
  let ratingsUl = document.querySelector("ul.rating");
  console.log("ratingUl", ratingsUl);
  let ratingChil = ratingsUl.children;
  let ratingsList = Array.from(ratingChil);
  console.log("ratingsChil", ratingChil);
  console.log("ratingsList", ratingsList);
  let ratValue = ratingsUl.getAttribute("aria-valuenow");

  for (let i = 0; i < ratingsList.length; i++) {
    if (ratValue === 0) {
      let rat = ratingsList[i].classList.remove("active");
      console.log("i", rat);
    } else if (ratValue === 1) {
      ratingsList[1][2][3][4].classList.remove("active");
    } else if (ratValue === 2) {
      ratingsList[2][3][4].classList.remove("active");
    } else if (ratValue === 3) {
      ratingsList[3][4].classList.remove("active");
    } else if (ratValue === 4) {
      ratingsList[4].classList.remove("active");
    } else {
      ratingsList[i];
    }
  }
}

//event listeners
