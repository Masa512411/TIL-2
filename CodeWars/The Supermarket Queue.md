## The Supermarket Queue
[DIY](http://www.codewars.com/kata/57b06f90e298a7b53d000a86/train/javascript)

Description:

>There is a queue for the self-checkout tills at the supermarket. Your task is write a function to calculate the total time required for all the customers to check out!

>The function has two input variables:

>customers: an array (list in python) of positive integers representing the queue. Each integer represents a customer, and its value is the amount of time they require to check out.

>n: a positive integer, the number of checkout tills.

>The function should return an integer, the total time required.

>FUNDAMENTALS, ARRAYS, LOOPS, CONTROL FLOW, BASIC LANGUAGE FEATURES

### My Solutions
```js
function queueTime(customers, n) {

  var queue = customers.slice(0, n);
  var i = n;

  while(customers[i]) {
    queue.sort(function(a, b) { return a - b;});
    queue[0] = queue[0] + customers[i];
    i++;
  }

  return queue.length && queue.reduce(function(acc, val) { return (acc > val) ? acc : val;});
}
```

### Best Solutions
```js
function queueTime(customers, n) {
  var w = new Array(n).fill(0);
  for (let t of customers) {
    let idx = w.indexOf(Math.min(...w));
    w[idx] += t;
  }
  return Math.max(...w);
}
```
