
import Logger from './Logger';
import Hello from './Hello';

Logger.say('hello!');

setInterval(function() {
  Hello.get(document.getElementById('hello'));
}, 1000);
