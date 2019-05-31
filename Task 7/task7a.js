// Task on page 194 of 1272

"use strict";

function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no()
}

ask(
  "Do you agree?",
  () => alert("You agreed."),
  () => alert("You canceled the execution.");
);
