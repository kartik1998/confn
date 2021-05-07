import Env from './confm/env';

const env = new Env();

env.set('live', { set: 'two', ref: 'one' });
env.override('work', { sde: '1' });

console.log(env);
