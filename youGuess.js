const readline = require('readline'); //creating interface for inputs and outputs

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout

});

function ask(questionText) { //function to sets up the interface for user imput out outputs the computer gives, like you won and play again
    return new Promise((resolve) => {
      rl.question(questionText, resolve);
    });
  } 
function askPlayerGuess(computerNumber, oldNumberOfAttempts) { //function that makes sure when you play again the number of attempts and the computer number resets
    let numberOfAttempts = 0;
    if (Number.isInteger(oldNumberOfAttempts) && numberOfAttempts !== oldNumberOfAttempts) {
        numberOfAttempts = oldNumberOfAttempts;
    }
    

    rl.question("What is your guess? ", (guess) => { //interface question for the player guess
        

        const playerGuess = parseInt(guess); //converts guess to a interger

        if (playerGuess === computerNumber) { //if you guess the number right it tells you how many attempts and if you want to play again
            console.log(`Your guessed the number in ${numberOfAttempts} attempts,  Congrats!`);
            playAgain();
        } else if (playerGuess < computerNumber) {  //this will let you know its to low and to guess again
            console.log("Your guess is too low.");
            numberOfAttempts++;
            askPlayerGuess(computerNumber, numberOfAttempts);
        } else if (playerGuess > computerNumber) {    //this will let you know its to high and to guess again
            console.log("Your guess is too high.");
            numberOfAttempts++;
            askPlayerGuess(computerNumber, numberOfAttempts);
        } else {
            console.log("That number is not in my range!");  //this lets you know the number isnt between 1 and 100
            numberOfAttempts++;
            askPlayerGuess(computerNumber, numberOfAttempts);
        }
    })
}

async function start() {
//sets up our promise to return our play again option

console.log("Guess a number between 1 and 100!");

//function to handle the question
const initialComputerGuess = Math.floor(Math.random() * 100) + 1;
askPlayerGuess(initialComputerGuess);
}

start(); //callback function for start game

async function playAgain() { //returns the option to play the game again or close it
    console.log('we are in play again');
    let answer = await ask(`Would you like to play again? (Y/N) `) 
    if (answer.toUpperCase() === 'Y') {         //this if statement will reset the game along with the computers number
        console.log("Guess a number between 1 and 100!")
        const newComputerNumber = Math.floor(Math.random() * 100) + 1;
        askPlayerGuess(newComputerNumber);
    } else if (answer.toUpperCase() === 'N') { //this will end the game
        console.log("Thanks for playing!");
        rl.close();
    }
}


