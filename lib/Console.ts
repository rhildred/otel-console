import readlineSync from "readline-sync";

export class Console{
    log( ...sOut : any){
        console.log(...sOut);
    }
    readLine(sPrompt: string): string{
        return readlineSync.question(sPrompt);
    }
}

