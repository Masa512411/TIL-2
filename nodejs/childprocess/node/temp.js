var func = function test() {
	var a = 80;
	var b = 10;
	var c = a + b;
	return c;
}

function fire(fn) {
	console.log(fn());
};

fire(func);
