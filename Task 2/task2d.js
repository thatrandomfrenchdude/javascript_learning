// Task from page 114 of 1264

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
