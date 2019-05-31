// Task on page 176 of 1272

"use strict";

function pow(x, n) {
  let result = x;
  for (let i = 0; i < n-1; i++) {
    result *= x;
  }
  return result;
}

let x = +prompt('x-value?', '');
let n = +prompt('n-value?', '');
if (n < 1) {
  alert('Does not support exponents less than 1', '');
} else {
  alert(pow(x, n));
}
