// Task on page 129 of 1272
"use strict";

//Variant 1
let age = prompt("Enter your age:", "");
if (!(age >= 14 && age <= 90)) {
  alert("True");
} else {
  alert("False");
}

//Variant 2
let age = prompt("Enter your age:", "");
if (age <= 14 || age >= 90) {
  alert("True");
} else {
  alert("False")
}
