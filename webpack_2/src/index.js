import './css/main/index.less';
import './css/main/base.css'

class Animal {
    constructor(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
}

const dog = new Animal('dog');

console.log('aaa');
