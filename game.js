var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var started=false;
var level=0;

$(document).keypress(function(){
  if(!started)
  {
    $("h1").text("Level "+level);
    nextSequence();
    started=true;
  }
});

function nextSequence(){
  userClickedPattern=[];
  level++;
  $("h1").text("Level "+level);
  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColor=buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

$(".btn").click(function (e){
  var userChosenColor=e.target.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
  {
    console.log("success");
    if(userClickedPattern.length===gamePattern.length)
    {
     setTimeout(function (){
       nextSequence();
     },1000);
   }
  }
  else{
    console.log("failed");
    var audio=new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function (){
      $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function playSound(name){
  var audio= new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function (){
    $("#"+currentColor).removeClass("pressed");
  },100);
}

function startOver(){
  gamePattern=[];
  level=0;
  started=false;
}
