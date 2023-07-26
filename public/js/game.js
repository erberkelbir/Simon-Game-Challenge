
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;


$(document).keypress(function() {

    
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();

        started = true;
    }
  });


$(document).click(function (e) { 
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();

        started = true;
    }
    
});
  

$(".btn").click(function (e) { 
    userClickedPattern.push(this.id);
    playSound(this.id);
    animatePress(this.id);
    if (userClickedPattern.length === gamePattern.length){
        if (checkAnswer()){
            userClickedPattern = [];
            setTimeout(function(){
            nextSequence();
            },1000);
        }
        else { 
            $("#level-title").text("Game Over, Press Any Key to Restart");
            $("body").addClass("game-over");
            var wrong = new Audio("sounds/wrong.mp3")
            wrong.play();
            setTimeout(() => {
                $("body").removeClass("game-over");
            }, 100);
            startOver();
            
        }
    }        
});



function nextSequence() {
    level++;
    $("#level-title").text("Level "+ level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    for (let i =0 ; i <gamePattern.length ; i++){     
        
       
        (function(i){
            setTimeout(function(){
                $("#" + gamePattern[i]).fadeIn(100).fadeOut(100).fadeIn(100);
                animatePress(randomChosenColour[i]);
                playSound(gamePattern[i]);
            }, 400*(i+1));
        })(i);
        
    }  
}



function checkAnswer() {
    const len = gamePattern.length;
    if (len !== userClickedPattern.length) {
        // The lengths of the arrays don't match
        return false;
    }
    for (let i = 0; i < len; i++) {
        if (gamePattern[i] !== userClickedPattern[i]) {
        // The values at the same index don't match
        return false;
        }
    }
    return true;
}

function playSound(name) { 
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
 }
 


 function animatePress(currColour){
    $("#"+ currColour).addClass("pressed");
    
    setTimeout(function(){
        $("#"+currColour).removeClass("pressed");
       },100);
    

 }

 function startOver(){
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    started = false;
 }

 