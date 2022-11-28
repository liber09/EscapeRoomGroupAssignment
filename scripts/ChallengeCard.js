//Constructor for ChallengeCard object to be used as a blueprint
function ChallengeCard(
  id,
  type,
  title,
  description,
  minParticipants,
  maxParticipants,
  rating,
  image,
  labels
) {
  this.id = id;
  this.type = type;
  this.title = title;
  this.description = description;
  this.minParticipants = minParticipants;
  this.maxParticipants = maxParticipants;
  this.rating = rating;
  this.image = image;
  this.labels = labels;
}

async function loadChallenges() {
  const res = await fetch(
    "https://lernia-sjj-assignments.vercel.app/api/challenges"
  );
  const data = await res.json();
  console.log(data);
}
loadChallenges();
/*

  const challenges = [];
  for (let i = 0; i < data.challenges.length; i++) {
    challenges[i] = new ChallengeCard(data.challenges[i]);
  }
  return challenges;



loadChallenges().then((data) => {
  data.challenges.forEach((challenge) => {
    challenge = new ChallengeCard(
      "`${challenge.id}`",
      "`${challenge.type}`",
      "`${challenge.title}`",
      "`${challenge.description}`",
      "`${challenge.minParticipants}`",
      " `${challenge.maxParticipants}`",
      "`${challenge.rating}`",
      "`${challenge.image}`",
      "`${challenge.labels}`"
    );
  });
  console.log(ChallengeCard);

  //data.challenges.forEach((challenge) => {
  //challenge = new ChallengeCard();
  //});
}); */
