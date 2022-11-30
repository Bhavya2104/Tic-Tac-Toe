//hover sound js

let mores =document.querySelectorAll('.box');
let audioArr = document.getElementsByTagName('audio');
console.log(audioArr)
let more = Array.from(mores)
// more.forEach(addEventListener("mouseover",()=>{
//     audioArr[0].play();
// }))
//  more[0].addEventListener("mouseover",()=>{
//      audioArr[0].play();
//  });

more.forEach(el =>{
    el.addEventListener("mouseover",()=>{
    audioArr[0].play();
})})



let music = new Audio('./music.mp3')
let turnSound = new Audio('./ting.mp3')
let gameOver = new Audio('./gameover.mp3')

let isGameOver = false
let isGameStart = false
let turn
let totalmoves = 0;


//toss
let x = Math.floor(Math.random() * 11);
console.log(x)
if (x % 2 == 0) {
    turn = "X";
    document.getElementById('toss').innerText = turn + " win the toss";
}
else {
    turn = "O";
    document.getElementById('toss').innerText = turn + " win the toss";
}


//changing turn
const changeTurn = () => {
    if (turn === "X")
        return "O"
    else
        return "X"
}


//win
const checkWin = () => {
    let wins = [
        [0,1,2,2.5,5,0,25],
        [3,4,5,2.5,15,0,25],
        [6,7,8,2.5,25,0,25],
        [0,3,6,-7.5,15,90,25],
        [1,4,7,2.5,15,90,25],
        [2,5,8,12.5,15,90,25],
        [0,4,8,1.1,15,45,28.28],
        [2,4,6,1.1,15,-45,28.28],
    ]
    let boxtexts = document.getElementsByClassName('boxtext');
    wins.forEach(e => {
        if ((boxtexts[e[0]].innerText === boxtexts[e[1]].innerText) && (boxtexts[e[1]].innerText === boxtexts[e[2]].innerText) && (boxtexts[e[0]].innerText === boxtexts[e[2]].innerText) && (boxtexts[e[0]].innerText !== '')) {
            isGameOver = true;
            console.log(boxtexts[e[0]].innerText)
            // return boxtexts[e[0]].innerText;
            document.getElementsByClassName('infotext')[0].innerText = boxtexts[e[0]].innerText + " Is WINNER"
            document.getElementById('ex-img').style.width = '200px'
            document.getElementsByClassName('line')[0].style.transform = `translate(${e[3]}vw , ${e[4]}vw) rotate(${e[5]}deg)`
            document.getElementsByClassName('line')[0].style.width = `${e[6]}vw`;
            document.getElementsByClassName('line')[0].style.opacity = "1"
        }
    })

}




//main fn
let boxes = document.getElementsByClassName('box');
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', () => {
        if (boxtext.innerText === "" && !isGameOver) {
            boxtext.innerText = turn;
            isGameStart = true;
            turn = changeTurn();
            turnSound.play();
            checkWin();
            totalmoves++;
            if (totalmoves > 8 && !isGameOver) {
                document.getElementsByClassName('infotext')[0].innerText = "Game draw!!";
            }
            else if (!isGameOver) {
                document.getElementById('toss').innerText = "";
                document.getElementsByClassName('infotext')[0].innerText = "Turn for " + turn;
            }

        }
    })
})




//reset

let reset = document.getElementById('reset');
reset.addEventListener('click', () => {
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = "";
    })
    totalmoves = 0;
    isGameOver = false;
    document.getElementById('ex-img').style.width = '0px'
    document.getElementsByClassName('line')[0].style.opacity = "0"
    //
    x = Math.floor(Math.random() * 11);
    console.log(x)
    if (x % 2 == 0) {
        turn = "X";
        document.getElementById('toss').innerText = turn + " win the toss";
    }
    else {
        turn = "O";
        document.getElementById('toss').innerText = turn + " win the toss";
    }
})