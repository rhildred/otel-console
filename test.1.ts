import {ProductionConsole} from './ProductionConsole' ;

let console: ProductionConsole = new ProductionConsole();

console.log("Hello World");

let sInput = console.readLine("enter a number between 1 and 10: ");

console.log("You input " + sInput);