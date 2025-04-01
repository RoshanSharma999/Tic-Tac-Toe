import { findBestMove, createBoardFromXorO } from './logic.js';

// Accessing DOM elements
let mode = document.querySelectorAll(".modes");
let box = document.querySelector("#container");
let btn = document.querySelector("button");
let para = document.querySelector("p");
let boxes = document.querySelectorAll(".boxes");

// Universal variables
let modeStatus = "onep";
let boxClicked = 0;
let gameOver = false;
let canClick = [1, 1, 1, 1, 1, 1, 1, 1, 1];
let XorO = [0, 1, 2, 3, 4, 5, 6, 7, 8];

// Initially
mode[1].style.opacity = 0.5;
box.style.opacity = 0.3;

// Storing event listeners
let boxClick1Listeners = [];
let boxClick2Listeners = [];

// Play button actions
btn.addEventListener("click", btnClickFxn);

function btnClickFxn() {
    removeBoxEventListeners();
    btn.removeEventListener("click", btnClickFxn);

    gameOver = false;
    box.style.opacity = 1;
    btn.style.opacity = 0.5;
    para.style.opacity = 0;
    clearBoard();
    
    if (modeStatus == "onep") {
        for (let i = 0; i <= 8; i++) {
            const listener = () => boxClick1(i);
            boxes[i].addEventListener("click", listener);
            boxClick1Listeners.push({ box: boxes[i], listener });
        }
        whoFirst();
    }
    if (modeStatus == "twop") {
        for (let i = 0; i <= 8; i++) {
            const listener = () => boxClick2(i);
            boxes[i].addEventListener("click", listener);
            boxClick2Listeners.push({ box: boxes[i], listener });
        }
        twopFxn();
    }
}

function removeBoxEventListeners() {
    boxClick1Listeners.forEach(({ box, listener }) => {
        box.removeEventListener("click", listener);
    });
    boxClick2Listeners.forEach(({ box, listener }) => {
        box.removeEventListener("click", listener);
    });
    boxClick1Listeners = [];
    boxClick2Listeners = [];
}

function clearBoard() {
    for (let i = 0; i <= 8; i++) {
        boxes[i].innerText = "";
    }
}

function whoFirst() {
    let first = Math.floor(Math.random() * 2);
    if (first == 0) {
        computerMove();
    } else {
        para.innerText = "Your turn!";
        para.style.opacity = 1;
        setTimeout(() => {
            para.style.opacity = 0;
        }, 2000);
    }
}

function computerMove() {
    if (boxClicked == 9 || gameOver) return;
    
    const board = createBoardFromXorO(XorO);
    const bestMove = findBestMove(board, boxClicked);
    const idx = bestMove.row * 3 + bestMove.col;
    
    setTimeout(() => {
        boxes[idx].innerText = "O";
        XorO[idx] = "O";
        canClick[idx] = 0;
        boxClicked++;
        checkWin();
    }, 200);
}

function boxClick1(idx) {
    if (gameOver || canClick[idx] == 0) return;
    
    boxes[idx].innerText = "X";
    XorO[idx] = "X";
    canClick[idx] = 0;
    boxClicked++;
    checkWin();
    
    if (!gameOver) {
        computerMove();
    }
}

function boxClick2(idx) {
    if (gameOver == true) return;
    if (canClick[idx] == 1) {
        if (boxClicked % 2 == 0) {
            boxes[idx].innerText = "X";
            XorO[idx] = "X";
        } else {
            boxes[idx].innerText = "O";
            XorO[idx] = "O";
        }
        canClick[idx] = 0;
        boxClicked++;
        if (boxClicked >= 5) checkWin();
    }
}

function twopFxn() {
    para.innerText = "Start!";
    para.style.opacity = 1;
    setTimeout(() => {
        para.style.opacity = 0;
    }, 2000);
}
function checkWin() {
    if (XorO[0] == XorO[1] && XorO[1] == XorO[2]) {
        afterWin(1);
    } else if (XorO[3] == XorO[4] && XorO[4] == XorO[5]) {
        afterWin(4);
    } else if (XorO[6] == XorO[7] && XorO[7] == XorO[8]) {
        afterWin(7);
    } else if (XorO[0] == XorO[3] && XorO[3] == XorO[6]) {
        afterWin(3);
    } else if (XorO[1] == XorO[4] && XorO[4] == XorO[7]) {
        afterWin(4);
    } else if (XorO[2] == XorO[5] && XorO[5] == XorO[8]) {
        afterWin(5);
    } else if (XorO[0] == XorO[4] && XorO[4] == XorO[8]) {
        afterWin(4);
    } else if (XorO[2] == XorO[4] && XorO[4] == XorO[6]) {
        afterWin(4);
    } else {
        if (boxClicked == 9) afterWin(null);
        return;
    }
}
function afterWin(a) {
    gameOver = true;
    if (XorO[a] == "X") {
        if(modeStatus == "onep"){
            para.innerText = "You Win!";
        } else {
            para.innerText = "X Wins!";
        }
        para.style.opacity = 1;
    } else if (XorO[a] == "O") {
        if(modeStatus == "onep"){
            para.innerText = "Noob";
        } else {
            para.innerText = "O Wins!";
        }
        para.style.opacity = 1;
    }
    if (a == null) {
        para.innerText = "DRAW";
        para.style.opacity = 1;
    }
    resetGame();
}

function resetGame() {
    boxClicked = 0;
    canClick = [1, 1, 1, 1, 1, 1, 1, 1, 1];
    XorO = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    box.style.opacity = 0.3;
    btn.style.opacity = 1;
    btn.addEventListener("click", btnClickFxn);
}

// Mode buttons
mode[0].addEventListener("click", () => {
    modeStatus = "onep";
    mode[0].style.opacity = 1;
    mode[1].style.opacity = 0.5;
    para.style.opacity = 0;
    resetGame();
    clearBoard();
    removeBoxEventListeners();
});

mode[1].addEventListener("click", () => {
    modeStatus = "twop";
    mode[1].style.opacity = 1;
    mode[0].style.opacity = 0.5;
    para.style.opacity = 0;
    resetGame();
    clearBoard();
    removeBoxEventListeners();
});