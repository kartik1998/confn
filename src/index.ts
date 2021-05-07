import Env from './confm/env';

const env = new Env();

env.set('live', { set: 'two', ref: 'one' });
env.override('work', { sde: '1' });

console.log(env);
console.log(env.get('npm_config_save_dev'));
console.log(env.hardSet('npm_config_save_dev', 'yoo'));
console.log(env.get('npm_config_save_dev'));
