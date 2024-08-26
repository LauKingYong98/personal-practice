// Initialize game variables
let humanScore = 0;
let computerScore = 0;
let totalRounds = 0;
let currentRound = 0;
let tiedRounds = 0;

// DOM elements
const humanScoreDisplay = document.getElementById('human-score');
const computerScoreDisplay = document.getElementById('computer-score');
const totalRoundsDisplay = document.getElementById('total-rounds');
const currentRoundDisplay = document.getElementById('current-round');
const tiedRoundsDisplay = document.getElementById('tied-rounds');
const roundResultDisplay = document.getElementById('round-result');
const winnerAnnouncementDisplay = document.getElementById('winner-announcement');

const startGameButton = document.getElementById('start-game-button');
const roundsInput = document.getElementById('rounds-input');
const resetGameButton = document.getElementById('reset-game-button');

const rockButton = document.getElementById('rock');
const paperButton = document.getElementById('paper');
const scissorsButton = document.getElementById('scissors');

// Event listeners for game buttons
rockButton.addEventListener('click', () => playRound('rock'));
paperButton.addEventListener('click', () => playRound('paper'));
scissorsButton.addEventListener('click', () => playRound('scissors'));

// Event listener for starting the game
startGameButton.addEventListener('click', startGame);
resetGameButton.addEventListener('click', resetGame);

// Function to reset a game
function resetGame() {
    humanScore = 0;
    computerScore = 0;
    tiedRounds = 0;
    currentRound = 0;
    totalRounds = 0;
    
    totalRoundsDisplay.textContent = "0";
    currentRoundDisplay.textContent = "0";
    humanScoreDisplay.textContent = "0";
    computerScoreDisplay.textContent = "0";
    tiedRoundsDisplay.textContent = "0";
    roundResultDisplay.textContent = "No rounds played yet.";
    winnerAnnouncementDisplay.textContent = "Start a new game.";
    
    roundsInput.value = "";  // Clear input
}

// Function to start the game
function startGame() {
    // Get the total number of rounds from user input
    totalRounds = parseInt(roundsInput.value);
    
    // Check if the user entered a valid number
    if (!totalRounds || totalRounds < 1 || totalRounds > 20) {
        alert("Please select a valid number between 1 and 20.");
        return;
    }
    
    // Reset game variables
    humanScore = 0;
    computerScore = 0;
    tiedRounds = 0;
    currentRound = 0;
    
    // Update the UI for the new game
    totalRoundsDisplay.textContent = totalRounds;
    currentRoundDisplay.textContent = currentRound;
    humanScoreDisplay.textContent = humanScore;
    computerScoreDisplay.textContent = computerScore;
    tiedRoundsDisplay.textContent = tiedRounds;
    roundResultDisplay.textContent = '';
    winnerAnnouncementDisplay.textContent = '';
}
// Function to get computer's choice
function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

// Function to play a round
function playRound(humanChoice) {
    if (currentRound >= totalRounds) {
        return;  // Stop if the game is over
    }

    const computerChoice = getComputerChoice();
    
    roundResultDisplay.textContent = `You chose ${humanChoice}, computer chose ${computerChoice}.`;

    if (humanChoice === computerChoice) {
        tiedRounds++;
        roundResultDisplay.textContent += " It's a tie!";
    } else if (
        (humanChoice === "rock" && computerChoice === "scissors") ||
        (humanChoice === "paper" && computerChoice === "rock") ||
        (humanChoice === "scissors" && computerChoice === "paper")
    ) {
        humanScore++;
        roundResultDisplay.textContent += " You win this round!";
    } else {
        computerScore++;
        roundResultDisplay.textContent += " Computer wins this round!";
    }

    // Increment the current round
    currentRound++;
    
    // Update the displayed score and round info
    updateGameInfo();

    // Check if the game is over
    if (currentRound >= totalRounds) {
        announceWinner();
    }
}

// Function to update the displayed game info
function updateGameInfo() {
    humanScoreDisplay.textContent = humanScore;
    computerScoreDisplay.textContent = computerScore;
    tiedRoundsDisplay.textContent = tiedRounds;
    currentRoundDisplay.textContent = currentRound;
}

// Function to announce the winner when the game is over
function announceWinner() {
    if (humanScore > computerScore) {
        winnerAnnouncementDisplay.textContent = "Final Result: Congratulations! You won the game!";
    } else if (computerScore > humanScore) {
        winnerAnnouncementDisplay.textContent = "Final Result: Computer won the game! Better luck next time!";
    } else {
        winnerAnnouncementDisplay.textContent = "Final Result: The game is a tie!";
    }
}
