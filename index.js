var buttonColors = ["green", "red", "yellow", "blue"];
var computerTurn = [];
var userTurn = [];
var gameStarted = false;
var level = 0;


var levelDisplay = document.querySelector(".level-display");

var buttons = document.querySelectorAll(".btn");



function started() {
  if(!gameStarted){
    startTheGame();
  }
}

var startButton = document.querySelector(".start-btn").addEventListener("click", started);

function startTheGame(){
  
  computerTurn = [];
  gameStarted = true;
  generateRandomColor();
  
}

function generateRandomColor(){

  userTurn = [];
  level++;
  levelDisplay.textContent = `Level: ${level}`;

  var randomColor = buttonColors[Math.floor((Math.random() * 4))];
  computerTurn.push(randomColor);
  flashColor(randomColor);
  playAudio(randomColor);
}

function userClick(){
  if(!gameStarted) return;
 
  var userColor = this.classList[1];
 
  userTurn.push(userColor);
  playAudio(userColor);
  checkAnswer(userTurn.length - 1);
}


for( var i = 0; i < buttons.length; i++ ){

  buttons[i].addEventListener("click", userClick);

}


function checkAnswer(currentIndex){
  if(computerTurn[currentIndex] === userTurn[currentIndex]){
    if(userTurn.length === computerTurn.length){
      setTimeout(generateRandomColor, 1000);
    }
  }
  else{
    gameOver();
  }
}

function gameOver(){
  playAudio("wrong");

  document.body.classList.add("game-over");
  levelDisplay.textContent = `Game Over! Click Start To Play Again.`;
  gameStarted = false;
  level = 0;
  setTimeout(function(){
    document.body.classList.remove("game-over");
  }, 200);
}


var audio = {
  green: "sounds/green.mp3",
  red: "sounds/red.mp3",
  yellow: "sounds/yellow.mp3",
  blue: "sounds/blue.mp3",
  wrong: "sounds/wrong.mp3"
};

function playAudio(color){
  var soundURL = audio[color];
  if(soundURL){
    var audio1 = new Audio(soundURL);
    audio1.play();
  }

}

function flashColor(color){
  var button = document.querySelector("." + color);
  button.classList.add("active");
  setTimeout(function() {
    button.classList.remove("active");
  }, 200);
}
