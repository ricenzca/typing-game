window.onload = function () {

}

wordLibrary = [];

const numBox = 800*600/400;
console.log(numBox);

// let gameframe = document.querySelector(".gameframe");
// for (i=0; i<numBox; i++) {
//     var grid = document.createElement("div");
//     grid.className = "box";
//     grid.id = i;
//     grid.style.backgroundColor = "none";
//     grid.style.border = "solid salmon 1px";
//     grid.style.width = "18px";
//     grid.style.height = "18px";
//     grid.style.display = "flex";
//     grid.style.alignItems = "center";
//     grid.style.justifyContent = "center";
//     grid.innerHTML = i;
//     grid.style.color = "white";
//     grid.style.fontSize = "8px";
//     gameframe.appendChild(grid);
// }



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