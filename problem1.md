## 쇠막대기

[문제](https://www.acmicpc.net/problem/10799)

```js
function laser(string) {
  var prev;
  var index = 0;
  var count = 0;
	string.split('').forEach(function(val) {
    if(val === '(') {
      count++;

    } else if(prev === '(' && val === ')') {
      count--;
      index += count;

    } else if(prev === ')' && val === ')') {
      count--;
      index += 1;
    }
    prev = val;
  });

  console.log(index);
  return index;
}

var s = "()(((()())(())()))(())";
laser(s);
var a = "(((()(()()))(())()))(()())"
laser(a);
```
