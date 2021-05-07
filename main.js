//GLOBALS
SNAKE_DIMENSION = 100;

//great a grid on the page
const gameContainer = document.getElementsByTagName("body")[0];
const style = getComputedStyle(gameContainer);
const height = style.height;
const width = style.width;

const m = Math.floor(parseInt(height.slice(0, height.length - 2)) / 100);
const n = Math.floor(parseInt(width.slice(0, width.length - 2)) / 100);

//create all valid divs
for (i = 0; i < n; ++i) {
	for (j = 0; j < m; ++j) {
		const gridElement = document.createElement("div");
		gridElement.className = "grid";
		gridElement.style.top = SNAKE_DIMENSION * j + "px";
		gridElement.style.left = SNAKE_DIMENSION * i + "px";
		gridElement.id = "grid" + i + j;
		gameContainer.appendChild(gridElement);
	}
}

//helper functions for consumable state
function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

//initialise consumable
let apple = document.getElementById("grid" + getRandomInt(n) + getRandomInt(m));
let appleStyle = getComputedStyle(apple);
apple.className = "apple";

//set consumable within random point of the page
function updateConsumable() {
	apple.className = "grid";
	apple = document.getElementById("grid" + getRandomInt(n) + getRandomInt(m));
	appleStyle = getComputedStyle(apple);
	apple.className = "apple";
}

//render coloured divs
function renderElement(pos) {
	const [x, y] = pos;

	const gridElement = document.getElementById("grid" + x + y);
	gridElement.className = "box";
}

function derenderElement(pos) {
	const [x, y] = pos;
	const gridElement = document.getElementById("grid" + x + y);
	gridElement.className = "grid";
	console.log(y, appleStyle.top, x, appleStyle.left);

	//check if consumable has been passedover
	if (y * 100 + "px" == appleStyle.top && x * 100 + "px" == appleStyle.left) {
		snake.push([x, y]);
		updateConsumable();
	}
}

//represent snake as list of grid positions
let snake = [[0, 0]];
let direction = "d";
//render initial element
renderElement(snake[0]);

//move snake by unshifting with new position, and shifting off the last element
function moveSnake(event, snake) {
	const [x, y] = snake[0];
	const keyStroke = event.key.toLowerCase();

	const leastRecentMove = snake.pop();
	console.log("MOVED FROM!!!", leastRecentMove);

	switch (keyStroke) {
		case "w":
			snake.unshift([x, Math.abs(y - 1 + m) % m]);
			direction = "w";
			// snakeHead.style.top =
			// 	(Math.abs(yPixelOrigin - 100 + 700) % 700).toString() + "px";
			break;
		case "a":
			snake.unshift([Math.abs(x - 1 + n) % n, y]);
			direction = "a";
			// snakeHead.style.left =
			// 	(Math.abs(xPixelOrigin - 100 + 1400) % 1400).toString() + "px";
			break;
		case "s":
			snake.unshift([x, (y + 1) % m]);
			direction = "s";
			// snakeHead.style.top = ((yPixelOrigin + 100) % 700).toString() + "px";
			break;
		case "d":
			snake.unshift([(x + 1) % n, y]);
			direction = "d";
			// snakeHead.style.left = ((xPixelOrigin + 100) % 1400).toString() + "px";
			break;
		default:
			snake.push(leastRecentMove);
			leastRecentMove = undefined;
			console.log("invalid key!", keyStroke);
	}

	leastRecentMove && derenderElement(leastRecentMove);
	snake.forEach(renderElement);

	console.log("snake ....", snake);
}

window.addEventListener("keydown", (e) => {
	moveSnake(e, snake);
});

setInterval(() => {
	moveSnake({ key: direction }, snake);
}, 1000);
