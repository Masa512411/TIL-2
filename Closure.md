### Closure

실행이 끝난 함수의 변수를 콜백함수가 부모의 변수를 가지고 있으며 사용할수 있는 영역.
자식은 부모의 값을 참조 하고 있기 때문에 어떤 경우의 수에 따라 바뀔수도 있다.
closure는 scope의 한 영역이다.


###### closure가 공유하는 변수를 특정하게 정의해서 쓰는 방법

함수로 감싸 하나의 변수를 만들어 사용하는 경우
```js
(function() {
  var list = document.querySelectorAll('li');
  var show = document.querySelector('.show');

  for(var i = 0; i < list.length; i++) {
    (function(j) { list[i].addEventListener('click', function() {
      debugger;
      show.innerText = j + 1 + '번째 과일이 선택됐습니다';
    });
  })(i);
  }
})();
```


let을 사용하는 방법
```js
(function() {
  var list = document.querySelectorAll('li');
  var show = document.querySelector('.show');

  for(let i = 0; i < list.length; i++) {
    list[i].addEventListener('click', function() {
      debugger;
      show.innerText = i + 1 + '번째 과일이 선택됐습니다';
    });
  }
})();
```
