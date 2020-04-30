var buttonColour = ["red", "blue", "green", "yellow"];

//Pattern del gioco
var gamePattern = [];

//Sequenza dei click dell'utente
var userClickedPattern = [];

//Se il gioco è startato
var started = false;

//Livello del gioco
var level = 0;

$("#start").click(start);

function start() {
  if(!started){

    var level = 0;
    $("h1").text("Level " +level);
    nextSequence();
    started = true;
    $("#start").addClass("display-off");
  }
}

$(document).keypress(start);

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  var audio = new Audio("sounds/" +userChosenColour +".mp3");
  audio.play();

  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
  if(gamePattern[currentLevel] == userClickedPattern[currentLevel]){
    console.log("Success!");

    if(userClickedPattern.length === gamePattern.length){

      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  }
  else {

    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
  $("#start").removeClass("display-off");
}

function nextSequence() {

  //Reset Pattern
  userClickedPattern = [];

  //Aumento del Livello
  level++;
  $("#level-title").text("Level " +level);

  //Colore casuale
  var randomNumber = Math.floor((Math.random() * 4));
  var randomChosenColour = buttonColour[randomNumber];
  gamePattern.push(randomChosenColour);

  //Effetto Animato
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}

function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {

  $("#" +currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" +currentColour).removeClass("pressed");
  }, 100);
}
