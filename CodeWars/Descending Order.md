## Descending Order
[DIY](http://www.codewars.com/kata/5467e4d82edf8bbf40000155/train/javascript)

Description:

>Your task is to make a function that can take any non-negative integer as a argument and return it with it's digits in descending order. Essentially, rearrange the digits to create the highest possible number.

>Examples:

>Input: 21445 Output: 54421

>Input: 145263 Output: 654321

>Input: 1254859723 Output: 9875543221

>FUNDAMENTALS, FUNCTIONSCONTROL, FLOWBASIC, LANGUAGE FEATURES

### My Solutions
```js
function descendingOrder(n){
  return parseInt(n.toString().split('').sort(function(a, b) { return b - a;}).join(''));
}
```

### Best Solutions
```js
function descendingOrder(n){
  return parseInt(String(n).split('').sort().reverse().join(''))
}

function descendingOrder(n) {
  return parseInt(n.toString().split("").sort().reverse().join(""));
}
```
