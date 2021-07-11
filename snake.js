function init(){

    console.log("In init");
    var can = document.getElementById("snakecanvas");
    H=can.height = 1000;
    W=can.width = 1000;
    pen = can.getContext('2d'); //pen object to draw on the canvas
    game_over=false;
    cs=67; //cell size '
    food_img=new Image();
    food_img.src="apple.png";
     trophy=new Image();
    trophy.src="trophy.png";
  food=getRandomFood();
    score=5;
  //creating snake json object
    snake={
        init_len:5,
        color:"blue",
        cells:[],
        direction:"right",

        createSnake:function(){
            for(var i=this.init_len;i>0;i--){
                this.cells.push({x:i,y:0});
            }
        },
      
       drawSnake:function(){
           // pen.fillStyle = "Red";
            for(var i=0;i<this.cells.length;i++){
                pen.fillStyle=this.color;
                pen.fillRect(this.cells[i].x*cs, this.cells[i].y*cs, cs-2, cs-2);
            }
           
        },
      
      updateSnake:function(){

            //check if the snake has eaten the food, increase the length of snake and generate new food object
            var headX = this.cells[0].x;
            var headY = this.cells[0].y;

            if(headX==food.x && headY==food.y){
                console.log("Food eaten");
                food=getRandomFood();
                score++;
            }

            else{
                this.cells.pop();

            }

            var nextX,nextY;
            //updating snake according to direction property

            if(this.direction=="right"){
                nextX=headX+1;
                nextY=headY;
            }
            else if (this.direction == "left") {
                nextX = headX - 1;
                nextY = headY;
            }
            else if (this.direction == "down") {
                nextX = headX ;
                nextY = headY+1;
            }
            else if (this.direction == "up") {
                nextX = headX ;
                nextY = headY-1;
            }

            
            this.cells.unshift({ x: nextX, y: nextY });


            //logic that prevents snake from going outside
            var last_x=Math.round(W/cs);
            var last_y=Math.round(H/cs);


            if(this.cells[0].y<0 || this.cells[0].x<0 || this.cells[0].x>last_x || this.cells[0].y>last_y){
                game_over=true;
            }

            

            
        }


    };

    snake.createSnake();

    function keyPressed(d){
        if(d.key=="ArrowRight"){
            snake.direction="right";
        }else if(d.key=="ArrowLeft"){
            snake.direction="left";
        }else if(d.key=="ArrowDown"){
            snake.direction="down";
        }else{
            snake.direction="up";
        }
        console.log(snake.direction);
    }
  
  document.addEventListener('keydown',keyPressed);
}



function draw(){
   pen.clearRect(0,0,W,H);

    snake.drawSnake();
    pen.fillStyle=food.color;
    pen.drawImage(food_img,food.x*cs,food.y*cs,cs,cs);

    pen.drawImage(trophy,18,20,cs,cs);

    pen.fillStyle="blue";
    pen.font="20px Roboto"
    pen.fillText(score,50,50);

}

function update(){


    snake.updateSnake();
}

function getRandomFood(){

    var foodX=Math.round(Math.random()*(W-cs)/cs);
    var foodY = Math.round(Math.random() * (H - cs) / cs);
    var food={
        x:foodX,
        y:foodY,
        color:"red"
    };
    return food;

}


function gameloop(){

    if (game_over) {
        clearInterval(f);
        alert('Game over');
        return;
    }

    console.log("in gameloop")
    draw();
    update();
}

init();
var f = setInterval(gameloop, 100);
  
