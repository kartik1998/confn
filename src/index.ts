import Conf from './confm/conf';

Conf.init({
  defaults: {
    main: 'yo',
  },
  dev: {
    stage: 'yes',
  },
});

console.log(Conf.get());
