## Simple Encryption #1 - Alternating Split

[DIY](http://www.codewars.com/kata/57814d79a56c88e3e0000786/train/javascript)

Description:

>For building the encrypted string:

>Take every 2nd char from the string, then the other chars, that are not every 2nd char, and concat them as new String.

>Do this n times!

>Examples:

>```
"This is a test!", 1 -> "hsi  etTi sats!"

>"This is a test!", 2 -> "hsi  etTi sats!" -> "s eT ashi tist!"
```
>Write two methods:

>```
function encrypt(text, n)

>function decrypt(encryptedText, n)
```
>For both methods:

>If the input-string is null or empty return exactly this value!

>If n is <= 0 then return the input text.

>FUNDAMENTALS, CRYPTOGRAPHY, SECURITY, ALGORITHMS, STRINGS, ARRAYS

### My Solutions
```js
function encrypt(text, n) {
  if(text === null) {
    return text;
  }

  for(var i = 0; i < n; i++) {
    var odd = [];
    var even = [];
    for(var j = 0; 2 * j < text.length; j++) {
      odd.push(text[2 * j + 1]);
      even.push(text[2 * j]);
    }
    text = odd.concat(even).join('');
  }

  return text;
}

function decrypt(encryptedText, n) {
  if(encryptedText === null) {
    return encryptedText;
  }
  for(var i = 0; i < n; i++) {
    var prev = encryptedText.split('').slice(0, Math.floor(encryptedText.length/2));
    var next = encryptedText.split('').slice(Math.floor(encryptedText.length/2));
    var newString = [];
    for(var j = 0; j < encryptedText.length / 2; j++) {
      newString.push(next[j]);
      newString.push(prev[j]);
    }
    encryptedText = newString.join('');
  }

  return encryptedText;
}
```

### Best Solutions
```js
function encrypt(text, n) {
  for (let i = 0; i < n; i++) {
    text = text && text.replace(/.(.|$)/g, '$1') + text.replace(/(.)./g, '$1')
  }
  return text
}

function decrypt(text, n) {
  let l = text && text.length / 2 | 0
  for (let i = 0; i < n; i++) {
    text = text.slice(l).replace(/./g, (_, i) => _ + (i < l ? text[i] : ''))
  }
  return text
}
```
