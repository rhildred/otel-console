# <a href="https://github.com/rhildred/otel-console" target="_blank">otel-console</a>

TLDR:

```
npm install otel-console
```

```javascript
import {Console} from "otel-console";

const console = new Console();
const name = console.readLine("What is your name? ");

console.log(`Hello ${name}`)
```

I did this for an object oriented Javascript class. Students really wanted to have an input method like python. I am refreshing this to add otel collecting in the specialization. In 2018 I used firebase for this, in 2025 my career has moved to include distributed systems. Otel seems like a good strategy.

## Aggregation

We made a new object to replace the javascript window.console. This object has 2 methods `readLine(sPrompt: string)` and `log(...sOut :any)`. The readLine method uses a static class from npm, readline-sync for getting console input.

```

import readlineSync from "readline-sync";

export class Console{
    log( ...sOut : any){
        console.log(...sOut);
    }
    readLine(sPrompt: string): string{
        return readlineSync.question(sPrompt);
    }
}


```

To use these objects we import them at the start of the file. As well as importing them  we need to tell npm to resolve the dependency in the package.json file:

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

Along with the overridden log method we also need to add a way to turn logging on and off. We add that to the object as well as a private attribute `_bLogging `. If we change the implementation consumers of the object don't need to change. This is called encapsulation.


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

If you are reading this, thanks. Next I am planning on getting this working with an express app on open telemetry. The original idea was to use firebase to log from the browser. I guess I can expose the otel collector to the internet, but right now I am thinking that the use case for this would be a full stack custom element. The front end would be preact-custom-element and the back end would be an express app.

Stay Tuned.