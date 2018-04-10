/**
 *
 * Main Variables
 *
 */

	let card = document.getElementsByClassName("card");
	let cards = [...card];
	const deck = document.querySelector('.deck'); 
	let openedCards = [];
	let moves = 0;
	let moveCounter = document.querySelector(".moves");
	let matchedCard = document.getElementsByClassName("match");
	let second = 0, minute = 0; hour = 0;
	let timer = document.querySelector(".timer");
	let interval; 
	let stars = document.querySelectorAll(".fa-star"); 
	let modal = document.querySelector('.modal');
	let closeicon = document.querySelector(".close");
	let restartGame = document.querySelector(".restart"); 
	let pAgain = document.querySelector(".btn.playagain");

/**
 *
 * Shuffle Function
 *
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

/**
 *
 * Start Game Function
 *
 */

	function startGame (){
	 	openedCards = [];
	 	cards = shuffle(cards);

	 	for (let i = 0 ;i< cards.length; i++) {

	 		deck.innerHTML = "";
	 		[].forEach.call(cards, function(item) {
	 			deck.appendChild(item);
	 		});

	 		cards[i].classList.remove("show", "open", "match","disabled");
	 	}
	 	resetMoves();
	 	resetRate();
	 	resetTime();
	}

/**
 *
 * Toggle Classes Function
 *
 */

	var openCard = function(){

	 	this.classList.toggle("open");
	 	this.classList.toggle("show");

	}

/**
 *
 * Main Event Listener 
 *
 */

	for (var i = 0; i < cards.length; i++){

		card = cards[i];
		card.addEventListener("click", openCard);
		card.addEventListener("click", openCards);
		card.addEventListener('click',openModal);

	}

/**
 *
 * Open Card Function
 *
 */

	function openCards(){
		openedCards.push(this);
		let cardLength = openedCards.length;

		if (cardLength === 1) {
			movesCounter();
		}
		else if(cardLength === 2){
			
			if(openedCards[0].innerHTML === openedCards[1].innerHTML){
				matched();
			}else{
				unmatched();
			}
		}
	}

/**
 *
 * Match , Unmatch , Disable , Enable Functions
 *
 */

	function matched(){
		openedCards[0].classList.add('match','disabled');
		openedCards[1].classList.add('match','disabled');
		openedCards[0].classList.remove("show", "open");
		openedCards[1].classList.remove("show", "open");
		openedCards = [];
	}


	function unmatched(){
		disabled();
		setTimeout(function() {
			openedCards[0].classList.remove("show", "open");
			openedCards[1].classList.remove("show", "open");
			enable();
			openedCards = [];
		}, 800);

	}

	function disabled(){
		for(var i = 0; i < cards.length; i++){
			card.classList.add('disabled');
		}

	}

	function enable(){
		for(var i = 0; i < cards.length; i++){
			card.classList.remove('disabled');
		}

		for(var i = 0; i < matchedCard.length; i++){
			matchedCard[i].classList.add("disabled");
		}
	}

/**
 *
 * Move Counter Function
 *
 */

	function movesCounter(){
		moves++;
		moveCounter.innerHTML = moves;
		if(moves == 1){
			second = 0;
			minute = 0; 
			hour = 0;
			startTimer();
		}
		rating();
	}	

/**
 *
 * Timer Function
 *
 */
	
	function startTimer(){
		interval = setInterval(function(){
			second++;
			timer.innerHTML = minute+"mins "+second+"secs";
			
			if(second == 60){
				minute++;
				second=0;
			}
			if(minute == 60){
				hour++;
				minute = 0;
			}
		},1000);
	}

/**
 *
 * Rating Function
 *
 */


	function rating(){


		if (moves > 8 && moves < 12){
			
			for (var i = 0; i < 5 ; i++) {
				if (i >3){
					stars[i].classList.remove('fa-star'); 
				}
				
			}		

		}else if(moves > 12 && moves < 18){
			for (var i = 0; i < 4 ; i++) {
				if (i >2){
					stars[i].classList.remove('fa-star'); 
				}
				
			}
		}else if(moves > 18){
			for (var i = 0; i < 3 ; i++) {
				if (i >1){
					stars[i].classList.remove('fa-star'); 
				}
				
			}
		}
	}

/**
 *
 * Reset Moves , Time and Rate Functions
 *
 */
		

	function resetMoves(){
		moves = 0;
		moveCounter.innerHTML = moves;
	}

	function resetTime(){
		second = 0, minute = 0; hour = 0;
		timer.innerHTML = minute+"mins "+second+"secs";
		clearInterval(interval);
	}

	function resetRate(){
		for (var i = 0; i < 5 ; i++){
			if(i>0){
				stars[i].classList.add('fa-star');
			}
		}
	}

/**
 *
 * Restart Button Function
 *
 */

	restartGame.addEventListener("click", startGame);
	// function restart(){
	// 	startGame();
	// }

/**
 *
 * Modal
 *
 */

	function openModal(){
		if(matchedCard.length == 16){
			clearInterval(interval);
			 modal.style.display = "block";

			 let starFinal = document.querySelector(".stars").innerHTML;
			 document.querySelector('.totalRating').innerHTML = starFinal ;

			 let finalMove = document.querySelector(".moves").innerHTML;
			 document.querySelector('.totalMoves').innerHTML = finalMove;

			 let finalTime = document.querySelector(".timer").innerHTML;
			 document.querySelector('.totalTime').innerHTML = finalTime;
			 closeModal();
			 playAgain();
		};
	}

	function closeModal(){
    	closeicon.addEventListener("click", function(e){
	        modal.style.display = "none";
	        startGame();
    	});
	}

	function playAgain(){
	    pAgain.addEventListener("click" , function(e){
	    	modal.style.display = "none";
	   		startGame();
	    });
	}
