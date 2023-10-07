 let music = new Audio("Songs/music.mp3");
let audioTurn = new Audio("Songs/ting.mp3");
let gameover = new Audio("Songs/gameover.mp3");

let turn = "X";
let isgameover = false;

//function to change turn
const changeTurn = ()=>{
    return turn === "X"?"0": "X";
}

// Function to check for a tie
const checkTie = () => {
    let boxtexts = document.querySelectorAll('.boxtext');
    for (let boxtext of boxtexts) {
        if (boxtext.innerText === '') {
            return false; // If any box is empty, the game is not a tie
        }
    }
    return true; // All boxes are filled, indicating a tie
}

//function to check for win
const checkWin = ()=>{
    let boxtexts = document.getElementsByClassName('boxtext');
    let wins = [
        [0, 1, 2, 3, 5, 0],
        [3, 4, 5, 3, 15, 0],
        [6, 7, 8, 3, 25, 0],
        [0, 3, 6, -3, 15, 90],
        [1, 4, 7, 3, 15, 90],
        [2, 5, 8, 13, 15, 90],
        [0, 4, 8, 3, 15, 45],
        [2, 4, 6, 3, 15, 135],
    ]
    wins.forEach(e =>{
        
        if((boxtexts[e[0]].innerText === boxtexts[e[1]].innerText) && (boxtexts[e[1]].innerText === boxtexts[e[2]].innerText) && (boxtexts[e[0]].innerText !== "")){
            document.querySelector('.info').innerText = boxtexts[e[0]].innerText + " Won";
            isgameover = true;
            gameover.play();
            
            document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "200px";

            document.querySelector('.line').style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;

            document.querySelector('.line').style.width = "24vw";
            
        }
        
    })
    
    if (!isgameover && checkTie()) {
        document.querySelector('.info').innerText = "It's a Tie!";
        isgameover = true;
        gameover.play();
    }
} 

//Game Logic
music.play();
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element =>{
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', ()=>{
        if(boxtext.innerText === '')
        {
            boxtext.innerText = turn;
            turn = changeTurn();
            audioTurn.play();
            checkWin();
            
            if(!isgameover){
                document.getElementsByClassName("info")[0].innerText = "turn for " + turn;
            }
        }
        
    });
    
});

//add onclick listner to reset button
reset.addEventListener('click', ()=>{
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element =>{
        element.innerText = " ";
    });
    turn = "X"
    isgameover = false;
    document.querySelector('.line').style.width = "0vw";
    document.getElementsByClassName("info")[0].innerText = "turn for " + turn;
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0px";
})

