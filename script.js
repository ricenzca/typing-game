window.onload = function () {
}

//Sort the words from short to long
let wordLibrary = data;
wordLibrary.sort(function(a, b){
  return a.length - b.length;
});
// console.log (wordLibrary);

//Groups the words according to the number of letters into corresponsing arrays
let fourToFive = wordLibrary.filter(value => value.length>3 && value.length<6);
let sixToSeven = wordLibrary.filter(value => value.length>5 && value.length<8);
let eightToTen = wordLibrary.filter(value => value.length>7 && value.length<11);
let ElevenAndAbove = wordLibrary.filter(value => value.length>11)

//Generates random word
let randomWord = "";
function generateRandomWord(array) {
    lengthArray = array.length;
    var randomNumber = Math.floor(Math.random()*lengthArray);
    randomWord = array[randomNumber];
    array.splice(randomNumber,1);
    console.log(randomWord);
    console.log(typeof randomWord);
}

//Increase word length to increase game difficulty
function increaseWordLength() {
    if (correctArray.length < 3) {
        generateRandomWord(fourToFive);
    }
    else if (correctArray.length < 6) {
        generateRandomWord(sixToSeven);
    }
    else if (correctArray.length < 9) {
        generateRandomWord(eightToTen);
    }
    else if (correctArray.length >=9) {
        generateRandomWord(ElevenAndAbove);
    }
}

let duration = 4;
let ticker = 0;
let k=0;
const counter = document.querySelector(".counter");
function tickerController () {
    if (ticker===0) {
        ticker = duration;
        counter.innerHTML = "Time left: "+ticker;
        // console.log("ticker1: "+ticker);
        if (k===0) {
            countdownInterval = setInterval(countdown, 1000);
            k++;
        }
    }
    function countdown () {
        ticker--;
        counter.innerHTML = "Time left: "+ticker;
        // console.log("ticker2: "+ticker);
    }
}

//removes the words from display and input box
let word = {};
function clearWord () {
        word.remove();
        input.value = "";
    }

//Populates random word when game starts
let wordArray = [];
function displayWord () {
    wordArray.push(randomWord);
    console.log("word array 1: "+wordArray);
    word = document.createElement("div");
    word.classList = "word";
    word.innerHTML = wordArray[0];
    // console.log("word div: "word);
    wordOnDisplay = document.querySelector(".word-on-display");
    wordOnDisplay.appendChild(word);
    wordOnDisplay.classList.add("animate");
    tickerController();
}

//Checks when timer expires and check when game is over
let wrongArray = [];
let i=0;
let l=0;
function gameCheck () {
    if (i===0 && l!==0) {
        clearWord();
    }
    if (wrongArray.length!==4) {
        if (i!==0) {
            clearWord();
            wrongArray.push(wordArray.shift());
            updateScore();
            console.log("wrong array: "+wrongArray);
            console.log("word array 2: "+wordArray);
        }
        i++;
        l++;
        increaseWordLength();
        displayWord();
    }
    else if (wrongArray.length===4) {
        clearWord();
        wrongArray.push(wordArray.shift());
        updateScore();
        clearInterval(wordInterval);
        input.remove();
        counter.remove();
        clearInterval(countdownInterval);
        brainLiner.innerHTML = "-GAME OVER-<br>Refresh to play again"
        brainLiner.style.visibility = "visible";
        return;
        }
}


//Checks whether user input is correct
let correctArray = [];
let entry = "";
const input = document.querySelector("#input");
function checkEntry() {
    entry = input.value;
    if (entry === wordArray[0]) {
        i=0;
        input.value = "";
        correctArray.push(entry);
        wordArray.shift();
        updateScore();
    }
    console.log("correct array: "+correctArray);
}
document.querySelector('#submit').addEventListener('click', checkEntry);


//Clears placeholder of input when in focus
input.addEventListener("focus", function () {input.placeholder = "";});
input.addEventListener("blur", function () {input.placeholder = "Type here and hit enter!";});


//Allows player to hit enter to submit in text box
input.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("submit").click();
    }
});


//Displays the current score
function updateScore () {
    score = document.querySelector(".score")
    score.style.padding = "10px";
    score.innerHTML= "Your score: "+correctArray.length+"<br>Words missed: "+wrongArray.length+"/5";
}


//Displays and hides introduction liners, and initiate the game after the intro
const instructions = document.querySelector(".instructions");
const pinkyLiner = document.querySelector(".pinkyLiner")
const brainLiner = document.querySelector(".brainLiner")
introArray = [pinkyLiner, brainLiner,instructions];
let j=0;
introInterval = setInterval(intro, 1000);
function intro () {
    if (j!==2) {
        introArray[j].style.visibility = "hidden";
        introArray[j+1].style.visibility = "visible";
        j++;
    }
    else if (j===2) {
        introArray[j].style.visibility = "hidden";
        clearInterval(introInterval);
        //starts the game and controls the interval where words appear
        input.style.visibility = "visible";
        input.focus();
        gameCheck();
        updateScore();
        wordInterval = setInterval(gameCheck, duration*1000);
    }
}


// <animation>words move out of brain's mouth, moves from right to left, towards pinky

// if user types the word and hits enter by before the word reaches pinky, the words will reach pinky and pinky will comprehend it(nod or smth)

// <animation>when user does not type the word and hit enter by the time the word reaches pinky, the words bounces off pinky

// starting with single words, and speed of words generation will become faster

// time for user to type 5 seconds


// create array of words, sort from length short to long

// array shift first word into another array which will appear on screen and move towards pinky within 5sec

// if user types the words within 5s and hit enter, the word will be shifted out of the array into a completed array (show count/score on screen)
//     otherwise word will be shifted after 5s into an uncompleted array, if count reaches a certain number(5/10) game ends and will show your typing speed(per min)

// (increase difficulty) after every 5 words, either shift to a more lengthy array of words

// const numBox = 800*600/400;
// console.log(numBox);

// let gameframe = document.querySelector(".gameframe");
// for (i=0; i<numBox; i++) {
//     var grid = document.createElement("div");
//     grid.className = "box";
//     grid.id = i;
//     grid.style.backgroundColor = "none";
//     grid.style.border = "solid rgba(0,0,0,0) 1px";
//     grid.style.width = "18px";
//     grid.style.height = "18px";
//     grid.style.display = "flex";
//     grid.style.alignItems = "center";
//     grid.style.justifyContent = "center";
//     grid.innerHTML = i;
//     grid.style.color = "rgba(255,255,255,0)";
//     grid.style.fontSize = "8px";
//     gameframe.appendChild(grid);
// }


// https://github.com/bevacqua/correcthorse/blob/master/wordlist.json