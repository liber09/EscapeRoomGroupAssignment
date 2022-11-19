
  let  list = document.querySelector('.challenge-list')


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
            aria-valuetext= ${getRatings(challenge.rating)}
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
            let ratingsArray =[]
          
            for(let ratingEl of data.challenges){
                ratingsArray.push(ratingEl.rating)
              
            }

            let maxRating = Math.max(...ratingsArray)
          
            data.challenges.map(challenge => {

                if(window.location.href === 'http://127.0.0.1:5501/index.html'){
                    if(challenge.rating === maxRating && challenge.maxParticipants>=7){
                        addChallengesToDom(challenge)
                          
                    }

                }else if(window.location.href === 'http://127.0.0.1:5501/challenges.html'){
                    addChallengesToDom(challenge)
                }
   
            })
        }
      
    } catch (error) {
        console.log(error)
        
    }

}
getChallenges()


// get ratings

function getRatings (challenge){
    console.log('challenge', challenge)
    let ratingList = document.querySelectorAll('li.rating-star')
   
   console.log('ratinglist',ratingList)
    
    for(let i = 0; i<ratingList.length; i++){
       if(challenge === 0){
        ratingList[i].classList.remove('active')
       }else if(challenge === 1){
        ratingList[1][2][3][4].classList.remove('active')

       }else if(challenge=== 2){
        
        ratingList[2][3][4].classList.remove('active')

       }else if(challenge=== 3){
        ratingList[3][4].classList.remove('active')

       }else if(challenge === 4){
        ratingList[4].classList.remove('active')
    }else{
        ratingList[i]
    }
        
}
   
   
}




