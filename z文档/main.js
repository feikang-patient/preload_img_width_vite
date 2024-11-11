import foo from './foo.js';
import('./dynamic.js').then((m) => {
    console.log('main', m.default);
});
console.log('main', foo, bar);
import bar from './bar.js';
