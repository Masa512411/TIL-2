## 객체 지향 프로그래밍

#### 오브젝트 리터럴로 만드는 방법
bind와 this를 제대로 이해하는게 중요하다.
```js
var blog = {

  init : function() {
    this.registerEvents();
  },

  registerEvents : function() {
    var btn = document.querySelector("button");
    btn.addEventListener("click", function() {
      var url = "http://jsonplaceholder.typicode.com/posts/1";
      this.sendAjax(url);
    }.bind(this));
  },

  sendAjax : function(url) {
    var res = new XMLHttpRequest();
    res.open("GET", url);
    res.send();

    res.onreadystatechange = function() {
      if(res.readyState === 4 && res.status === 200) {
        var json = JSON.parse(res.responseText);
        this.appendData(json);
      }
    }.bind(this);
  },

  appendData : function(data) {
    var view = document.querySelector(".view");
    view.innerHTML = data.title;
  }

}

blog.init();
```

#### 클래스 개념으로 만드는 방법
```js
function Card(name) {
  this.name = name;
  this.registerEvents = function() {
    this.sendAjax();
  }
  this.sendAjax = function() {
    console.log("sendAjax");
  }

  return this; // this를 반환해주는 것이 숨겨져 있는 것이다.
}
```

#### prototype
prototype을 쓰는 이유 : 클래스를 new를 사용하여 생성할때마다 클래스 내부의 메소드도 중복되서 생성된다.
중복된 내용을 prototype을 이용해서 생성하면 상속의 개념에 의해 재사용할수 있으며 중복생성도 방지한다.
```js
function Card(name) {
  this.name = name;
}

Card.prototype.registerEvents = function() {
  this.sendAjax();
}

Card.prototype.sendAjax = function() {
  console.log("sendAjax");
}
```
prototype 객체에 함수를 재정의 하는 방법
```js
Card.prototype = {
  registerEvents : function() {
    this.sendAjax();
  },

  sendAjax : function() {
    console.log("sendAjax");
  }
}
```
