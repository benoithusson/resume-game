'use strict';

    var myCanvas = window.document.getElementById('myCanvas');
    var ctx = myCanvas.getContext('2d');
    var widthCanvas = 1000;
    var heightCanvas = 690;
    var max_speed_enemy = 7;
    ctx.font = '15px Arial';


// Make sure the image is loaded first otherwise nothing will draw.
    window.onload = function() {
        var background = new Image();
        background.src = "../images/background.png";
        ctx.drawImage(background, 0, 0);   
}


//////////////////////////////////////////////// PLAYER ////////////////////////////////////////////////

// Player Object
var myPlayer = {
    x: (Math.random() * 1000),
    y: (Math.random() * 690),
    speed_x: (Math.random() * 20) - 2,
    speed_y: (Math.random() * 20) - 2,
    health: 5,
    life: 2,
    width: 20,
    height: 20,
    color: 'blue',
}

// This rectangle represents the player. It contains also x/y value from the object myPlayer
var drawRectanglePlayer = function (player) { 
    ctx.beginPath();
    ctx.fillStyle = myPlayer.color;
    ctx.fillRect(myPlayer.x, myPlayer.y, myPlayer.width, myPlayer.height);
    ctx.fill();
}

/******************* To controll the player with the mouse movement *******************
    1- The event mousemove sends back an object. In this object, there are the X and Y coordinates of the mouse
    2- In order to move the player with mouse, I said the following thing : 
        > The x and y coordinates of myPlayer are now the x and y coordinates of the mouse
**************************************************************/
document.addEventListener('mousemove', function(event){
    var mousePosition_x = event.clientX - myCanvas.offsetLeft;
    var mousePosition_y = event.clientY  - myCanvas.offsetTop;

    myPlayer.x = mousePosition_x;
    myPlayer.y = mousePosition_y;

    // To avoid that the mouse goes beyond the canvas's limits
    if ( myPlayer.x < 0) { // if the mouse's x-coordinates is below 0 
        myPlayer.x = 0; // Then the mouse's x-coordinates is egal to 0
    }
    if ( myPlayer.x > widthCanvas) {
        myPlayer.x = widthCanvas;
    }
    if (myPlayer.y < 0) {
        myPlayer.y = 0;
    } 
    if (myPlayer.y > heightCanvas) {
        myPlayer.y = heightCanvas;
    }

});



//////////////////////////////////////////////// ENEMIES ///////////////////////////////////////////////

/******************* 1- Create a constructor which returns an object ************ 
> Instead of duplicate the code to create several enemies like this : 
        var myPlayer1 = {
            x: (Math.random() * widthCanvas),
            y: (Math.random() * heightCanvas),
            speed_x: (Math.random() * 20)-2,
            speed_y: (Math.random() * 20)-2,
        }
        var myPlayer2 = {
            x: (Math.random() * widthCanvas),
            y: (Math.random() * heightCanvas),
            speed_x: (Math.random() * 20)-2,
            speed_y: (Math.random() * 20)-2,
    
        }
        ...
> I create a constructor function to optimize the creation of enemies   
***********************************************************/
var myEnemyConstructor = function (x, y, speed_x, speed_y, enemy_width, enemy_height) {
    this.x = x;
    this.y = y;
    this.speed_x = speed_x;
    this.speed_y = speed_y;
    this.color = 'red';
    this.width = enemy_width;
    this.height = enemy_height;
}


/***************** 2 - Create automatically enemy from the constructor ********* 
> In the second step, I make a loop to create automatically enemy with their own : x/y coordinates, speed_x/ speed_y and name

> I ask to make the following things 5 time (because I want 5 enemies) : 
    a- For each loop, I create a random x, y, speed_x and speed_y...
    b- Then, I create a new enemy object from : the constructor myEnemyConstructor with the keyword new 
    c- By creating a new object from the constructor, I also give the arguments needed (x, y, speed_x, speed_y...)
    d- These arguments take as value the random x, y, speed_x and speed_y and a name I previously created
    e- Then, each time there is a new enemy created, I want to push him in the array tableauEnemy.

> Why an array ? Because it will be helpful in the updateMove() function below
**************************************************************/
var tableauEnemy = [];

var enemiesCreation = setInterval(function () {

    for (var i = 0; i < 3; i ++) {

        var x = (Math.random() * widthCanvas);
        var y = (Math.random() * heightCanvas);
        var speed_x = (Math.random() * 10) - 2;
        var speed_y = (Math.random() * 10) - 2;
        var enemy_width = 25;
        var enemy_height = 25;

        tableauEnemy.push(new myEnemyConstructor(x, y, speed_x, speed_y, enemy_width, enemy_height));
    };
    
    for(var j = 0; j < tableauEnemy.length ; j++ ) {
        // moveElement() is a function waiting for an argument. This argument has to be an object 
        // For each element there is in the array tableauEnemy, you will do the following instructions : 
        // Each time there is a loop, you give to moveElement() function an argument
        // the argument given is tableauEnemy[j], which corresponds to the index of each new obect in tableauEnemy 
        // By putting tableauEnemy[j] as an argument, we give to moveElement() function an access to the properties of each enemies
        moveEnemy(tableauEnemy[j]);

        collidingDetection(tableauEnemy[j], myPlayer);
    }

}, 5000); 



//////////////////////////////////////////////// COLLIDING DETECTION BETWEEN ENNEMIES AND PLAYER  ///////////////////////////////////////////////

/***********************************************************  
    > I create a function to calculate colliding between my enemies and the player. This function waits two arguments
    > I give the two arguments in the updateMove function 
    > the first argument will be one of the object enemy in tableauEnemy. The second argument is the object Player 
    > basic collision detection between two rectangles 

    > To detect if there is no collision, the algorythme tchecks if there are empty spaces between the elements
    > If there are empty spaces, there is no collision 
    > If there are no empty spaces between elements, this is a collision.
    > In order to do that, we have to tcheck the empty spaces on the right/ left / top / bottom
    > http://www.developper-jeux-video.com/javascript-html5-collisions-sprites/

************************************************************/

var collidingDetection = function (enemy, player) { // enemy corresponds to the tableauEnemy[j] and player correspond to myPlayer

    // If there is colliding between player and enemies, I want to execute the following code
    if (player.x < enemy.x + enemy.width && 
        player.x + player.width > enemy.x &&
        player.y < enemy.y + enemy.height &&
        player.y + player.height > enemy.y
        ) {

            // If there is colliding between the player and enemies, myPlayer.life drops of 1 point.
            myPlayer.health = myPlayer.health - 1;
            console.log(myPlayer.health);

            // If there is colliding between player and enemies, enemies are pushed back.
            enemy.speed_x = - enemy.speed_x;
            enemy.speed_y = - enemy.speed_y;

        }
}


//////////////////////////////////////////////// TO UPDATE PLAYER'S LIFE AND HEALTH ///////////////////////////////////////////////

var health_life_Update = function (myPlayer) {

    // If there is colliding, I want to warn the player by changing the player's color 
    // 3 states : green (10 to 7 points) / orange (6 to 4 points) / red (3 to 0 point)
    if (myPlayer.health < 4 ) {
        myPlayer.color = 'orange';
    } 

    if (myPlayer.health < 2 ) {
        myPlayer.color = 'red';
    }

    if (myPlayer.health == 0) {
        console.log('You lose one life !');

        // To reinitialize myPlayer.life after the player looses the game
        myPlayer.health = 5;

        // To reinitialize myPlayer.color after the player looses the game
        myPlayer.color = 'blue';

        // If the player looses, he looses 1 life
        myPlayer.life = myPlayer.life - 1;

        // If the player has no more lives, it's game over
        // I asked him if he wants to try again with a prompt
        // I put his answer in a variable (answerAfterGameOver)
        if (myPlayer.life == 0) {
            console.log('GAME OVER');
            var answerAfterGameOver = confirm('Do you want to play again ?');

            // OPTIMISATION
            html.style.display = 'none';
            css.style.display = 'none';
            js.style.display = 'none';
            bootstrap.style.display = 'none';
            jquery.style.display = 'none';
            angular.style.display = 'none';
            node.style.display = 'none';
            mongoDB.style.display = 'none';
            sketch.style.display = 'none';
            axure.style.display = 'none';
            ps.style.display = 'none';
            inD.style.display = 'none';
            german.style.display = 'none';
            uk.style.display = 'none';

            clearInterval(chrono);

            if (answerAfterGameOver == true) { // If the player chooses 'OK', I want to execute the following code
                console.log('New game');
                    
                // To reload the current document
                // These method has the same effect as the reload button of the browser
                window.location.reload(true);

                // To reinitialize the player's lives
                myPlayer.life = 2;

                // To reinitialize the player's health
                myPlayer.health = 10;

                // To reinitialize the timer
                seconds = 0;

                } else { // If the player clicks on 'Annuler', I want to execute the following code

                    // I redirect the player to the welcome page 
                    window.location.assign("index.html");
                }
            }
        }
}

//////////////////////////////////////////////// TO REVEAL ABILITIES ACFORDING TO THE TIME ///////////////////////////////////////////////

// Time variables
var seconds = 0; 
var milliseconds = 0; 

// Abilities : OPTIMISATION
var html = window.document.getElementById('html');
var css = window.document.getElementById('css');
var js = window.document.getElementById('js');
var bootstrap = window.document.getElementById('bootstrap');
var jquery = window.document.getElementById('jquery');
var angular = window.document.getElementById('angular');
var node = window.document.getElementById('node');
var mongoDB = window.document.getElementById('mongoDB');
var sketch = window.document.getElementById('sketch');
var axure = window.document.getElementById('axure');
var ps = window.document.getElementById('ps');
var inD = window.document.getElementById('inD');
var german = window.document.getElementById('german');
var uk = window.document.getElementById('uk');


/////////// To reveal the abilities according to the time
function chrono () {

    seconds++;

    // Put together in a variable the seconds and the milliseconds
    var currentTime = '0' + seconds;

    // Replace the content of the HTML element containing in variable clock by the content of currentTime
    clock.textContent = currentTime;

    // To reveal abilities every 5 seconds

    if (seconds > 10 ) { // OPTIMISATION
        html.style.display = 'block';
        css.style.display = 'block';
        } 
    if (seconds > 20 ) {
        js.style.display = 'block';
        bootstrap.style.display = 'block';
    } 
    if (seconds > 25 ) {
        jquery.style.display = 'block';
        angular.style.display = 'block';
    } 
    if (seconds > 30 ) {
        node.style.display = 'block';
        mongoDB.style.display = 'block';
    } 
    if (seconds > 35 ) {
        sketch.style.display = 'block';
        axure.style.display = 'block';
    } 
    if (seconds > 40 ) {
        ps.style.display = 'block';
        inD.style.display = 'block';
    } 
    if (seconds > 45 ) {
        german.style.display = 'block';
        uk.style.display = 'block';
    }
};
// The setInterval is stopped with a ClearInterval is in 'health_life_Update ()'
// When the player's life is egal to 0
setInterval(chrono, 1000);



//////////////////////////////////////////////// TO UPDATE ENEMY'S POSITION ////////////////////////////////////////////////
var moveEnemy = function (enemy) {

// VELOCITY
    enemy.x = enemy.x + enemy.speed_x;
    enemy.y = enemy.y + enemy.speed_y;
    ctx.fillStyle = enemy.color;
    ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);

// COLISION WITH THE PLAYGROUND
    if (enemy.x > widthCanvas - 20 || enemy.x < 5 ) {
        enemy.speed_x = - enemy.speed_x;
    }
    if (enemy.y > heightCanvas - 30 || enemy.y < 5 ) {
        enemy.speed_y = - enemy.speed_y;
    }
}
// When the x/y coordinate reaches the limit of the canvas
// you change the direction by putting a negative value to the velocity
// In canvas, when Y is positiv and increases : it moves to the bottom (in html, it moves to the top)
// In canvas, when X is positiv and increases : it moves to the right (in html, it moves to the left)
// If playerOrEnemy.x reaches the right side > playerOrEnemy.x is positiv > I add a negativ value to a positiv value > the enemy goes in the opposite direction
// If playerOrEnemy.x reaches the left side > playerOrEnemy.x is egal to 0 > I add a positiv value to 0 > It makes a positiv value > it goes to the opposite direction

// function moveElement (playerOrEnemy) {...} is a function which will move enemy's position which take a parameter. These parameter will be an object enemy
// This object enemy comes from tableauEnemy
// Then, the name of the object will replace the name of the argument (enemy) everywhere in the function 
// To do that, we call the function in updateMove function () and we given it our object as an argument 
// We give to the function the memory location of our object



//////////////////////////////////////////////// TO ANIMATE THE GAME ////////////////////////////////////////////////

// updatemove contains all the other functions necessary to the animation
function updateMove () { // 1- Create a function 

    requestAnimationFrame(updateMove); // 2- Make a requestAnimationFrame of the updateMove function

    // To delete all elements drawn before the coordinates x/y and by the sizes widthCanvas and heightCanvas
    ctx.clearRect(0, 0, widthCanvas, heightCanvas);

    for(var j = 0; j < tableauEnemy.length ; j++ ) {
        // moveElement() is a function waiting for an argument. This argument has to be an object 
        // For each element there is in the array tableauEnemy, you will do the following instructions : 
        // Each time there is a loop, you give to moveElement() function an argument
        // the argument given is tableauEnemy[j], which corresponds to the index of each new obect in tableauEnemy 
        // By putting tableauEnemy[j] as an argument, we give to moveElement() function an access to the properties of each enemies
        moveEnemy(tableauEnemy[j]);

        collidingDetection(tableauEnemy[j], myPlayer);
    }

    // Function which draw the circle with myPlayer properties
    drawRectanglePlayer(myPlayer);

    // Function which updates the player's life and health's
    health_life_Update(myPlayer);

    // To see the player's health on the screen
    ctx.fillText('HEALTH = '+' '+ myPlayer.health, 5, 30); 

    // To see the player's life on the screen
    ctx.fillText('LIFE = '+' '+ myPlayer.life, 5, 50); 

    // Rectangle which contains the player's life and health
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.fillRect(3, 3, 100, 60); 

}
updateMove(); // 3- To call the updateMove function to make a loop. By calling the updateMove function, I execute the requestAnimationFrame function which contains executes the updateMove function









// OPTIMISATION 
// PAGE TO SUM UP THE ABILITIES THAT THE PLAYER WON EVEN IF HE HAD NOT SEEN EVERY ABILITIES
    // PUT THE IMAGE IN AN ARRAY WITH PUSH EACH TIME HE WINS AN ABILITIES


// BUTTON TO STOP THE GAME
// TO MAKE BULLET 
    // https://stackoverflow.com/questions/16617525/javascript-game-bullets-in-array-when-i-shoot-all-bullets-in-array-refire-fro
    // http://clockworkchilli.com/tutorials/top_down_shooter.html#section5
    // http://blog.sklambert.com/html5-canvas-game-the-enemy-ships/
    // https://developer.mozilla.org/fr/docs/Web/API/CanvasRenderingContext2D/moveTo

// ON THE WELCOME PAGE : ANIMATION WITH THE ID PICTURE