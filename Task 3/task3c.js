// Task on page 128 of 1264
"use strict";

let login = prompt("Please enter your login:", "");
if (login == "Admin") {
  let password = prompt("Please enter your password:", "");
  if (password == "TheMaster") {
    alert("Welcome!");
  } else if (password == "" || password == null) {
    alert("Canceled.")
  } else {
    alert("Wrong password");
  }
} else if (login == "" || login == null) {
  alert("Canceled.");
} else {
  alert("I don't know you");
}
