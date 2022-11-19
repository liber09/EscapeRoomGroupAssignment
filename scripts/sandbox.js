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
 class UI {
    addChallengesToDom(challange){
        

    }

 }

// get alll challenges 

async function getChallenges(){

    try {

        let res = await fetch('https://lernia-sjj-assignments.vercel.app/api/challenges')
        if(res.ok){
            let data = await res.json()
           // addChallengesToDom(data)
            console.log('data',data)
        }
      
    } catch (error) {
        console.log(error)
        
    }

}
getChallenges()


// event listeners