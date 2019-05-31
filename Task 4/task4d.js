// Task on page 148 of 1272

"use strict"

prime: for (let i = 2; i <+ 10; i++) {
  for (let j = 2; j < i; j++) {
    if (i % j == 0) continue prime;
  }
  alert(i);
}
