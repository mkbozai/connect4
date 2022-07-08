/*----- constants -----*/
const COLORS = {
    '0': 'white',
    '1': 'gold',
    '-1': 'aquamarine'
}

/*----- app's state (variables) -----*/
let board;
let turn;
let winner;

/*----- cached element references -----*/
const markerEls = [...document.querySelectorAll('#markers > div')];
const msgEl = document.querySelector('h1');
const replayBtn = document.querySelector('button');

/*----- event listeners -----*/
document.getElementById('markers').addEventListener('click', handleDrop);
document.querySelector('button').addEventListener('click', init);

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
    winner = null;
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
    renderMessage();
    replayBtn.style.visibility = board.flat().includes(1) ? 'visible' : 'hidden';
}

function renderMarkers() {
    markerEls.forEach(function(markerEl, colIdx) {
        markerEl.style.visibility = board[colIdx].includes(0) ? 'visible' : 'hidden';
        if (winner === 1 || winner === -1) {markerEl.style.visibility = 'hidden'};
    });
}

function handleDrop(evt) {
    const colIdx = markerEls.indexOf(evt.target);
    if (colIdx === -1) return;
    const colArr = board[colIdx];
    const rowIdx = colArr.indexOf(0);
    colArr[rowIdx] = turn;
    turn *= -1;
    winner = checkWin(colIdx, rowIdx);
    render();
}

function checkWin(colIdx, rowIdx) {
    const player = board[colIdx][rowIdx];
    return checkVertWin(colIdx, rowIdx, player) ||
    checkHorWin(colIdx, rowIdx, player) ||
    checkDiagLeftWin(colIdx, rowIdx, player) ||
    checkDiagRWin(colIdx, rowIdx, player) ||
    (board.flat().includes(0) ? null : 'T')
}

function checkVertWin(colIdx, rowIdx, player) {
    let count = 1;
    rowIdx--;
    while (board[colIdx][rowIdx] === player && rowIdx >= 0) {
        count++;
        rowIdx--;
    }
    return count === 4 ? winner = player : null;
}

function checkHorWin(colIdx, rowIdx, player) {
    let count = 1;
    let idx = colIdx + 1;
    while ((idx < board.length) && board[idx][rowIdx] === player) {
        count++;
        idx++;
    }
    idx = colIdx - 1;
    while ((idx >= 0) && board[idx][rowIdx] === player) {
        count++;
        idx--;
    } 
    return count >= 4 ? winner = player : null;
}

function checkDiagLeftWin(colIdx, rowIdx, player) {
    let count = 1;
    let idx1 = colIdx -1;
    let idx2 = rowIdx + 1;
    while (idx1 >= 0 && idx2 < board[0].length && board[idx1][idx2] === player) {
        count++;
        idx1--;
        idx2++;
    }
    idx1 = colIdx + 1;
    idx2 = rowIdx - 1;
    while (idx1 < board.length && idx2 >= 0 && board[idx1][idx2] === player) {
        count++;
        idx1++;
        idx2--;
    }
    return count >= 4 ? winner = player : null;
}

function checkDiagRWin(colIdx, rowIdx, player) {
    let count = 1;
    let idx1 = colIdx + 1;
    let idx2 = rowIdx + 1;
    while (idx1 < board.length && idx2 < board[0] && board[idx1][idx2] === player) {
        count++;
        idx1++;
        idx2++;
    }
    idx1 = colIdx - 1;
    idx2 = rowIdx - 1;
    while (idx1 >= 0 && idx2 >= 0 && board[idx1][idx2] === player) {
        count++;
        idx1--;
        idx2--;
    }
    return count >= 4 ? winner = player : null
}

function renderMessage() {
    if (winner === null) {
        msgEl.innerHTML = `<span style="color: ${COLORS[turn]}">${COLORS[turn].toUpperCase()}</span>'s Turn`;
        replayBtn.textContent = 'Restart';
    } else if (winner === 'T') {
        msgEl.textContent = 'Tie Game';
        replayBtn.textContent = 'Restart';
    } else {
        msgEl.innerHTML = `<span style="color: ${COLORS[winner]}">${COLORS[winner].toUpperCase()}</span> Wins!`; 
        replayBtn.textContent = 'Play Again';
    }
}