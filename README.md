<p align="center"><img src="https://raw.githubusercontent.com/kartik1998/confn/master/confn-logo.png"> </p>

<p align="center"><b>Effortless setup for config-management in nodejs</b></p>
<p align="center"><img src="https://img.shields.io/badge/config-management-brightgreen"></p>

<blockquote>Easily setup config management for your node app with confn. It's designed to be a key-value store. Btw you can set strings, objects etc. as your values! Moreover it's designed to make it easy for you to switch between key, value pairs with respect to different environments (NODE_ENV=production, NODE_ENV=staging) etc. </blockquote>

## Usage

It's very simple to setup and use <b> confn </b>. confn also reads from the environment by default.

Sample:

```javascript
const Conf = require('confn');
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
const Conf = require('confn');
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

- Now if you run the script above:

```bash
NODE_ENV=staging node script.js
```

- The output will be:

```bash
https://staging.co
```

- Note after you have called `Conf.init(config)` you can fetch the keys from any file by using `const { KEY1, KEY2 } = require('confn').get()`

###### Description:

<b>confn</b> reads the key-value pairs from defaults key of the config passed in `Conf.init(config)`. If there is any key that is in defaults and also in the environment then the value in the enviroment is given precedence. This means that if you run the above script with `HOST=localhost node script.js` then the output would be `localhost` and not `127.0.0.1`.

- Note: Keys present inside the `staging` or `production` key. i.e. the objects whose keys are used for a specific `NODE_ENV` have precedence over both environment <b>and</b> defaults keys. In the above example, in the production object the host and port both will override the defaults and environment keys.

## set, override and hardSet

- You can use the above three methods to set keys.

```javascript
const Conf = require('confn');
Conf.set('HOST', 1);
Conf.override('HOST', 12);
Conf.hardSet('HOST', 123);
```

- The difference between these methods is that though you can use set to update / add a key, value pair. You <b> cannot set </b> a key if it has been overriden. i.e. if `Conf.override(key, value)` has been used on that specific key. However if you really want to update that key then you <b> can </b> use `Conf.hardSet(key, value)` to update that key.
- The above three methods are used in `Conf.init(config)`. First the environment keys are set by using the override method. And after that the keys under `defaults` are set. (Which is why the environment has more precedence than defaults). After that the `staging`, `production` etc. `NODE_ENV` key, value pairs are set with the `hardSet` method hence they have the highest precedence.

## Stores

- <b>confn</b> by default uses a store `env` for config management. If you want to then you can also add more stores that you might want to use.

Sample code:

```javascript
const Conf = require('confn');
const config = {
  defaults: {
    HOST: '127.0.0.1',
    PORT: 9337,
    USER: 'root',
  },
  staging: {
    HOST: 'https://staging.co',
  },
  production: {
    HOST: 'https://production.co',
    PORT: 9335,
  },
};
Conf.addStore('memory');
Conf.init(config, 'memory');
console.log(Conf.get(null, 'memory'));
```

- The code above will create a different store name `memory` where all the configuration keys will be stored. Please note that stores <b> don't </b> share any key, value information amongst each other apart from the environment key, value pairs.
- Sample output of above code:

```javscript
  .
  .
  SPACESHIP_VERSION: '3.11.2',
  SPACESHIP_ROOT: '/Users/root/.nvm/versions/node/v14.6.0/lib/node_modules/spaceship-prompt',
  P9K_TTY: 'old',
  _: '/Users/root/.nvm/versions/node/v14.6.0/bin/node',
  HOST: '127.0.0.1',
  PORT: 9337
}
```
