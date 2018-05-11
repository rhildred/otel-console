import readlineSync = require('readline-sync');
import * as fs from 'fs';

export class Console{
    log(sOut : string){
        fs.writeSync(1, sOut + "\n");
    }
    readLine(sPrompt: string): string{
        return readlineSync.question(sPrompt);
    }
}