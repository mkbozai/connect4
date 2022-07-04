/*----- constants -----*/


/*----- app's state (variables) -----*/
let board; // nested arrays represent columns
let turn; // 1 or -1, null for empty slot

/*----- cached element references -----*/


/*----- event listeners -----*/


/*----- functions -----*/
init();

function init() {
    board = [
        [null, null, null, null, null, null], // column 1
        [null, null, null, null, null, null], // column 2 
        [null, null, null, null, null, null], // column 3
        [null, null, null, null, null, null], // column 4
        [null, null, null, null, null, null], // column 5
        [null, null, null, null, null, null], // column 6
        [null, null, null, null, null, null], // column 7
    ];
    turn = 1;
    render();
}

function render() {

}