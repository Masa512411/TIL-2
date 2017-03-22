### CSS

###### LESS, SASS를 썼을때 장점

1. 변수를 사용 할 수 있다.
2. 구조화 시킬 수 있다.

구조화 작업 -> 스타일

###### 구조화 작업중 엘리먼트들의 공간을 보고 싶을때
```CSS
* {
  outline: 1px solid;
}
```

###### css 초기화
```CSS
body,div,section,ul,li,h1,h2,h3,h4,h5,h6,header,nav,footer,p {
  margin:0;
  padding:0;
}
li {
  list-style: none;
}
a {
  text-decoration: none;
}
html {
  font-size:16px; // rem 수치 조정
}
```
