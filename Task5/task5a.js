// Task on page 156 of 1272

"use strict";

let input = prompt('Please enter a browser:', '');
if (input == 'Edge') {
  alert("You've got the Edge!");
} else if (input == 'Chrome' || input == 'Firefox' || input == 'Safari' || input == 'Opera') {
  alert('Okay we support these browsers too')
} else {
  alert('We hope that this page looks okay!')
}
