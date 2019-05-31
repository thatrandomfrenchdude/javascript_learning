// Task on page 174 of 1272

"use strict";

// using ?
function checkAge1(age) {
  return age > 18 ? true : confirm('Do you have permission?');
}

// using ||
function checkAge2(age) {
  return age > 18 || confirm('Do you have permission?');
}

let reply1 = checkAge1(17);
let reply2 = checkAge2(17);
