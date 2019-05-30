// Task on page 113 of 1264
"use strict";

let message;
let val = prompt("Enter a number!", "");

if (val < 0){
  message = -1;
} else if (val == 0) {
  message = 0;
} else {
  message = 1;
}

alert(message);
