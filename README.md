<p align="center"><img src="https://raw.githubusercontent.com/kartik1998/confm/master/logo.png"> </p>

<p align="center"><b>Effortless setup for config-management in nodejs</b></p>
<p align="center"><img src="https://img.shields.io/badge/config-management-brightgreen"></p>

<blockquote>Easily setup config management for your node app with confm. It's designed to be a key-value store. Btw you can set strings, objects etc. as your values! Moreover it's designed to make it easy for you to switch between key, value pairs with respect to different environments (NODE_ENV=production, NODE_ENV=staging) etc. </blockquote>

##Usage 

It's very simple to setup and use <b> confm </b>. Confm also reads from the environment by default.

Sample:

```javascript
const Conf = require('confm');
Conf.set('HOST', '127.0.0.1');
Conf.set('PORT', 9337);

console.log('HOST: ', Conf.get('HOST'));
console.log('PORT: ', Conf.get('PORT'));
console.log('USER: ', Conf.get('USER'));
```

Now if you run the script above:

```bash
USER=root node script.js
```

The output will be:

```bash
HOST:  127.0.0.1
PORT:  9337
USER:  root
```

## Intialize config

 
```javascript
const Conf = require('confm');
const config = {
  defaults: {
    HOST:  '127.0.0.1',
    PORT:  9337,
    USER:  'root'
    OBJECT: {
    	RANDOM: 'random'
    }
  },
  staging: {
    HOST: 'https://staging.co'
  },
  production: {
    HOST: 'https://production.co',
    PORT: 9335
  }
}

Conf.init(config);
console.log(Conf.get().HOST);

```

* Now if you run the script above:

```bash
NODE_ENV=staging node script.js
```

* The output will be:

```bash
https://staging.co
```

###### Description: 
<b>confm</b> reads the key-value pairs from defaults key of the config passed in `Conf.init(config)`. If there is any key that is in defaults and also in the environment then the value in the enviroment is given precedence. This means that if you run the above script with `HOST=localhost node script.js` then the output would be `localhost` and not `127.0.0.1`. 

* Note: Keys present inside the `staging` or `production` key. i.e. the objects whose keys are used for a specific `NODE_ENV` have precedence over both environment <b>and</b> defaults keys. In the above example, in the production object the host and port both will override the defaults and environment keys. 

 




