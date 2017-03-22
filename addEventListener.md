### addEventListener

이벤트리스너를 등록할때 콜백함수로 쓸 함수를 인자로 사용하게 된다.
```js
element.addEventListener('event', function);
```

콜백함수를 등록하는 여러가지 방법에 대해 알아보자.

###### 이벤트리스너 내부에서 직접 구현

```js
ele.addEventListener('event', function(evt) {
  console.log(evt.target);
});
```

###### 외부함수로 구현하고 인자로 받기

```js
function foo(evt) {
  console.log(evt.target);
}

ele.addEventListener('event', foo);
```
주의할점은 foo와 foo()는 다른 결과를 가져온다.

foo의 경우 콜백함수로 등록되지만

foo( )의 경우는 함수가 실행만 되고 등록되지 않는다.

#### 콜백함수에서 외부 변수를 사용하는 경우

###### 내부에서 직접 구현했을 경우 closure를 이용
```js
function event() {
  var name = "master";

  ele.addEventListener('event', function(evt) {
    console.log(name);
  });
}
```

###### 외부함수를 사용할 경우

```js

```
