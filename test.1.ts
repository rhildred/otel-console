import {ProductionConsole} from './index' ;

let console: ProductionConsole = new ProductionConsole();

console.logging(true);
console.saveLog("https://rnhprog81102018.firebaseio.com/logs/");

console.log("Hello World");

let sInput = console.readLine("enter a number between 1 and 10: ");

console.log("You input " + sInput);