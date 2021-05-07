import Conf from './confm/conf';
import Mode from './confm/mode';

Conf.init({ 
    defaults: {
        main: 'yo'
    },
    dev: {
        stage: 'yes'
    }
});

console.log(Conf.get());