### call
즉시 실행되는 경우에 context를 변경시킬때 사용한다.
변수를 1, 2, 3,... 같은 경우로 넘겨줄수 있다.
```js
var test = {
	getName : function(a, b, c) {
    console.log("abc -> " , a, b, c);
		return this.name;
    }
}

var test2 = {
	name : "jinny",
	printName : function() {
		console.log(test.getName.call(this, 1, 2, 3));
    }
}

test2.printName();
```

### apply
즉시 실행되는 경우에 context를 변경시킬때 사용한다.
변수를 Array 형식으로 넘겨주면 자동으로 인자를 하나씩 넣어준다.
```js
var test = {
	getName : function(a, b, c) {
    console.log("abc -> " , a, b, c);
		return this.name;
    }
}

var test2 = {
	name : "jinny",
	printName : function() {
		console.log(test.getName.apply(this, [1, 2, 3]));
    }
}

test2.printName();
```

### bind
나중에 실행되는 경우에(콜백함수) context를 변경시킬때 사용한다.
실상은 실행될때 apply와 call을 통해서 실행시킨다.
