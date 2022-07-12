const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickPattern = [];
let level = 0;
let started = false

// User press Anykey to start the Game
$(document).on("keydown", function() {

     if (!started) {
        $("#level-title").text("level = " + level);
        newSequence();
        started = true;
    } 
    
})

// New Sequency
function newSequence () {
    userClickPattern = [];
    level++;
    $("#level-title").text("level = " + level);
    const randomNumber = Math.floor(Math.random()*4);
    const randomChosenColours = buttonColors[randomNumber];
    gamePattern.push(randomChosenColours)
    $("#" + randomChosenColours).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    
    playSound(randomChosenColours)
}

// User Click Button to chose the colour

$(".btn").on("click", function (event) {
    const userChosenColours = event.target.id
    userClickPattern.push(userChosenColours)
    playSound(userChosenColours)
    animatePress(userChosenColours)
    checkAnswer(userClickPattern.length-1)
    console.log(userClickPattern)
    console.log(gamePattern)
    
})

//Play Sound
function playSound (name) {
    new Audio("sounds/" + name + ".mp3").play()
}

//Animate Button
function animatePress (currentColour) {
    $("#" + currentColour).addClass("pressed")
    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed")
    }, 
    100);
};

// Checking an Answer
function checkAnswer (currentLevel) {
    if(userClickPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("s")
        if(userClickPattern.length === gamePattern.length) {
            setTimeout(() => {
                newSequence()
            }, 1000);
        }
    } else {
        new Audio("sounds/wrong.mp3").play();
        $("body").addClass("game-over");
        setTimeout(() => {
               $("body").removeClass("game-over") 
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver()
    }
}

// Restart the Game
function startOver () {
    level = 0;
    gamePattern = [];
    started = false;
}   




