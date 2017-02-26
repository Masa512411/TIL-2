## Is this a triangle?

[DIY](http://www.codewars.com/kata/56606694ec01347ce800001b/train/javascript)

Description:

>Implement a method that accepts 3 integer values a, b, c. The method should return true if a triangle can be built with the sides of given length and false in any other case.

>(In this case, all triangles must have surface greater than 0 to be accepted).

>FUNDAMENTALS, MATHEMATICS, ALGORITHMS, NUMBERS, UTILITIES

### My Solutions
```js
function isTriangle(a,b,c)
{
  if(a <=0 || b <= 0 || c <= 0) {
    return false;
  }
  else if(check(a, b, c) && check(b, a, c) && check(c, a, b)) {
    return true;
  } else {
    return false;
  }
  
}

function check(a, b, c) {
  if(a < (b + c)) {
    return true;
  } else {
    return false;
  }
}
```

### Best Solutions
```js
function isTriangle(a,b,c)
{
   return a + b > c && a + c > b && c + b > a;
}
```
