// DOM elements
const grid = document.getElementById('grid');
const colorPicker = document.getElementById('colorPicker');
const colorModeBtn = document.getElementById('colorMode');
const rainbowModeBtn = document.getElementById('rainbowMode');
const eraserModeBtn = document.getElementById('eraserMode');
const clearGridBtn = document.getElementById('clearGrid');
// const resizeGridBtn = document.getElementById('resizeGrid');
const gridSizeSlider = document.getElementById('gridSizeSlider');
const gridSizeValue = document.getElementById('gridSizeValue');

// Global variables
let currentColor = '#000000';
let currentMode = 'color';
let gridSize = 16;
const gridWidth = 512; // Fixed grid width in pixels

// Create the grid
function createGrid(size) {
    grid.innerHTML = '';  // Clear the grid first

    // Set the grid template to ensure cells are distributed equally
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    // Calculate the cell size dynamically
    const cellSize = gridWidth / size;

    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement('div');
        cell.classList.add('grid-cell');
        cell.style.width = `${cellSize}px`;
        cell.style.height = `${cellSize}px`;
        cell.addEventListener('mouseover', changeColor);
        cell.addEventListener('mousedown', changeColor);
        grid.appendChild(cell);
    }
}

// Change color of cells
function changeColor(e) {
    if (e.type === 'mouseover' && !mouseDown) return;
    
    if (currentMode === 'rainbow') {
        const randomColor = Math.floor(Math.random()*16777215).toString(16);
        e.target.style.backgroundColor = "#" + randomColor;
    } else if (currentMode === 'eraser') {
        e.target.style.backgroundColor = '#ffffff';
    } else {
        e.target.style.backgroundColor = currentColor;
    }
}

// Clear the grid
function clearGrid() {
    grid.innerHTML = '';
    createGrid(gridSize);
}

// Resize the grid
// function resizeGrid() {
//     let newSize = prompt('Enter new grid size (max 64):', gridSize);
//     newSize = parseInt(newSize);
//     if (newSize && newSize > 0 && newSize <= 64) {
//         gridSize = newSize;
//         clearGrid();
//     } else {
//         alert('Please enter a valid number between 1 and 64.');
//     }
// }

// Event listeners
colorPicker.addEventListener('input', (e) => {
    currentColor = e.target.value;
    currentMode = 'color';
});

// Trigger color picker on Color Mode button click
colorModeBtn.addEventListener('click', () => {
    // colorPicker.click(); // Simulate color picker click
    currentMode = 'color'; // Switch to color mode when color is selected
});

rainbowModeBtn.addEventListener('click', () => currentMode = 'rainbow');
eraserModeBtn.addEventListener('click', () => currentMode = 'eraser');
clearGridBtn.addEventListener('click', clearGrid);
// resizeGridBtn.addEventListener('click', resizeGrid);

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

// Update grid size dynamically when the slider is moved
gridSizeSlider.addEventListener('input', (e) => {
    gridSize = e.target.value;
    gridSizeValue.textContent = `${gridSize} x ${gridSize}`;
    clearGrid();
});

// Initialize the grid
createGrid(gridSize);