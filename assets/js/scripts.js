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

