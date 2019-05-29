//Task on page 112 of 1264

let message;
let guess = prompt("How old am I?", "");

if (guess < 23) {
	message = "Too young!";
} else if (guess > 23) {
	message = "Too old!";
} else {
	message = "You got it!";
}

alert(message);
