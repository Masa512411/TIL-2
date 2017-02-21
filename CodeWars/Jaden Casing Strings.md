## Jaden Casing Strings
[DIY](http://www.codewars.com/kata/5390bac347d09b7da40006f6/train/javascript)

Description:

>Jaden Smith, the son of Will Smith, is the star of films such as The Karate Kid (2010) and After Earth (2013). Jaden is also known for some of his philosophy that he delivers via Twitter. When writing on Twitter, he is known for almost always capitalizing every word.

>Your task is to convert strings to how they would be written by Jaden Smith. The strings are actual quotes from Jaden Smith, but they are not capitalized in the same way he originally typed them.

>Example:

>```
Not Jaden-Cased: "How can mirrors be real if our eyes aren't real"
Jaden-Cased:     "How Can Mirrors Be Real If Our Eyes Aren't Real"
```

>Fundamentals, Strings, Arrays

### My Solutions
```js
String.prototype.toJadenCase = function () {
  return this.split(' ').map(function(str) { return str.replace(/\w/, str[0].toUpperCase()); }).join(' ');
};
```

### Best Solutions
```js
String.prototype.toJadenCase = function () {
  return this.split(" ").map(function(word){
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(" ");
}
```

```
문자열을 split으로 나누고 map을 사용해 나눠진 문자열의 앞부분을 찾아 toUpperCase로 대문자로 변환 replace로 치환 시키는 방법으로 풀이.

문자열 앞부분을 대문자로 변환한 후 나머지 부분을 slice로 붙여서 return 시키는 방법.

replace를 사용 할거면 split으로 나누지 말고 치환하는 방법을 생각하는게 좋을듯.
String.prototype.toJadenCase = function () {
  return this.replace(/(^|\s)[a-z]/g, function(x){ return x.toUpperCase(); });
};
```
