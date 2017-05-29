## fetch

json 파일을 받았을 경우 ```response.json()```을 사용하고

html/text 파일을 받을 경우 ```response.text()```를 사용한다.

#### credentials
fetch를 사용하는 중에 passport session 기능이 동작하지 않았다.
credentials 를 사용해야 하는 걸 찾았다.
```
fetch('/user', { credentials : 'same-origin' }).then(...);
```
