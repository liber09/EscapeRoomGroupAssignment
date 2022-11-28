let list = document.querySelector(".challenge-list");

function addChallengesToDom(challenge) {
  list.innerHTML += `
     <li class="challenge-item">
       <img class="challenge-image" alt="Hacker" src=${challenge.image} />
       <h3 class="challenge-title">${challenge.title} (${challenge.type})</h3>
       <ul
       id="challenge-${challenge.id}
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
        if (window.location.href === "http://127.0.0.1:5501/index.html") {
          if (
            challenge.rating === maxRating &&
            challenge.maxParticipants >= 7
          ) {
            addChallengesToDom(challenge);
            getRatings();
          }
        } else if (
          window.location.href === "http://127.0.0.1:5501/challenges.html"
        ) {
          addChallengesToDom(challenge);
          setStarRating();
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
}
getChallenges();

// get ratings

function setStarRating() {
  let ratingsUl = document.querySelectorAll("ul.rating");
  //console.log("ratingUl", ratingsUl);
  for (let j = 0; j < ratingsUl.length; j++) {
    //console.log("ratingUl", ratingsUl[j]);
    let ratingChil = ratingsUl[j].children;
    let ratingsList = Array.from(ratingChil);
    //console.log("ratingsChil", ratingChil);
    //console.log("ratingsList", ratingsList);

    let ratValue = Math.ceil(ratingsUl[j].getAttribute("aria-valuenow"));
    //console.log(ratValue);
    for (let i = 0; i < ratingsList.length; i++) {
      if (ratingsList == 0) {
        let star = ratingsList[i];
        star.classList.remove("active");
      } else if (ratValue == 1) {
        if (i == 1 || i == 2 || i == 3 || i == 4) {
          let star = ratingsList[i];
          star.classList.remove("active");
        }
      } else if (ratValue == 2) {
        if (i == 2 || i == 3 || i == 4) {
          let star = ratingsList[i];
          star.classList.remove("active");
        }
      } else if (ratValue == 3) {
        if (i == 3 || i == 4) {
          let star = ratingsList[i];
          star.classList.remove("active");
        }
      } else if (ratValue == 4) {
        if (i == 4) {
          let star = ratingsList[i];
          star.classList.remove("active");
        }
      } else {
        ratingsList[i];
      }
    }
  }
}

//event listeners
