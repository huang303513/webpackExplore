import './css/main/index.less';
import './css/main/base.css'
import A from './a';

class Animal {
    constructor(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
}

const dog = new Animal('dog');

console.log('aaa===>' + dog.name);

A();

console.log('$, _map========>',$, _map)

// console.log(DEV)


document.getElementById('btn').onclick = function() {
    import('./handle').then(fn => fn.default());
}

if(module && module.hot) {
    module.hot.accept()
}

