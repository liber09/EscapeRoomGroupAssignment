
  let  list = document.querySelector('.challenge-list')


// create a class as a blueprint
 class Challenges {
    constructor(title,description,type,minParticipants,maxParticipants,rating,imageUrl,tags){
        this.title = title;
        this.description = description;
        this.typ = type;
        this.minParticipants = minParticipants;
        this.maxParticipants = maxParticipants;
        this.rating = rating;
        this.imageUrl = imageUrl;
        this.tags = tags;

    }
 }

 // class for the ui

    function addChallengesToDom(challenge){
      
       list.innerHTML+= `
        <li class="challenge-item">
          <img class="challenge-image" alt="Hacker" src=${challenge.image} />
          <h3 class="challenge-title">${challenge.title} (${challenge.type})</h3>
          <ul
            role="meter"
            class="rating"
            aria-label="rating"
            arial-valuemin="0"
            aria-valuemax="5"
            aria-valuenow="4"
            aria-valuetext=${challenge.rating}
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
        
        `
    
      

    }

 

// get alll challenges 

async function getChallenges(){

    try {

        let res = await fetch('https://lernia-sjj-assignments.vercel.app/api/challenges')
        if(res.ok){
            let data = await res.json()
            //challenges = data
            data.challenges.slice(0, 10).map(challenge => {

                addChallengesToDom(challenge)
                console.log('challenge',challenge)
            })
        }
      
    } catch (error) {
        console.log(error)
        
    }

}
getChallenges()


// event listeners