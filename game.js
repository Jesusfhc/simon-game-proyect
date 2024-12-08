let buttonsColors = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickerPattron = [];

let gameOn = false;

let level = 0;

function playSound(name) {
    let efecto = new Audio(`sounds/${name}.mp3`);
    efecto.play();
}

function animatePress(currentColor) {
    $("."+currentColor).addClass("pressed");

    setTimeout(function() {
        $("."+currentColor).removeClass("pressed");
    }, 1000);

}

function nextSequence() {

    userClickerPattron = [];

    level++;
    $("h1").text(`Level ${level}`);

    let randomNumber = Math.round(Math.random() * 3);

    let randomChosenColor = buttonsColors[randomNumber];

    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
    animatePress(randomChosenColor);
    
}

function chekAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickerPattron[currentLevel]) {
        console.log("success");

        if (userClickerPattron.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
             }, 2000);
        }
    } else {
        
        let wrong = new Audio("sounds/wrong.mp3");
        wrong.play();

        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, Press Any Key to Restart");
        
        startOver();
    }
    
}

function startOver() {
    level = 0;
    gamePattern = [];
    gameOn = false;
}

$(".btn").click(function(event) {
    let userChosenColor = event.target.id;

    playSound(userChosenColor);
    animatePress(userChosenColor);

    userClickerPattron.push(userChosenColor);
   
    chekAnswer(userClickerPattron.length - 1);
    
})

$(document).keydown(function() {
    if (gameOn === false) {
        gameOn = true;
        nextSequence();
    }
})
