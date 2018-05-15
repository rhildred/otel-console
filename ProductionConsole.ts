import firebase = require("firebase-admin");
import { Console } from './index';

export class ProductionConsole extends Console {
    private _bLogging: boolean = false;
    logging(bLogging: boolean) {
        this._bLogging = bLogging;
    }
    private _sUrl: string = "";
    private _oRef!: firebase.database.Reference;
    log(sOutput: string) {
        if (this._bLogging) {
            super.log(sOutput);
        }
        if(this._sUrl) {
            this._oRef.push({message: sOutput, 
                timestamp: new Date().toISOString()})
        }
    }
    saveLog(sUrl: string) {
        this._sUrl = sUrl;
        let serviceAccount = require("./privatekey.json");

        firebase.initializeApp({
            credential: firebase.credential.cert(serviceAccount),
            databaseURL: this._sUrl
        });


        let db = firebase.database();

        this._oRef = db.ref();

        this.log("Firebase initialized");
    }
}