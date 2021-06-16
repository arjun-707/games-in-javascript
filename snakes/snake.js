function SnakeDragon() {
    this.x = 1;
    this.y = 1;
    this.stop = 0;
    this.up = false;
    this.down = false;
    this.left = false;
    this.right = false;
    this.showFood = true;
    this.snake = null;
    this.ground = null;
    this.snakeLength = 20;
    this.snakeSpeed = 1;
    this.groundWidth = 0;
    this.groundHeight = 0;
    this.foodPosition = 0;
}
SnakeDragon.prototype.startGame = function () {
    let mainScreen = document.createElement("div");
    let mainScreenDesign = "width: calc(100% - 300px);height: calc(100% - 100px);position: absolute;background-color: rgb(7, 7, 7);margin: 0;padding: 0;";
    mainScreen.setAttribute("style", mainScreenDesign);
    mainScreen.className = "ground";
    let insideScreen = document.createElement("div");
    let insideScreenDesign = "width: 1%;height: 2%;position: absolute;background-color: rgb(255, 255, 255);margin: 4px;";
    insideScreen.setAttribute("style", insideScreenDesign);
    insideScreen.className = "snake";
    mainScreenDesign = null, insideScreenDesign = null;
    mainScreen.appendChild(insideScreen); 
    document.body.appendChild(mainScreen);
    /* this.x = parseInt(insideScreen.offsetTop);
    this.y = parseInt(insideScreen.offsetLeft); */
    this.snake = insideScreen;
    this.ground = mainScreen;
    this.groundWidth = parseInt(this.ground.offsetWidth);
    this.groundHeight = parseInt(this.ground.offsetHeight);
    this.letsBegin();
}
SnakeDragon.prototype.moveSnakeLeft = function () {
    if (this.x < 1)
        this.x = this.groundWidth;
    else
        this.x--;
    this.snake.style.left = this.x+'px';
}
SnakeDragon.prototype.moveSnakeUp = function () {
    if (this.y < 1)
        this.y = this.groundHeight;
    else
        this.y--;
    this.snake.style.top = this.y+'px';
}
SnakeDragon.prototype.moveSnakeRight = function () {

    if (this.x >= this.groundWidth)
        this.x = 1;
    else
        this.x++;
    this.snake.style.left = this.x+'px';
}
SnakeDragon.prototype.moveSnakeDown = function () {
    if (this.y >= this.groundHeight)
        this.y = 1;
    else
        this.y++;
    this.snake.style.top = this.y+'px';
}
SnakeDragon.prototype.stopGame = function() {    
    clearInterval(this.stop);
    let stopButton = document.createElement("button");
    let leftDis = (this.groundWidth/2);
    let topDis = (this.groundHeight/2);
    let stopDesign = "-webkit-appearance: button;color: #fff;background-color: #337ab7;border-color: #2e6da4;display: inline-block;padding: 6px 12px;margin-bottom: 0;font-size: 14px;font-weight: 400;line-height: 1.42857143;text-align: center;white-space: nowrap;vertical-align: middle;-ms-touch-action: manipulation;touch-action: manipulation;cursor: pointer;-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;background-image: none;border: 1px solid transparent;border-radius: 4px;margin-left:"+leftDis+"px;margin-top:"+topDis+"px";
    stopButton.setAttribute("style", stopDesign);
    stopButton.innerHTML = "Score: "+this.snakeLength.length;
    stopDesign = null,leftDis = null,topDis = null;
    this.ground.appendChild(stopButton);
}
SnakeDragon.prototype.letsBegin = function() {
    let snakeObj = this;
    document.addEventListener("keyup", function (event) {
        let kcode = event.which || event.keyCode;
        /* 
            Keypad Codes : 
            - 37: left, 
            - 38: up, 
            - 39: right, 
            - 40: down 
        */
        switch (kcode) {
            case 37:
                snakeObj.up = false;
                snakeObj.down = false;
                snakeObj.left = true;
                snakeObj.right = false;
            break;
            case 38:
                snakeObj.up = true;
                snakeObj.down = false;
                snakeObj.left = false;
                snakeObj.right = false;
            break;
            case 39:
                snakeObj.up = false;
                snakeObj.down = false;
                snakeObj.left = false;
                snakeObj.right = true;
            break;
            case 40:
                snakeObj.up = false;
                snakeObj.down = true;
                snakeObj.left = false;
                snakeObj.right = false;
            break;
        }
    });
    snakeMovement = function() {
        if (snakeObj.x > snakeObj.groundWidth)
            snakeObj.x = 1;
        if (snakeObj.y > snakeObj.groundHeight)
            snakeObj.y = 1;
        if (snakeObj.up)
            snakeObj.moveSnakeUp();
        if (snakeObj.down)
            snakeObj.moveSnakeDown();
        if (snakeObj.left)
            snakeObj.moveSnakeLeft();
        if (snakeObj.right)
            snakeObj.moveSnakeRight();
        if (snakeObj.snakeLength > 1000)
            snakeObj.stopGame();
        if ((snakeObj.snake.offsetLeft + snakeObj.snake.offsetTop) == snakeObj.foodPosition) {
            snakeObj.snake.style.width = snakeObj.snakeLength+"px";
            snakeObj.snakeLength += 20;
            /* console.log(snakeObj.snake.offsetLeft, snakeObj.snake.offsetTop,snakeObj.foodPosition)
            clearInterval(snakeObj.stop); */
            snakeObj.food.parentNode.removeChild(snakeObj.food);
            snakeObj.showFood = true;
            if (snakeObj.snakeSpeed > 1) {
                snakeObj.snakeSpeed--;
                clearInterval(snakeObj.stop);
                snakeObj.stop = setInterval(snakeMovement, snakeObj.snakeSpeed);
            }
        }
        if (snakeObj.showFood)
            snakeObj.createRandomFood();
    };
    snakeObj.stop = setInterval(snakeMovement, snakeObj.snakeSpeed);
}
SnakeDragon.prototype.createRandomFood = function() {
    this.food = document.createElement("div");
    let randomLeft = parseInt(Math.random()*this.groundWidth);
    let randomTop = parseInt(Math.random()*this.groundHeight);
    console.log(randomLeft, randomTop)
    let foodDesign = "width: 1%;height: 2%;position: absolute;background-color: rgb(184, 12, 12);margin-left:"+randomLeft+"px;margin-top:"+randomTop+"px;border-radius: 10px 10px 10px 10px;";
    this.food.setAttribute("style", foodDesign);
    this.food.class = "food";
    this.ground.appendChild(this.food);
    this.foodPosition = randomLeft + randomTop;
    randomLeft = null, randomTop = null, foodDesign = null;
    this.showFood = false;
}
var sd = new SnakeDragon();
sd.startGame();





/* Snake.prototype.setPosition = function (position) {
    if (position && typeof position == "number") {

    }
}*/