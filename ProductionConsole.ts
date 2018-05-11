import {Console} from './index' ;

export class ProductionConsole extends Console{
    private _bLogging :boolean = false;
    logging(bLogging : boolean){
        this._bLogging = bLogging;
    }
    log(sOutput: string){
        if(this._bLogging){
            super.log(sOutput);
        }
    }
}