Connect Four Pseudocode:
1) Constants: 
	•	Define a colors object with keys of 1 & -1 to represent players and 0 to represent empty slots. Assign a color value to each of those keys.

2) State Variables:
	•	board - array of nested arrays, which each represent a column
	•	turn - 1/-1 for player, null for empty slot

3) Cached elements:
	•	Play again button
	•	Message element
	•	Game board

4) Upon loading the app should:
	4.1) Initialize the state variables
	⁃	initialize the board array to create a 2d array that represent 7 columns and then 6 rows inside
	⁃	initialize who’s turn it is. Red chips is player 1 and yellow chips is player -1. 0 is empty slot (white)
	4.2) Render those values to the page
	⁃	Render the board: Loop over each element of the first array and then loop over each elements of the second array. Use index of each element to access each value and then set the background color of the current element by using the value as a key on the colors object from the constant.
	⁃	Render a message: If winner equals null then render who’s turn it is. If winner equals ’T’ then render a tie game message. Anything else is a victory then I’ll render a player victory message.
	4.3) Wait for user to click a circle

5) Handle a player clicking a circle
	⁃	5.1) Loop through the cached game board elements
	⁃	Obtain the index of the circle that was last clicked
	⁃	5.2) set guards on the clicker so it immediately	returns if we click on the wrong thing
	⁃	5.3) define variables to find the index of both the column and row slots on the board
	⁃	5.4) Update board array at the index with the value of turn.
	⁃	5.5) Flip turns by multiplying turn by -1
	⁃	5.6) Create win logic for the board to find 4 pieces in a row.
	⁃	create loop statements to find winning combinations from vertical, horizontal, positive diagonal, and from negative diagonal positions on the board.
	⁃	Any player with 4 in a row wins
	⁃	If nobody gets 4 in a row then it’s a tie. Set winner to ’T’ to render this message
	⁃	5.7) All state has been updated so render the state to the page

6) Handle a player clicking the replay button
⁃	Initialize state variables and then render.
