
var game = {
   
  groundWidth : 700,
  groundHeight : 400,
  netWidth : 6,
  groundColor : "#000000",
  netColor : "#FFFFFF",
  
  groundLayer : null,  
  scoreLayer : null,
  playersBallLayer : null,
    
  scorePosPlayer1 : 300,
  scorePosPlayer2 : 365,
  scorePlayer1 : 0,
  scorePlayer2 : 0,
    
  ball : {
    width : 10,
    height : 10,
    color : "#FFD700",
    posX : 200,
    posY : 200,
    lost : false,
    directionX : 1,
    directionY : 1,
    speed :5,

    move : function() {
      this.posX += this.directionX * this.speed;
      this.posY += this.directionY * this.speed;
    },
   
    bounce : function() {
      if (this.posX > game.groundWidth || this.posX < 0){
        this.directionX = -this.directionX;
        if ( this.posX < 0) game.playerTwo.scorePlayer2 = game.playerTwo.scorePlayer2+1;
        if (this.posX > game.groundWidth)  game.playerOne.scorePlayer1 = game.playerOne.scorePlayer1+1 ;
      }

      if (this.posY > game.groundHeight || this.posY < 0){
        this.directionY = -this.directionY;

      }


      if (game.ball.posX == game.playerOne.posX + 10 && game.ball.posY > game.playerOne.posY-10 && game.ball.posY < game.playerOne.posY + 50) {
        this.directionX = -this.directionX;

        //this.directionY = -this.directionY;
      }
      if (game.ball.posX == game.playerTwo.posX - 10 && game.ball.posY > game.playerTwo.posY -20 && game.ball.posY < game.playerTwo.posY + 50)
        this.directionX = -this.directionX;

    }


  },
    
  playerOne : {
    width : 10,
    height : 50,
    color : "#FFFFFF",
    posX : 30,
    posY : 200,
    scorePlayer1:0,
  goUp : false,
  goDown : false
  },
    
  playerTwo : {
    width : 10,
    height : 50,
    color : "#FFFFFF",
    posX : 650,
    posY : 200,
    scorePlayer2:0,
  goUp : false,
  goDown : false
  },
    
  init : function() {
    this.groundLayer= game.display.createLayer("terrain", this.groundWidth, this.groundHeight, undefined, 0, "#000000", 0, 0); 
    game.display.drawRectangleInLayer(this.groundLayer, this.netWidth, this.groundHeight, this.netColor, this.groundWidth/2 - this.netWidth/2, 0);
    
    this.scoreLayer = game.display.createLayer("score", this.groundWidth, this.groundHeight, undefined, 1, undefined, 0, 0);
    game.display.drawTextInLayer(this.scoreLayer , "SCORE", "10px Arial", "#FF0000", 10, 10);
    
    this.playersBallLayer = game.display.createLayer("joueursetballe", this.groundWidth, this.groundHeight, undefined, 2, undefined, 0, 0);  
    game.display.drawTextInLayer(this.playersBallLayer, "JOUEURSETBALLE", "10px Arial", "#FF0000", 100, 100);

    this.displayScore( game.playerOne.scorePlayer1, game.playerTwo.scorePlayer2);
    this.displayBall(200,200);
    this.displayPlayers();
   
    this.initKeyboard(game.control.onKeyDown, game.control.onKeyUp);
   
  },
  displayScore : function(scorePlayer1, scorePlayer2) {
    game.display.drawRectangleInLayer(this.scoreLayer,45,50, "#000000",this.scorePosPlayer1, 10);
    game.display.drawRectangleInLayer(this.scoreLayer,45, 50,"#000000",this.scorePosPlayer2, 10);

    game.display.drawTextInLayer(this.scoreLayer, scorePlayer1, "60px Arial", "#FFFFFF", this.scorePosPlayer1, 55);
    game.display.drawTextInLayer(this.scoreLayer, scorePlayer2, "60px Arial", "#FFFFFF", this.scorePosPlayer2, 55);
  },
    
  displayBall : function() {
    game.display.drawRectangleInLayer(this.playersBallLayer, this.ball.width, this.ball.height, this.ball.color, this.ball.posX, this.ball.posY);
  },
  moveBall : function() { 
    this.ball.move();
  this.ball.bounce();
    this.displayBall();
  }, 
   
  movePlayers : function() {
    if (game.playerOne.goUp && game.playerOne.posY > 0)
      game.playerOne.posY-=5;
    else if (game.playerOne.goDown && game.playerOne.posY < game.groundHeight - game.playerOne.height)
      game.playerOne.posY+=5;
   else if (game.playerTwo.goUp && game.playerTwo.posY > 0)
      game.playerTwo.posY-=5;
    else if (game.playerTwo.goDown && game.playerTwo.posY < game.groundHeight - game.playerTwo.height)
      game.playerTwo.posY+=5;
  },
   
  displayPlayers : function() {
    this.displayScore( game.playerOne.scorePlayer1, game.playerTwo.scorePlayer2);
    game.display.drawRectangleInLayer(this.playersBallLayer, this.playerOne.width, this.playerOne.height, this.playerOne.color, this.playerOne.posX, this.playerOne.posY);
    game.display.drawRectangleInLayer(this.playersBallLayer, this.playerTwo.width, this.playerTwo.height, this.playerTwo.color, this.playerTwo.posX, this.playerTwo.posY);
  },
 
  clearLayer : function(targetLayer) {
  targetLayer.clear();
  },
   
  initKeyboard : function(onKeyDownFunction, onKeyUpFunction) {
    window.onkeydown = onKeyDownFunction;
    window.onkeyup = onKeyUpFunction;
  }
   
};