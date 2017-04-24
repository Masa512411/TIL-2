## History
브라우저는 새로운 HTTP응답을 받은 웹페이지를 렌더링 할때마다 history를 남긴다.

이 history를 이용하여 뒤로가기/앞으로가기 버튼으로 이동할 수 있다.

#### Single Page에서는?

## Client Routing
브라우저는 navigation이 가능한 history 정보를 직접 추가할 수 있게 API를제공한다.
```js
history.pushState({color: color}, "", "?color="+color);
```

#### navigation으로 꺼내보기 (뒤로가기, 앞으로가기)
브라우저에서 뒤로가기, 앞으로가기 할때 pushState로 저장된 url path를 가져와서, 다시 렌더링을 할 수 있다.
```js
window.addEventListener("popstate", function(evt) {
  var style = document.querySelector(".view").style;
  style.backgroundColor = event.state.color;
})
```
히스토리에 필요한 데이터를 저장하고 뒤로가기를 눌렀을때 필요한 정보를 가져와 이벤트 처리를 해준다.

## React 에서의 Routing

#### React-router
