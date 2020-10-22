const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");
const countdownBoard = document.querySelector(".countdown");
const startButton = document.querySelector(".startButton");

/*  Use let keyword
because the values will be dynamically changed,
deleted and replaced as the game runs

let and const keywords exist in block scope only,
which means they exist only in a single set of curly braces
*/
let lastHole;
let timeUp = false;
let timeLimit = 20000;
let score = 0;
let countdown;

function pickRandomHole(){
    /* Because there are sixes holes, the randomHole variable
    will return a random number between 0 and 5 (1 - 6)
    As we need whole numbers, not decimals, we wrap the Math.random()
    in Math.floor which will round the numbers down
    */
    const randomHole = Math.floor(Math.random() * holes.length);
    const hole = holes[randomHole];     // randomly picks one of the six available holes
    /* We want to make sure that
    the new hole is different than the previous one,
    so the mole doesn't appear in the same place twice
    */
    if (hole === lastHole) {
        // if the same hole is selected, it will run again to pick a different one
        return pickRandomHole(hole);    
    }
    /*If the same hole was picked, then the if statement will be skipped and 
    the function will keep running
    So here, lastHole = hole so that
    we can compare the next one against it
    */
    lastHole = hole;
    return hole;
}

/* This function will choose a random time in milliseconds
and add class 'up' to the currently selected hole, which will animate the mole up.

The timeout function will remove the 'up' class after the randomised time to hide the mole.
*/
function popOut() {
    const time = Math.random() * 1300 + 400;    // random hnumber between 400 and 1700 milliseconds
    const hole = pickRandomHole(holes) // notice this is not the same variable as line 27, because const and let are block scope
    hole.classList.add("up");
    /* setTimeout expects two functions:
    the function we want to call, and how long to wait until we call it
    */
    setTimeout(function() {
        hole.classList.remove("up")     // make the child mole slide back down
        if (!timeUp) {              // if timeUp is false 
            popOut();
        }
    }, time);
}

function startGame() {
    countdown = timeLimit/1000;     // timeLimit is set to 20000 milliseconds, which is 20 seconds
    scoreBoard.textContent = 0;
    scoreBoard.style.display = "block";     // will make the score invisible until starting the game
    countdownBoard.textContent = countdown;
    timeUp = false;     // in case it was set to true in the previous game
    score = 0;      // to reset the game score if the player wants to play again
    popOut();
    setTimeout(function() {
        /* This will cause the if statement on line 59 to fail
        and will stop the next mole from popping up */
        timeUp = true;  
    }, timeLimit);

    /* setInterval is similar to setTimeout,
    but setTimeout takes two arguments: callback function and a value in milliseconds -
    how LONG to WAIT before we run that code.
    setInterval also takes 2 arguments: callback function and a value in milliseconds -
    how OFTEN to run it.

    setTimeout will run its function once,
    but setInterval will run its code over and over until we call
    clear interval
    */
    let startCountdown = setInterval(function(){
        countdown -= 1;     // 20 19 18 17 ...
        // as each down countdown value changes, we want that value to be displayed
        countdownBoard.textContent = countdown;  
        // don't want negative numbers
        if (countdown < 0) {
            countdown = 0;
            /*  for clearInterval, you need to pass it a reference to the 
            interval you want to clear - which is why we have created a variable
            called startCountdown on line 89, to keep this entire interval in a variable
            */
            clearInterval(startCountdown);
            countdownBoard.textContent = "Time's Up! Thank you for protecting our planet!"
        }
    }, 1000);
}

startButton.addEventListener("click", startGame);