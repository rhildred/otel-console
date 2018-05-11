import {Console} from './index' ;

let console: Console = new Console();

console.log("Hello World");

let sInput = console.readLine("enter a number between 1 and 10: ");

console.log("You input " + sInput);