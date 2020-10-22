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
