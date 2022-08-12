const cards = document.querySelectorAll(".card");
let flippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

function flipCard(){
  if(lockBoard) return;
  if(this === firstCard) return;
  
  this.classList.add("flip");
  if(!flippedCard){
    flippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  flippedCard = false;
  checkForMatch();
}

function checkForMatch(){
  if(firstCard.dataset.card === secondCard.dataset.card){
    disabledCard();
    return;
  }

  unflipCard();
}

function disabledCard(){
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

function unflipCard(){
  lockBoard = true;
  
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 1500);
}

function resetBoard(){
  [flippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle(){
  cards.forEach((card) => {
    let randomPosition = Math.floor(Math.random() * 12);
    card.style.order = randomPosition;
  })
})();

cards.forEach((card) => {
  card.addEventListener("click", flipCard)
})