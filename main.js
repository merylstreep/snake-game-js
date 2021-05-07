//defined linkedlist and node classes

class LLNode {
	constructor(val) {
		this.val = val;
		this.next = null;
		this.prev = null;
	}
}

class LinkedList {
	constructor(head) {
		this.head = head;
		this.last = head;
	}

	add(llnode) {
		let currNode = this.head;
		let nextNode = this.head.next;
		while (nextNode !== null) {
			currNode = nextNode;
			nextNode = nextNode.next;
		}
		currNode.next = llnode;
		llnode.prev = currNode;
		this.last = llnode;
	}

	killLast() {
		let currNode = this.head;
		let nextNode = this.head.next;
		while (nextNode !== null) {
			currNode = nextNode;
			nextNode = nextNode.next;
		}
		currNode.next = null;
		this.last = currNode;
	}
	getLast() {
		return this.last;
	}

	getHead() {
		return this.head;
	}
}

//create linkedlist representation of snake

const gameContainer = document.getElementById("gameContainer");
const targetElement = document.getElementById("box");
const targetElementStyle = getComputedStyle(targetElement);

const initialElement = new LLNode(targetElement);
const snake = new LinkedList(initialElement);
const q = [];

//set consumable square
const apple = document.createElement("div");
apple.className = "apple";
gameContainer.appendChild(apple);

function moveSnake(event) {
	let currElement = snake.getLast();
	let toHead = currElement.prev;
	while (toHead !== null) {
		//update tail-most element position to prev
		const currElementStyle = getComputedStyle(currElement.val);
		const toHeadElementStyle = getComputedStyle(toHead.val);

		//toHead pos to push into curr
		const yPos = toHeadElementStyle.getPropertyValue("top");
		const xPos = toHeadElementStyle.getPropertyValue("left");

		currElement.val.style.top = yPos;
		currElement.val.style.left = xPos;

		currElement = toHead;
		toHead = toHead.next;
	}

	//update the head element pos
	const snakeHead = snake.getHead().val;
	const elementStyle = getComputedStyle(snakeHead);
	const keyStroke = event.key.toLowerCase();
	const yPos = elementStyle.getPropertyValue("top");
	const xPos = elementStyle.getPropertyValue("left");
	const yPixelOrigin = parseInt(yPos.substring(0, yPos.length - 2));
	const xPixelOrigin = parseInt(xPos.substring(0, xPos.length - 2));

	switch (keyStroke) {
		case "w":
			snakeHead.style.top =
				(Math.abs(yPixelOrigin - 100 + 700) % 700).toString() + "px";
			break;
		case "a":
			snakeHead.style.left =
				(Math.abs(xPixelOrigin - 100 + 1400) % 1400).toString() + "px";
			break;
		case "s":
			snakeHead.style.top = ((yPixelOrigin + 100) % 700).toString() + "px";
			break;
		case "d":
			snakeHead.style.left = ((xPixelOrigin + 100) % 1400).toString() + "px";
			break;
		default:
			console.log("invalid key!", keyStroke);
	}

	const appleStyle = getComputedStyle(apple);
	if (
		appleStyle.getPropertyValue("top") === yPos &&
		appleStyle.getPropertyValue("left") === xPos
	) {
		//create new box and add it to the snack array
		const newBox = document.createElement("div");
		newBox.className = "box";
		newBox.style.top = xPos;
		newBox.style.left = yPos;
		q.push(newBox);
	}

	while (q.length > 0) {
		const newBox = q.pop();
		snake.add(new LLNode(newBox));
		gameContainer.appendChild(newBox);
	}
}

window.addEventListener("keydown", (e) => {
	moveSnake(e);
});
