//Game constants and variables

let dirVector = {x:0, y:0};

const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');

musicSound.volume = 0.2;

let speed = 5;
let lastPaintTime = 0;

let snakeArr = [
    {x:13, y:15}
]

let food = {x:7, y:3};

let score = 0;

//Game functions

function main(ctime){
    window.requestAnimationFrame(main);
    musicSound.play();
    // console.log(ctime);
    if((ctime-lastPaintTime)/1000 < 1/speed){
        return ;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake){
    //If snake bump into itself

    for(let i = 1; i < snakeArr.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }

    //If snake collides the walls

    if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
}

function gameEngine(){
    //Part-1 Updating the Snake array and Food

    if(isCollide(snakeArr)){
        
        musicSound.pause();
        alert("GAME OVER !!! Press Any Key To Play Again!");
        gameOverSound.play();
        
        dirVector = {x:0, y:0};
       
        snakeArr=[{x:13, y:15}];
        
        score = 0;
        musicSound.play();
    }

    //If snake has eaten the food, increment the score and regenerate food
    if(snakeArr[0].x === food.x && snakeArr[0].y === food.y){
        foodSound.play();
        score +=10;
        //checking for high score
        if(score>highScoreVal){
            highScoreVal = score;
            localStorage.setItem("highScore", JSON.stringify(highScoreVal));
            highScoreBoard.innerHTML = "High Score: " + highScoreVal;
        }
        //updating score
        scoreBoard.innerHTML= "Score: "+score;
        snakeArr.unshift({x:snakeArr[0].x+dirVector.x, y:snakeArr[0].y+dirVector.y})
        let a = 2;
        let b = 16;
        food = {x:Math.round(a + (b-a)*Math.random()),
                y:Math.round(a + (b-a)*Math.random())}
    }

    //Moving the Snake
    for(let i=snakeArr.length-2; i>=0; i--){
        snakeArr[i+1]={...snakeArr[i]};
    }
    snakeArr[0].x += dirVector.x;
    snakeArr[0].y += dirVector.y;



    //Part-2 To Display Snake and Food
    //Display the Snake

    board.innerHTML="";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;

        if(index==0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

     //Display the Food
     foodElement = document.createElement('div');
     foodElement.style.gridRowStart=food.y;
     foodElement.style.gridColumnStart=food.x;

     foodElement.classList.add('food');
     board.appendChild(foodElement);
    


}



//Main Logic of game

//getting high score
let highScore = localStorage.getItem("highScore");
if(highScore === null){
    highScoreVal = 0;
    localStorage.setItem("highScore", JSON.stringify(highScoreVal));
}
else{
    highScoreVal = JSON.parse(highScore);
    highScoreBoard.innerHTML = "High Score: " + highScoreVal;
}

//main 
window.requestAnimationFrame(main);
musicSound.play();
window.addEventListener('keydown',e =>{
    dirVector = {x:0, y:1};     //Start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            dirVector.x = 0;
            dirVector.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            dirVector.x = 0;
            dirVector.y = 1;
            break;
                
        case "ArrowLeft":
            console.log("ArrowLeft");
            dirVector.x = -1;
            dirVector.y = 0;
            break;
            
        case "ArrowRight":
            console.log("ArrowRight");
            dirVector.x = 1;
            dirVector.y = 0;
            break;
                            
    
        default:
            break;
    }
})

