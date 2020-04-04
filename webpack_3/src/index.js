import "./css/main/index.less";
import "./css/main/base.css";
import A from "./a";

class Animal {
  constructor(name) {
    this.name = name;
  }
  getName() {
    return this.name;
  }
}

const dog = new Animal("dog");

console.log("aaa===>" + dog.name);

A();

console.log("$, _map========>", $, _map);

console.log(DEV)

document.getElementById("btn").onclick = function() {
  import("./handle").then(fn => fn.default());
};

fetch("/api/user")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(err => console.log(err));

$("#login").click(function() {
  console.warn("xxxxxxx");
  location.href = "/login.html";
});

if (module && module.hot) {
  module.hot.accept();
}
