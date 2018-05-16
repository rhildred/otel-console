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

import firebase = require("firebase-admin");
import * as url from "url";

export class ProductionConsole extends Console {
    private _bLogging: boolean = false;
    logging(bLogging: boolean) {
        this._bLogging = bLogging;
    }
    private _oUrl!: any;
    private _oRef!: firebase.database.Reference;
    log(sOutput: string) {
        if (this._bLogging) {
            super.log(sOutput);
        }
        if(this._oUrl) {
            this._oRef.push({message: sOutput, 
                timestamp: new Date().toISOString()})
        }
    }
    saveLog(sUrl: string) {
        this._oUrl = url.parse(sUrl);
        let serviceAccount = require("./privatekey.json");

        firebase.initializeApp({
            credential: firebase.credential.cert(serviceAccount),
            databaseURL: this._oUrl.protocol + "//" + this._oUrl.host
        });


        let db = firebase.database();

        this._oRef = db.ref(this._oUrl.pathname);

        this.log("Firebase initialized");
    }
}