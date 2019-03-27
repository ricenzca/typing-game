window.onload = function () {

let wordLibrary = data;

//Groups the words according to the number of letters into corresponding arrays
function generateWordArray () {
    fourToFive = wordLibrary.filter(value => value.length>3 && value.length<6);
    sixToSeven = wordLibrary.filter(value => value.length>5 && value.length<8);
    eightToTen = wordLibrary.filter(value => value.length>7 && value.length<11);
    elevenAndAbove = wordLibrary.filter(value => value.length>11)
}
generateWordArray();

//Generates random word and removes that word from source array
let randomWord = "";
function generateRandomWord(array) {
    lengthArray = array.length;
    let randomNumber = Math.floor(Math.random()*lengthArray);
    randomWord = array[randomNumber];
    array.splice(randomNumber,1);
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
        generateRandomWord(elevenAndAbove);
    }
}

//Displays and hides introduction liners, and initiate the game after the intro
const instructions = document.querySelector(".instructions");
const pinkyLiner = document.querySelector(".pinkyLiner")
const brainLiner = document.querySelector(".brainLiner")
const startButton = document.querySelector("#start-game");
introArray = [pinkyLiner, brainLiner,instructions, startButton];
let i=0;
function intro () {
    if (i!==3) {
        introArray[i].style.visibility = "hidden";
        introArray[i+1].style.visibility = "visible";
        i++;
    }
    else if (i===3) {
        clearInterval(introInterval);
    }
}
introInterval = setInterval(intro, 500);


//Starts the game
startButton.addEventListener('click', startGame);
function startGame () {
    startButton.style.visibility = "hidden";
    input.style.visibility = "visible";
    input.focus();
    if (numberOfWordsDisplayed===0) {tickerController();}
    gameInterval = setInterval(tickerController, 1000);
}

//To restart the game
function restartGame () {
    brainLiner.style.visibility = "hidden";
    brainLiner.innerHTML = "Brain: The same thing we do every night, Pinky -<br> try to take over the world!";
    generateWordArray();
    numberOfWordsDisplayed = 0;
    ticker = 0;
    wordArray = [];
    missedArray = [];
    correctArray = [];
    startGame();
    input.style.visibility = "visible";
    counter.style.visibility = "visible";
}


//Main function which moderates the game
let duration = 4;
let ticker = 0;
let inputCorrect = "no";
let missedArray = [];
const counter = document.querySelector(".counter");
function tickerController () {
    //Starts the game
    if (numberOfWordsDisplayed===0 && ticker===0) {
    ticker = duration;
    updateTicker();
    updateScore();
    increaseWordLength();
    displayWord();
    }
    //Moderates the subsequent rounds of the game
    else if (numberOfWordsDisplayed!==0 && ticker===0) {
        if (inputCorrect==="no") {
            // change ending animation of word and remove word from display after 1s
            firstWord = document.querySelector(".word");
            console.log(firstWord);
            firstWord.style.webkitAnimationName = "bounceoff";
            setTimeout(removeWord, 1000);
            //Clears input box;
            input.value = "";
            //push word into missed array and update scoreboard
            missedArray.push(wordArray.shift());
            console.log("missed array: "+missedArray);
            updateScore();
            //Checks if game has ended
            if (checkGameEnd()==true) {
                return;
            } else {
                increaseWordLength();
                displayWord();
                ticker = duration;
                updateTicker();
            }
        } else if (inputCorrect==="yes") {
            // change ending animation of word and remove word from display after 1s
            firstWord = document.querySelector(".word");
            setTimeout(removeWord, 1000);
            //generate new word and display
            increaseWordLength();
            displayWord();
            //reset ticker
            ticker = duration;
            updateTicker();
            inputCorrect = "no";
        }
    } else {
        updateTicker();
    }
}


//removes word from display
function removeWord () {
    firstWord.remove();
}


//Updates the ticker
function updateTicker () {
    counter.innerHTML = "Time left: "+ticker;
    ticker--;
}


//Populates random word when game starts
let wordArray = [];
let numberOfWordsDisplayed=0;
const wordOnDisplay = document.querySelector(".word-on-display");
function displayWord () {
    wordArray.push(randomWord);
    word = document.createElement("div");
    numberOfWordsDisplayed++;
    word.id = numberOfWordsDisplayed;
    word.innerHTML = wordArray[0];
    word.classList = "word";
    wordOnDisplay.appendChild(word);
}


//Checks whether user input is correct
let correctArray = [];
let entry = "";
const input = document.querySelector("#input");
function checkInput() {
    entry = input.value;
    if (entry === wordArray[0]) {
        inputCorrect = "yes";
        input.value = "";
        correctArray.push(entry);
        console.log("correct array: "+correctArray);
        wordArray.shift();
        updateScore();
    }
}


//Allows player to hit enter to submit in text box
input.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        checkInput();
    }
});


//Clears placeholder of input when in focus
input.addEventListener("focus", function () {input.placeholder = "";});
input.addEventListener("blur", function () {input.placeholder = "Type here and hit enter!";});


//Displays the current score
function updateScore () {
    score = document.querySelector(".score")
    score.style.padding = "15px";
    score.innerHTML= "Your score: "+correctArray.length+"<br>Words missed: "+missedArray.length+"/5";
}


// //Checks when game is over
function checkGameEnd () {
    if (missedArray.length===5) {
        clearInterval(gameInterval);
        setTimeout(removeWord, 1000);
        brainLiner.style.zIndex = "1";
        brainLiner.addEventListener('mouseover',function () {
        brainLiner.classList.add("mouseover");
            });
        input.style.visibility = "hidden";
        counter.style.visibility = "hidden";
        brainLiner.innerHTML = "-GAME OVER-<br>Click here to play again";
        brainLiner.style.visibility = "visible";
        brainLiner.addEventListener('click',restartGame)
        return true;
    }
}

//Sort the words from short to long
// wordLibrary.sort(function(a, b){
//   return a.length - b.length;
// });
// console.log (wordLibrary);

}