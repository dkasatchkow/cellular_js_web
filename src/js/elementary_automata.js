const canvas_area = document.getElementById("canvas_area");
const cnvs = canvas_area.getContext("2d");
const width = cnvs.width;
const height = cnvs.height;
const cellSize = 3;
const cellsPerRow = width/cellSize;

const ruleset = [0, 0, 0, 1, 1, 1, 1, 0];

let generation = Array(cellsPerRow).fill(0);
generation[Math.floor(cellsPerRow/2)] = 1;

function applyRule(left, center, right){
    const index = (left << 2) | (center << 1) | right;
    return ruleSet[7-index];
}

function drawGeneration(generation){
    generation.forEach((cell, index) => {
        cnvs.fillStyle = cell ? 'black' : 'white';
        cnvs.fillRect(index * cellSize, 0, cellSize, cellSize);
});
}

function nextGeneration(current){
    const newGen = Array(current.length).fill(0);
    for (let i = 1; i < current.length -1; i++){
        const left = current[i-1];
        const center = current[i];
        const right = current[i+1];
        newGen[i] = applyRule(left,center,right);
    }
    return newGen;
}

function update(){
    drawGeneration(generation);
    generation = nextGeneration(generation);
    const imgData = cnvs.getImageData(0,0,width,cellSize);
    cnvs.putImageData(imgData,0,cellSize);
    cnvs.translate(0,cellSize);
}

setInterval(update, 5);