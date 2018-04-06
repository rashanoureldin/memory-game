/*
 * Create a list that holds all of your cards
 */
 
 let card = document.getElementsByClassName("card");
 let cards = [...card];
 const deck = document.querySelector('.deck'); 
 let openedCards = [];
 let moves = 0;
 let moveCounter =  document.getElementsByClassName("moves"); 

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

 startGame();

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {

    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
function startGame (){

cards = shuffle(cards);

for (let i = 0 ;i< cards.length; i++) {

 	deck.innerHTML = "";
 	
 	
 [].forEach.call(cards, function(item) {

            deck.appendChild(item);
        });

  cards[i].classList.remove("show", "open", "match");
 };


}

var openCard = function(){

		this.classList.toggle("open");
		this.classList.toggle("show");
		this.classList.toggle("disabled");
}


for (var i = 0; i < cards.length; i++){

   card = cards[i];
   card.addEventListener("click", openCard);
   card.addEventListener("click", openCards);

}

function openCards(){
	openedCards.push(this);
	let cardLength = openedCards.length;
	if(cardLength === 2){
		movesCounter();
		if(openedCards[0].innerHTML === openedCards[1].innerHTML){
			matched();
		}else{
			unmatched();
		}
	}
	

}

function matched(){
	openedCards[0].classList.add('match');
	openedCards[1].classList.add('match');
	openedCards[0].classList.remove("show", "open");
    openedCards[1].classList.remove("show", "open");
    openedCards = [];
}
function unmatched(){
	
	setTimeout(function() {
		openedCards[0].classList.remove("show", "open");
		openedCards[1].classList.remove("show", "open");
		openedCards = [];
	}, 800);

}
function disabled(){

}

function movesCounter(){
	moves++;
	moveCounter.innerHTML = moves;
}	
