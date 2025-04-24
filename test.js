import {Console} from "./dist/Console.js";

let console = new Console();

console.log("Hello World");

let sInput = console.readLine("enter a number between 1 and 10: ");

console.log("You input " + sInput);