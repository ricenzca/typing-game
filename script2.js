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
let animationDuration = 5;
function increaseWordLength() {
    if (correctArray.length < 3) {
        generateRandomWord(fourToFive);
    } else if (correctArray.length >=3 && correctArray.length < 6) {
        generateRandomWord(sixToSeven);
    } else if (correctArray.length >=6 && correctArray.length < 9) {
        generateRandomWord(eightToTen);
    } else if (correctArray.length >=9 && correctArray.length < 12) {
        generateRandomWord(eightToTen);
        duration = 3;
        animationDuration = 4;
    } else if (correctArray.length >=12 && correctArray.length < 15) {
        generateRandomWord(elevenAndAbove);
        duration = 3;
        animationDuration = 4;
    } else if (correctArray.length >= 15) {
        generateRandomWord(elevenAndAbove);
        duration = 2;
        animationDuration = 3;
    }
}

//Displays and hides introduction liners, and initiate the game after the intro
const instructions = document.querySelector(".instructions");
const pinkyLiner = document.querySelector(".pinkyLiner");
const brainLiner = document.querySelector(".brainLiner");
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
        document.body.addEventListener("keyup", hitEnterStartGame);
        startButton.addEventListener("click", startGame);
    }
}
introInterval = setInterval(intro, 500);


//Starts the game
const theme = new Audio("sounds/theme.mp3");
startButton.addEventListener("click", startGame);
function startGame () {
    startButton.style.visibility = "hidden";
    input.style.visibility = "visible";
    input.focus();
    if (numberOfWordsDisplayed===0) {tickerController();}
    gameInterval = setInterval(tickerController, 1000);
    document.body.removeEventListener("keyup", hitEnterStartGame);
        startButton.removeEventListener("click", startGame);
}


//To restart the game
function restartGame () {
    document.body.removeEventListener("keyup", hitEnterRestart);
    brainLiner.removeEventListener("click", restartGame);
    changeBackground();
    brainLiner.style.visibility = "hidden";
    brainLiner.innerHTML = "Brain: The same thing we do every night, Pinky -<br> try to take over the world!";
    generateWordArray();
    numberOfWordsDisplayed = 0;
    ticker = 0;
    wordArray = [];
    missedArray = [];
    correctArray = [];
    animationDuration = 5;
    duration = 4;
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
const bounceSound = new Audio("sounds/Boing-sound.mp3");
const pinkySound = new Audio("sounds/Oh-very-nice-Brain.mp3");
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
            bounceSound.play();
            // change ending animation of word and remove word from display after 1s
            firstWord = document.querySelector(".word");
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
            pinkySound.play();
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
    //Adjusts animation duration according to duration for input
    switch (animationDuration) {
        case 5:
            word.style.webkitAnimationDuration = "5s";
            break;
        case 4:
            word.style.webkitAnimationDuration = "4s";
            break;
        case 3:
            word.style.webkitAnimationDuration = "3s";
            break;
    }
    wordOnDisplay.appendChild(word);
}


//Checks whether user input is correct
let correctArray = [];
let entry = "";
const input = document.querySelector("#input");
const dingDongSound = new Audio("sounds/Ding-dong-chime.mp3")
function checkInput() {
    entry = input.value;
    if (entry === wordArray[0]) {
        inputCorrect = "yes";
        input.value = "";
        correctArray.push(entry);
        console.log("correct array: "+correctArray);
        wordArray.shift();
        updateScore();
        dingDongSound.play();
    }
}


//Allows player to hit enter to submit in text box
input.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        checkInput();
    }
});


//Allows player to hit enter to start game
function hitEnterStartGame(event) {
            event.preventDefault();
            if (event.keyCode === 13) {
                startGame();
            }
        }

//Allows player to hit shift to restart game
function hitEnterRestart(event) {
            event.preventDefault();
            if (event.keyCode === 16) {
                restartGame();
            document.body.removeEventListener("keyup", hitEnterRestart);
            }
        }


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
const gameOverSound = new Audio("sounds/game-over.mp3");
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
        brainLiner.innerHTML = "-GAME OVER-<br>Hit shift or click here to play again";
        brainLiner.style.visibility = "visible";
        document.body.addEventListener("keyup", hitEnterRestart);
        brainLiner.addEventListener("click", restartGame);
        gameOverSound.play();
        return true;
    }
}


//Changes background when game restarts
function changeBackground () {
    const gameframe = document.querySelector(".gameframe");
    randomBackgroundNumber = Math.floor(Math.random()*3);
    if (randomBackgroundNumber<1) {
        gameframe.style.background = "url(images/background/library.jpg)";
        gameframe.style.backgroundSize = "cover";
    } else if (randomBackgroundNumber<2) {
        gameframe.style.background = "url(images/background/graveyard.jpg)";
        gameframe.style.backgroundSize = "cover";
    } else if (randomBackgroundNumber<3) {
        gameframe.style.background = "url(images/background/messy-room.jpg)";
        gameframe.style.backgroundSize = "cover";
    }
}


//Sort the words from short to long
// wordLibrary.sort(function(a, b){
//   return a.length - b.length;
// });
// console.log (wordLibrary);

}