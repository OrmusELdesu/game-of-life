/**
  * name:   Game of Life
  * author: ormuseldesu
  * date: 2018-08-05 | August 5, 2018
*/
var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d');
    canvas.width = window.innerWidth, canvas.height = window.innerHeight;
var gridWidth = canvas.width/2, gridHeight = canvas.height/2;
var offset = 4, cellSize = 2;
var gameColor = 'orange'
var theGrid = createArray(gridWidth);
var mirrorGrid = createArray(gridWidth);

mouse.Initialise(canvas);

function createArray(rows) // create a 2D array
{
    var res = [];
    for(var i = 0; i < rows; i++)
    {
        res[i] = [];
    }
    return res;    
}

fillRandom();
function fillRandom()
{
    for(var i = 0; i < gridWidth; i++)
    {
        for(var j = 0; j < gridHeight; j++)
        {
            theGrid[i][j] = Math.floor(Math.random() * 2);
        }
    }
}
console.log(theGrid);
function drawGrid()
{
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height)

    for(var i = 1; i < gridWidth; i++)
    {
        for(var j = 1; j < gridHeight; j++)
        {
            if(theGrid[i][j]) // if the value is 1 or true
            {
                context.fillStyle = gameColor;
                context.fillRect(i * offset,j * offset,cellSize,cellSize);
            }
        }
    }
}

function drawText(x, y, font, color, text)
{
    context.save();
    context.fillStyle = color;
    context.font = font;
    context.fillText(text, x, y);
    context.restore();
}

function updateGrid()
{

    var mx = mouse.GetX(), my = mouse.GetY();
    var liveCells = deadCells = 0;
    for(var i = 1; i < gridWidth - 1; i++)
    {
        for(var j = 1; j < gridHeight - 1; j++)
        {
            var totalCells = 0;

            totalCells += theGrid[i - 1][j - 1]
            totalCells += theGrid[i - 1][j]
            totalCells += theGrid[i - 1][j + 1]
            
            totalCells += theGrid[i][j + 1]
            totalCells += theGrid[i][j - 1]
            
            totalCells += theGrid[i + 1][j - 1]
            totalCells += theGrid[i + 1][j]
            totalCells += theGrid[i + 1][j + 1]

            if(mx >= i*offset && mx <= i*offset+cellSize && my >= j*offset && my <= j*offset+cellSize)
            {
                theGrid[i][j] = 1;
            }

            if(keyboard.isKeyDown(keyboard.KEY_Z))
            {
                if(mx >= i*offset && mx <= i*offset+cellSize)
                {
                    theGrid[i][j] = 1;
                }
            }

            if(keyboard.isKeyDown(keyboard.KEY_X))
            {
                if(my >= j*offset && my <= j*offset+cellSize)
                {
                    theGrid[i][j] = 1;
                }
            }
            if(keyboard.isKeyDown(keyboard.KEY_C))
            {
                theGrid[i][j] = 0;
            }
            
            if(theGrid[i][j] == 0) // IF CELL IS DEAD
            {
                deadCells++;
                switch(totalCells)
                {
                    case 3:
                        mirrorGrid[i][j] = 1;
                        break;
                    default:
                        mirrorGrid[i][j] = 0;
                }
                
            }
            else if(theGrid[i][j] == 1) // IF CELL IS ALIVE
            {
                liveCells++;
                switch(totalCells)
                {
                    case 0:
                    case 1:
                        mirrorGrid[i][j] = 0; //0-1 neighbours die of loneliness
                        break;
                    case 2:
                    case 3:
                        mirrorGrid[i][j] = 1; //live of happiness
                        break;
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                        mirrorGrid[i][j] = 0; //4-8 neighbours die of overpopulation
                        break;
                    default:
                        mirrorGrid[i][j] = 0;
                }
            }
        }
    }
    drawText(canvas.width/30, canvas.height/20, "26px Comic Sans MS", "yellow", "live: " + liveCells);
    drawText(canvas.width/30, canvas.height/10, "26px Comic Sans MS", "red", "dead: " + deadCells);

    for(var i = 0; i < gridWidth; i++)
    {
        for(var j = 0; j < gridHeight; j++)
        {
            theGrid[i][j] = mirrorGrid[i][j];
        }
    }
}

alert("press Z to release vertical power\npress X to release horizontal power\nand C to kill everything\nhover on cell-group to stimulate it.")
tick();
function tick()
{
    drawGrid();
    updateGrid();
    window.requestAnimationFrame(tick);
}
