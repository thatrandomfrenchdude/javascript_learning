// Task on page 308 of 1272

"use strict";

function isEmpty(obj) {
  for (let key in obj) {
    return false;
  }
  return true;
}

let schedule = {};
alert(isEmpty(schedule));
