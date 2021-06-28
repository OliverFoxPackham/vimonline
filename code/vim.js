var currentRow = 0;
var currentCol = 0;
var isInsert = false;
var mode = "normal";
var grid = new Array(1); // y then x 
for (var i = 0; i < grid.length; i++) {
    grid[i] = new Array(" ");
    
}

function processKeys(event){
    if (event.code == "Space"){
        event.preventDefault();
    }
    if (event.code == "Escape"){
        mode = "normal";
    }
    if (mode == "insert"){
        //alert("ins");
        if (event.code == "Enter" ){
            grid.splice(currentRow + 1, 0 , new Array(" "));
            currentRow += 1;
            currentCol = 0;
        } else if(event.code == "ShiftLeft" || event.code == "ShiftRight"){
        } else{
            insertAmount = isInsert ? 1 : 0;
            grid[currentRow].splice(currentCol-insertAmount, 0 , event.key);
            currentCol += 1;}
    }else if (mode == "normal"){
        if (event.code == "KeyI"){
            mode = "insert";
            //alert ("change");
            isInsert = true;
        } else if (event.code == "KeyJ" || event.code == "ArrowDown"){
            currentRow += 1;
        } else if (event.code == "KeyK" || event.code == "ArrowUp"){
            currentRow -= 1;
        } else if (event.code == "KeyL" || event.code == "ArrowRight"){
            currentCol += 1;
        } else if (event.code == "KeyH" || event.code == "ArrowLeft"){
            currentCol -= 1;
        } else if (event.code == "KeyA"){
            mode = "insert";
            isInsert = false;
        }

    }
    //alert("out");
    outputGrid();
    displayMode();
}

function displayMode(){
    var displayMode = document.getElementById("vimmode");
    displayMode.innerHTML = mode;
}

function outputGrid(){
    var output = "";
    for (var i = 0; i < grid.length; i++){
        for (var j = 0; j < grid[i].length; j++){
            if (i == currentRow && j == currentCol){
                output += "<span class=vimcursor>"+ grid[i][j] +"</span>";
            } else {
                 output += grid[i][j];
            }
        }
        output += "</br>";
    }
    var vimbox = document.getElementById("vimbox");
    vimbox.innerHTML = output;
}

function startUp(){
    document.addEventListener("keydown", processKeys);
    outputGrid();
    displayMode();
}