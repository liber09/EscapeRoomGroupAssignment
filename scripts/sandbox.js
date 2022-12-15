let list = document.querySelector(".challenge-list");
let spinner = document.querySelectorAll('.spinner')
console.log('spinner',spinner)

let allChallenges;

function addChallengesToDom(challenge) {
  if (challenge.type === "onsite") {
    list.innerHTML += `
    
    <li class="challenge-item" id="${challenge.id}"> 
    <div class="wrapper">
    <i class="fa-solid fa-house"></i>
    <img class="challenge-image" alt="Hacker" src=${challenge.image} />
    </div>
      <h3 class="challenge-title">${challenge.title} (${challenge.type})</h3>
      
      <ul
        role="meter"
        class="rating"
        aria-label=${challenge.labels}
        arial-valuemin="0"
        aria-valuemax="5"
        aria-valuenow=${challenge.rating}
        aria-valuetext= " ${challenge.rating} out of 5"
        
      >
        <li class="rating-star active"></li>
        <li class="rating-star active"></li>
        <li class="rating-star active"></li>
        <li class="rating-star active"></li>
        <li class="rating-star active"></li>
      </ul>
      <small class="challenge-meta">${challenge.minParticipants}- ${challenge.maxParticipants} participants</small>
      <p class="challenge-description">
      ${maxChar(challenge.description)}
     
      </p>
      <button class="button primary modal-open">Book this room</button>
      <p class="challenge-type" hidden>${challenge.type}</p>
      <p class="challenge-meta-min" hidden>${challenge.minParticipants}</p>
      <p class="challenge-meta-max" hidden>${challenge.maxParticipants}</p>
    </li>

    `;
  } else {
    list.innerHTML += `
    <li class="challenge-item">
    
    <div class="wrapper">
    <i class="fa-solid fa-laptop"></i> 
    
    
      <img class="challenge-image" alt="Hacker" src=${challenge.image} />
      </div>
      <h3 class="challenge-title">${challenge.title} (${challenge.type})</h3>
      
      <ul
      id="challenge-${challenge.id}
        role="meter"
        class="rating"
        aria-label=${challenge.labels}
        arial-valuemin="0"
        aria-valuemax="5"
        aria-valuenow=${challenge.rating}
        aria-valuetext= " ${challenge.rating} out of 5"
        
      >
        <li class="rating-star active"></li>
        <li class="rating-star active"></li>
        <li class="rating-star active"></li>
        <li class="rating-star active"></li>
        <li class="rating-star active"></li>
      </ul>
      <small class="challenge-meta">${challenge.minParticipants}- ${challenge.maxParticipants} participants</small>
      <p class="challenge-description">
      ${maxChar(challenge.description)}
     
      </p>
      <button class="button third online-modal">Take challenge online</button>
      <p class="challenge-type" hidden>${challenge.type}</p>
      <p class="challenge-meta-min" hidden>${challenge.minParticipants}</p>
      <p class="challenge-meta-max" hidden>${challenge.maxParticipants}</p>
    </li>

    `;
  }
}

// show max 3o chars for description
function maxChar (str){
  
  let strArr = str.split('')
 
  let newArr = strArr.slice(0,31) 
  let remEl = strArr.slice(31, strArr.length)
  let repEl = remEl.join('').replace(remEl.join(''), '"..."')
  console.log('repEl', repEl)
  let finalArr = newArr.join('') + ' ' + repEl
  return finalArr

}


// set Error when we cannot load challenges
function setError (message, color){
  let challengeError = document.querySelector('.error-div')
  challengeError.style.display = 'block'
  list.style.display ='none'
  challengeError.innerHTML  = `<p>${message}</p>`
  challengeError.style.color = color
  let challengeContainer = document.querySelector('.challenges')
  challengeContainer.appendChild(challengeError)
  if(window.location.href === 'http://127.0.0.1:5501/challenges.html'){
    let filterBtn = document.querySelector('#filterButton')
    filterBtn.style.display = 'none' 
}

  if(window.location.href === 'http://127.0.0.1:5501/index.html'){
   let challengeBtns = document.querySelector('.challenges-cta')
   challengeBtns.style.display = 'none' 
               
    }

  setTimeout(()=>{
      hideLoader()
  },1000) 
 

}

// display and hide spinner
function displayLoader (){
  spinner.forEach(spin=>{
    spin.style.display = 'block'
  })
    
 
}

function hideLoader (){
  spinner.forEach(spin=>{
    spin.style.display = 'none'
  })
}

// get all challenges
async function getChallenges() {
  displayLoader()
  try {
    let res = await fetch(
      "https://lernia-sjj-assignments.vercel.app/api/challenges"
    );

    if(res.status !== 200){
      setError('Challenges not found', 'white')

    }else{
      hideLoader()
      let data = await res.json();
      allChallenges = data.challenges;

      //sort challenges by rating from high to low
      data.challenges.sort((a, b) => (a.rating > b.rating ? -1 : 1));
      let counter = 0; //How many challenges on first page (should be 3)
      data.challenges.map((challenge) => {
        const host = "http://127.0.0.1:5501/";
        const hostOnline =
          "https://liber09.github.io/EscapeRoomGroupAssignment/";

        //----We are on index page
        if (
          (window.location.href !== host + "challenges.html" && counter < 3) ||
          (window.location.href !== hostOnline + "challenges.html" &&
            counter < 3)
        ) {
          counter++; //count challenges on first page
          addChallengesToDom(challenge);
          setStarRating();
          //----We are on challenges page
        } else if (
          window.location.href === host + "challenges.html" ||
          window.location.href === hostOnline + "challenges.html"
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

//Set the rating stars on the challange cards
function setStarRating() {
  let ratingsUl = document.querySelectorAll("ul.rating");
  for (let j = 0; j < ratingsUl.length; j++) {
    let ratingChil = ratingsUl[j].children;
    let ratingsList = Array.from(ratingChil);

    //the int part of rating value
    let ratingValueInt = Math.floor(ratingsUl[j].getAttribute("aria-valuenow"));
    //the decimal part of rating value
    let ratingValueDecimal = (
      ratingsUl[j].getAttribute("aria-valuenow") % 1
    ).toFixed(1);

    for (let i = 0; i < ratingsList.length; i++) {
      //0-star rated challenge
      if (ratingValueInt == 0) {
        let star = ratingsList[i];
        star.classList.remove("active");
        //0.5 star rated challenge
        if (i == 0 && ratingValueDecimal != 0) {
          star.classList.add("half");
        }
        //1 star rated challenge
      } else if (ratingValueInt == 1) {
        if (i == 1 || i == 2 || i == 3 || i == 4) {
          let star = ratingsList[i];
          star.classList.remove("active");
          //1.5 star rated challenge
          if (i == 1 && ratingValueDecimal != 0) {
            star.classList.add("half");
          }
        }
        //2 star rated challenge
      } else if (ratingValueInt == 2) {
        if (i == 2 || i == 3 || i == 4) {
          let star = ratingsList[i];
          star.classList.remove("active");
          //2.5 star rated challenge
          if (i == 2 && ratingValueDecimal != 0) {
            star.classList.add("half");
          }
        }
        //3 star rated challenge
      } else if (ratingValueInt == 3) {
        if (i == 3 || i == 4) {
          let star = ratingsList[i];
          star.classList.remove("active");
          //3.5 star rated challenge
          if (i == 3 && ratingValueDecimal != 0) {
            star.classList.add("half");
          }
        }
        //4 star rated challenge
      } else if (ratingValueInt == 4) {
        if (i == 4) {
          let star = ratingsList[i];
          star.classList.remove("active");
          //4.5 star rated challenge
          if (ratingValueDecimal != 0) {
            star.classList.add("half");
          }
        }
        //5 star rated challenge
      } else {
        ratingsList[i];
      }
    }
  }
}
