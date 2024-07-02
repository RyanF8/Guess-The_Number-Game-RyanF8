// creating the interface for inputs and outputs
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout

});
let tries = 0; //sets computer tries to 0

function startGame() { //function to ask the player to think of a number and the computer guesses between 1 and 100
//Opening message for user
console.log("Please think of a number between 1 and 100.");
console.log("I will try and guess it!");
guessNumber(1, 100, '')
}

const guessNumber = (oldLowerBound, oldUpperBound, playerSetNumber) => { //parameters for our guess number variable
    let lowerBound = 1; let upperBound = 100; //sets our parameters 
    if(lowerBound != oldLowerBound && Number.isInteger(oldLowerBound)) {  //if our lower bound is not equal to 1 and is a number then reset it to 1
        lowerBound = oldLowerBound;
    } 
    if(upperBound != oldUpperBound && Number.isInteger(oldUpperBound)) { //if our upper bound is not equal to 100 and is a number then reset it to 100
        upperBound = oldUpperBound;
    }
    if (playerSetNumber === '') {rl.question('What is your number? ', (answer) => {
        tries = 0;
        playerSetNumber = Number(answer);
        guessNumber(lowerBound, upperBound, playerSetNumber);
    
    if (playerSetNumber > upperBound) { //checks to make sure the number is less than 100, closing if not
        console.log("That number does not match my requirements!");
        rl.close();
    }
    if (playerSetNumber < lowerBound) { //checks to make sure the player guess a number greater than 1, closing if not
        console.log("That number does not match my requirements!");
        rl.close();
    }
    })}
    //calculate the guesss by finding the midpoint between the current bounds
    const guess = Math.floor((lowerBound + upperBound) / 2);
    tries++; //ads 1 to each try

    //ask the user if the guess is correct
    rl.question(`Is it ${guess}? (Y/N) `, (answer) => {
        //check the users answer
        if (answer.toUpperCase() === 'Y' && playerSetNumber === guess) { //if computer guess the player number it says how many attempts it took and asks if they want to play again
            console.log(`Your number was ${guess}!`);
            console.log(`I guessed it in ${tries} tries.`);
            playAgain();
            
        } else if (answer.toUpperCase() === 'Y' && playerSetNumber !== guess) { //cheat detection to tell if the player number was guessed wrong and the player says yes
            console.log(`Youre cheating! Your number is ${playerSetNumber}`);
            console.log("You dont deserve me");
            rl.close();
        } else if (answer.toUpperCase() === 'N' && playerSetNumber !== guess) {
            //if guess was wrong ask if it was higher or lower
            rl.question("Is your number higher (H), or lower (L) than my guess ", (hint) => {
                //adjust bounds based off users answer
                if (hint.toUpperCase() === 'H' && playerSetNumber > guess) {
                    lowerBound = guess + 1; //move lower bound up
                } else if (hint.toUpperCase() === 'H' && playerSetNumber < guess) { //if the number is lower than the computer guess and player says higher then it asks again
                    console.log('You fool. you lied im going to ask again')
                    guessNumber(lowerBound, upperBound, playerSetNumber)
                } else if (hint.toUpperCase() === 'L' && playerSetNumber < guess) {
                    upperBound = guess - 1; //move upper bound down
                } else if (hint.toUpperCase() === 'L' && playerSetNumber > guess) { //if the number is higher than the computer guess and the player says higher it asks again
                    console.log('You have fallen victim to one of the classic blunders! you lied im going to ask again')
                    guessNumber(lowerBound, upperBound, playerSetNumber)
                } else {
                    //handle invalid response to hint
                    console.log("Please enter H for higher or L for lower.");
                }
                guessNumber(lowerBound, upperBound, playerSetNumber); //guess again using updated bounds
            });
        } else if (answer.toUpperCase() === 'N' && playerSetNumber === guess) { //if player number was guessed correctly and player says no then it calls them out and ends game
            console.log(`Youre cheating! your number was ${playerSetNumber} and I guessed ${guess}. Youre lame, bye.`)
            rl.close();
        } else {
            // Handle invalid input for the initial guess confirmation
            console.log("Please enter Y for Yes or N for no.");
            guessNumber(); //re-try guess with same bounds
        }       
    })
}

startGame(); //calls the game start function

async function playAgain() {
    //ask wether we want to restart the game
    rl.question('Would You like to play again(Y/N)?\n', (answer) => {
        //if yes the game restarts
        //if no the game ends and says thanks
        //if random input ask again
        if (answer.toUpperCase() === 'Y') {
            startGame();
        } else if (answer.toUpperCase() === 'N') {
            console.log('Thank you for playing my game!');
            rl.close();
        } else {
            playAgain();
        }
    }) 
}


//shout out to Chris for helping me with the framework, and Dante for spending a lot of time with me getting everything dialed in!