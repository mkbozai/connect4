/*----- constants -----*/
const COLORS = {
    '0': 'white',
    '1': 'red',
    '-1': 'yellow'
}

/*----- app's state (variables) -----*/
let board; // nested arrays represent columns
let turn; // 1 or -1

/*----- cached element references -----*/
const markerEls = [...document.querySelectorAll('#markers > div')];

/*----- event listeners -----*/
document.getElementById('markers').addEventListener('click', handleDrop);

/*----- functions -----*/
init();

function init() {
    board = [
        [0, 0, 0, 0, 0, 0], // column 0
        [0, 0, 0, 0, 0, 0], // column 1
        [0, 0, 0, 0, 0, 0], // column 2
        [0, 0, 0, 0, 0, 0], // column 3
        [0, 0, 0, 0, 0, 0], // column 4
        [0, 0, 0, 0, 0, 0], // column 5
        [0, 0, 0, 0, 0, 0], // column 6
    ];
    turn = 1;
    render();
}

function render() {
    board.forEach(function(colArr, colIdx) {
        colArr.forEach(function(cirVal, rowIdx){
            const cirEl = document.getElementById(`c${colIdx}r${rowIdx}`);
            cirEl.style.backgroundColor = COLORS[cirVal];
        });
    });
    renderMarkers();
}

// hide/show the markers (hide if no 0's exist in that column)
function renderMarkers() {
    markerEls.forEach(function(markerEl, colIdx) {
        markerEl.style.visibility = board[colIdx].includes(0) ? 'visible' : 'hidden';
    });
}

function handleDrop(evt) {
    const colIdx = markerEls.indexOf(evt.target);
    if (colIdx === -1) return;
    const colArr = board[colIdx];
    const rowIdx = colArr.indexOf(0);
    colArr[rowIdx] = turn;
    turn *= -1;
    render();
}