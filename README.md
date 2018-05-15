# <a href="https://github.com/rhildred/tsconsole" target="_blank">tsconsole</a>

To run this:

If you haven't already:

1. install git <a href="https://git-scm.com/downloads" target="_blank">from here.</a>
1. install vscode <a href="https://code.visualstudio.com/download" target="_blank">from here.</a>
1. install node.js <a href="https://nodejs.org/en/download/" target="_blank">from here.</a>
1. `npm install -g typescript`
1. `npm install -g ts-node`

Install the code and dependencies for this project

1. `git clone https://github.com/rhildred/tsconsole.git .`
1. `npm install` to get the local dependencies for this project.

## Aggregation

We made a new object to replace the javascript window.console. This object has 2 methods `readLine(sPrompt: string)` and `log(sOut :string)`. These methods use 2 static classes from npm, readline-sync and fs for getting console input and synchronously writing to stdout (file handle 1).

```

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

```

To use these objects we import them at the start of the file. As well as importing them  we need to tell npm to resolve the dependency in the package.json file:

```

  "dependencies": {
    "@types/node": "^10.0.8",
    "@types/readline-sync": "^1.4.3",
    "readline-sync": "^1.4.9"
  }

```

The general pattern for aggregation from npm is to add the dependency and import it into the source file.

## Inheritance

Once we have our object, we can inherit from that object to get it's methods and properties. For instance:

```

import {Console} from './index' ;

export class ProductionConsole extends Console{
}

```


Now we can instantiate a `ProductionConsole` and `readLine` and `log` with it. The production console gets those methods by inheriting from the Console class.

## Polymorphism

Inheritance is also called specialization. Our production console is a special console that only logs if we aren't in production.
We will override the `log(sOut :string)` method to have the desired new functionality.

```

    log(sOutput: string){
        if(this._bLogging){
            super.log(sOutput);
        }
    }


```

## Encapsulation

A long with the overridden log method we also need to add a way to turn logging on and off. We add that to the object as well as a private attribute `_bLogging `. If we change the implementation consumers of the object don't need to change. This is called encapsulation.


```

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

```

## Saving logs on the cloud with Firebase

"I don't always write code but when I do it always works on my machine." (The most interesting coder in the world) Seriously, I need a way to debug my code when it is running in production and users find new and interesting ways to break it. To do this I will set up a folder in a [firebase realtime database](https://console.firebase.google.com/) called logs. I will write messages in the folder that look like this:

```

{
    "-LC_Ebrb0gYX_5cl3r35": {
        "message": "Firebase initialized",
        "timestamp": "2018-05-15T19:19:44.354Z"
    },
    "-LC_EdeI5xai-QqGSlBL": {
        "message": "Hello World",
        "timestamp": "2018-05-15T19:19:51.699Z"
    },
    "-LC_EeKG893230dqeMsf": {
        "message": "You input 5",
        "timestamp": "2018-05-15T19:19:54.449Z"
    }
}

```

I am going to aggregate the firebase technology in my existing ProductionConsole.ts using the pattern that I established earlier.

```

import firebase = require("firebase-admin");
import * as url from "url";

```

These get firebase and url into my code. Then I update the package.json to include the implementing node module.

```
  "dependencies": {
    "@types/node": "^10.0.8",
    "@types/readline-sync": "^1.4.3",
    "firebase-admin": "^5.12.0",
    "readline-sync": "^1.4.9"
  }


```

I use the url module to split the host and path for initializing firebase:

```

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

```

Now when I run my code, I see the message "Firebase initialized" in both the console and the firebase. Next events!