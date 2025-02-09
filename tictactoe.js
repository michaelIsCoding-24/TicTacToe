// All the boxes
let box0 = $('#box0');
let box1 = $('#box1');
let box2 = $('#box2');
let box3 = $('#box3');
let box4 = $('#box4');
let box5 = $('#box5');
let box6 = $('#box6');
let box7 = $('#box7');
let box8 = $('#box8');

// player variables, X's and O's
const player1 = 'X';
const player2 = 'O';

// Number of turns: no more than 9, winner at 5 turns.
let turn = 0;
let winner = false;

// starts the alerts hidden
$('#alertStart').hide();
$('#alertWinner').hide();
$('#alertDraw').hide();

// keeps track of the current player
let currentPlayer= '';

// list of valid outcomes that result in a win. 
const validOutcomes = [
    [box0, box1, box2], [box3, box4, box5], [box6, box7, box8], [box0, box4, box8],
    [box6, box4, box2], [box0, box3, box6], [box1, box4, box7], [box2, box5, box8]
]

// function that makes the game work
function startGame(){
    console.log('Start Game');
    turn++;
    currentPlayer = player1;

    // displays the start alert on button click
    $('#alertStart').show();
    document.getElementById('playerOne').classList.add('bg-success');
    
    // When you click a box...
    $('.box').on('click', function(){
        // hides the start message
        $('#alertStart').hide();
       
        // throws X or O onto clicked box
        $(this).text(currentPlayer);

        // prevents user from clicking one box multiple times
        if($(this).text !== ''){
            $(this).css("pointer-events", "none");
        } 

        // turn 5 and beyond guarentees a winner or draw, so checks each time a box is clicked
        // after 4 turns.
        if(turn > 4){
            console.log('check winner');
            checkOutcomes();
        }

        // this if/else flips between player 1 and 2, displays that change on the webpage.
        if(currentPlayer === player1){
            currentPlayer = player2;
            document.getElementById('playerOne').classList.remove('bg-success');
            document.getElementById('playerTwo').classList.add('bg-success');
            console.log(turn++);
                
        } else {
            currentPlayer = player1;
            document.getElementById('playerTwo').classList.remove('bg-success');
            document.getElementById('playerOne').classList.add('bg-success');
            console.log(turn++);
        };
    });
    
};

function checkOutcomes(){
    // iterates through all valid outcomes to check if there is a winner.
    for(let i = 0; i < 8; i++){       // using spread syntax
        checkForWinner(currentPlayer, ...validOutcomes[i]);
    };
    // ends the game after 9 turns
    if(turn === 9 && winner === false){
        endGame();
        $('#alertDraw').show();
    }
};

// checks for a winner
const checkForWinner = (currentPlayer, a, b, c) => {
    // checks inputs a, b, c, and if they match declares a winner
    if(a.text() === currentPlayer && b.text() === currentPlayer && c.text() === currentPlayer){
        winner = true;

        // highlights the winning boxes
        a.removeClass('bg-info');
        b.removeClass('bg-info');
        c.removeClass('bg-info');

        a.addClass('bg-danger');
        b.addClass('bg-danger');
        c.addClass('bg-danger');

        // Makes sure it says the player name and not X or O
        if(currentPlayer === 'X'){
            currentPlayer = 'Player 1';
        } else {
            currentPlayer = 'Player 2';
        };
    
        $('#alertWinner').text(`${currentPlayer} won!`);
        $('#alertWinner').show();

        endGame();
    };

};

// stops any and all inputs on the grid.
function endGame(){
    console.log("GAME OVER");
    $('.box').css("pointer-events", "none");
    $('#playerTwo').removeClass('bg-success');
    $('#playerOne').removeClass('bg-success');
}

// Start & Reset buttons
document.getElementById('startbtn').addEventListener('click', () => startGame());
document.getElementById('resetbtn').addEventListener('click', () => {
    document.location.reload(true)
});
