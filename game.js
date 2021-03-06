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
    gamePattern = [];
    $("h1 #level-title").text("Level " +level);
    nextSequence();
    started = true;
    $("#start").addClass("display-off");
  }
}

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

      $("body").addClass("game-win");
      setTimeout(function(){
        $("body").removeClass("game-win");
      }, 200);

      var audio = new Audio("sounds/vittoria.mp3");
      audio.play()

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

    $("#level-title").text("Game Over! Score: Level " +gamePattern.length);

    startOver();
  }
}

function startOver(){

  level =0;
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


// Istruzioni

$(".open-instruction").click(function(){
  $(".overlay").css("height", "100%");
});

$(".close-instruction").click(function(){
  $(".overlay").css("height", "0");
});
