function make2DArray(columns, rows) {
    let arr = new Array(columns);

    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
}

let grid;
let columns;
let rows;
let resolution = 10;

function setup() {
    createCanvas(1000, 800);
    // gets width & height from createCanvas arguments
    columns = width / resolution;
    rows = height / resolution;

    grid = make2DArray(columns, rows)

    // loops through each cell and gives it a value (either 1 or 0)
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = Math.floor(random(2));
        }
    }
}

function draw() {
    background(0);

    let nextGen = make2DArray(columns, rows);

    // for loops to loop through the grid
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {

            let x = i * resolution;
            let y = j * resolution;

            if (grid[i][j] === 1) {
                fill(255);
                stroke(0);
                rect(x, y, resolution, resolution);
            }

            // count live neighbours
            let livingNeighbours = countNeighbours(grid, i, j)

            // this is the cell we are checking ([i][j] is always the coordinates of a cell)
            let cellState = grid[i][j]

            // set the rules of conways game of life
            if (cellState === 0 && livingNeighbours === 3) {
                // turn current cell from dead to living - revive it
                nextGen[i][j] = 1;
            } else if (cellState === 1 && (livingNeighbours < 2 || livingNeighbours > 3)) {
                nextGen[i][j] = 0;
            } else {
                nextGen[i][j] = cellState
            }
        }
    }

    //remove this to have a static grid
    grid = nextGen

}

//x & y are the co-ordinates of the grid which is counting its neighbours (the source cell)
function countNeighbours(grid, x, y) {
    let sum = 0;
    //loops both i and j from -1 to 1 (i = 0, 1, 2 etc)
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {

            let column = (x + i + columns) % columns;
            let row = (y + j + rows) % rows;

            sum += grid[column][row]
        }
    }
    sum -= grid[x][y]
    return sum;

}