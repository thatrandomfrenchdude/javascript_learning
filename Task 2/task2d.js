// Task from page 114 of 1264

//Turn this into a ? statement
/*
let message;
let login = prompt("Please enter  login", "");
if (login == 'Employee') {
  message = 'Hello';
} else if (login == 'Director') {
  message = 'Greetings';
} else if (login == '') {
  message = 'No login';
} else {
  message = '';
}
alert(message);
*/

let login = prompt("Please enter  login", "");
let message = (login == 'Employee') ? 'Hello' : (login == 'Director') ? 'Greetings' : (login == '') ? 'No login' : '';
alert(message);
