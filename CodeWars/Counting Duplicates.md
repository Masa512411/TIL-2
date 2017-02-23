## Counting Duplicates
[DIY](http://www.codewars.com/kata/54bf1c2cd5b56cc47f0007a1/train/javascript)

Description:

>Count the number of Duplicates

>Write a function that will return the count of distinct case-insensitive alphabetic characters and numeric digits that occur more than once in the input string. The input string can be assumed to contain only alphanumeric characters, including digits, uppercase and lowercase alphabets.

>Example

>"abcde" -> 0 # no characters repeats more than once

>"aabbcde" -> 2 # 'a' and 'b'

>"aabbcdeB" -> 2 # 'a' and 'b'

>"indivisibility" -> 1 # 'i'

>"Indivisibilities" -> 2 # 'i' and 's'

>"aa11" -> 2 # 'a' and '1'

>FUNDAMENTALS, STRINGS

### My Solutions
```js
function duplicateCount(text){
  var count = 0;
  var arr = text.toLowerCase().split('').sort();
  var index = null;

  for(var i = 0; i < arr.length; i++) {
    if(arr[i] === arr[i+1] && index !== arr[i]) {
        count++;
        index = arr[i];
    }
  }
  return count;
}
```

### Best Solutions
```js
function duplicateCount(text){
  return (text.toLowerCase().split('').sort().join('').match(/([^])\1+/g) || []).length;
}
```

```
text를 소문자로 바꾸고 split으로 나눠 오름차순으로 sort후 join으로 합쳐 match로 중복되는 문자를 찾아내서 몇개인지 리턴하면 되는것 까진 알았는데 중복되는 문자를 찾아내는 정규표현식을 생각해 내질 못했다.
/([^])\1+/g) || []
[^] single character, 한 문자를 나타내는 정규표현식이다.
.도 한 문자를 나타내지만 .은 \n, \r를 무시한다.
모든 것을 찾고 싶으면 [^]을 쓰도록 하자.
([^]) Grouping, 정규표현식으로 찾은 문자나 문자열을 재사용하기 위해 그룹핑 한 것이다.
\n 그룹핑한 문자나 문자열의 역 참조이다. n은 숫자로 몇번째 그룹을 참조할지 나타낸다.
\1+ 첫번째 그룹을 참조하고 이 그룹은 1개거나 그 이상일 수도 있다.
|| or, 빈 문자열을 처리하기위해 사용
```
[정규표현식 연습 사이트](http://www.regexr.com/)
