## Exes and Ohs
[DIY](http://www.codewars.com/kata/55908aad6620c066bc00002a/train/javascript)

Description:

>Check to see if a string has the same amount of 'x's and 'o's. The method must return a boolean and be case insensitive. The string can contains any char.

### My Solutions
```js
function XO(str) {
    var numO = 0;
    var numX = 0;
    for(var i = 0; i < str.length; i++) {
      if(str.charAt(i) === 'o' || str.charAt(i) === 'O') {
        numO++;
      } else if(str.charAt(i) === 'x' || str.charAt(i) === 'X') {
        numX++;
      }
    }

    if(numO === numX) {
      return true;
    } else {
      return false;
    }
}
```

### Best Solutions
```js
function XO(str) {
  let x = str.match(/x/gi);
  let o = str.match(/o/gi);
  return (x && x.length) === (o && o.length);
}
```

```
str.match(/x/gi);
정규표현식 RegExp
g : global match. 일치하는 모든 것을 찾는다.
i : ignore case. 대소문자를 무시하고 찾는다.

x && x.length
str.match returns null if there is no character match and an array of matched characters if there are matches.
str.match 함수는 일치하는 문자가 없을 시 null을 리턴한다.

x && x.length checks that x !== null because null.length will throw an error whereas array.length will return the count.
x가 null일때 .length는 error를 리턴한다. x가 null일 경우를 체크하려고 사용한다.
```
