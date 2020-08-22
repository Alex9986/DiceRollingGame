/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, isGamePlaying, previousDice;

init();

document.querySelector(".btn-roll").addEventListener("click", function(){ // rolling the dice
    if(isGamePlaying){
        var dice1 = Math.floor(Math.random() * 6 + 1); // random number
        var dice2 = Math.floor(Math.random() * 6 + 1); // random number
//        var diceDOM = document.querySelector(".dice");
//        diceDOM.style.display = "block";
        document.getElementById("dice-1").style.display = "block";
        document.getElementById("dice-2").style.display = "block";
        document.getElementById("dice-1").src = "dice-" + dice1 + ".png";
        document.getElementById("dice-2").src = "dice-" + dice2 + ".png";
    
//        if(dice === 6 && previousDice === 6){ // two 6 in a row
//            scores[activePlayer] = 0; // player looses all score
//            document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
//            nextPlayer();
//        } else 
        
        if(dice1 !== 1 && dice2 !== 1){
            roundScore += dice1 + dice2;
            
            document.querySelector("#current-" + activePlayer).innerHTML = "<em>" + roundScore + "</em>";
        } else {
            nextPlayer();
        }
        previousDice = dice1 + dice2;
    }
});

document.querySelector(".btn-hold").addEventListener("click", function(){ // holding the score
    if(isGamePlaying){
        scores[activePlayer] += roundScore;
        document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
        
        var input = document.querySelector(".final-score").value;
        var winningScore
        
        if(input){ // if there is a valid winning score 
            winningScore = input;
        } else {
            winningScore = 100;
        }
        
        if(scores[activePlayer] >= winningScore){
            document.getElementById("dice-1").style.display = "none";
            document.getElementById("dice-2").style.display = "none";
            document.querySelector("#name-" + activePlayer).textContent = "Winner!";
            document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
            document.querySelector(".player-" + activePlayer + "-panel").classList.remove("winner");
            isGamePlaying = false;
        } else {
            nextPlayer();
        }
    }
});

function nextPlayer(){ // switch player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
        
//        document.querySelector(".player-0-panel").classList.remove("active");
//        document.querySelector(".player-1-panel").classList.add("active");
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");
    document.getElementById("dice-1").style.display = "none";
    document.getElementById("dice-2").style.display = "none";
}

document.querySelector(".btn-new").addEventListener("click", init);

function init(){
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    isGamePlaying = true;
    document.getElementById("dice-1").style.display = "none";
    document.getElementById("dice-2").style.display = "none";
    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
    document.getElementById("name-" + 0).textContent = "Player 1";
    document.getElementById("name-" + 1).textContent = "Player 2";
    document.querySelector(".player-" + 0 + "-panel").classList.remove("winner");
    document.querySelector(".player-" + 1 + "-panel").classList.remove("winner");
    document.querySelector(".player-" + 0 + "-panel").classList.remove("active");
    document.querySelector(".player-" + 1 + "-panel").classList.remove("active");
    document.querySelector(".player-" + 0 + "-panel").classList.add("active");
}


//document.querySelector("#current-" + activePlayer).textContent = dice;
//document.querySelector("#current-" + activePlayer).innerHTML = "<em>" + dice + "</em>";

