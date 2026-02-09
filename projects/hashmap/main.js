import { HashMap } from "./HashMap.js";

const test = new HashMap();

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

console.log(test.capacity); // 16
console.log(test.length()); // 12

test.set("moon", "silver");

console.log(test.capacity); // 32
console.log(test.length()); // 13

console.log(test.keys());
console.log(test.values());
console.log(test.entries());

console.log(test.has("hat")); // true
console.log(test.remove("hat")); // true
console.log(test.has("hat")); // false

console.log(test.keys());
console.log(test.values());
console.log(test.entries());
