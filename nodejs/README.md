### npm
자바스크립트 개발자들 사이에서 코드를 공유하고 재사용하기 편리하게 관리해주기 위해 만든 툴

#### nodejs 프로젝트 시작
```
npm init
name: 프로젝트 이름
version:
description: 프로젝트 설명
entry point:
test command:
git repository:
keywords:
author:
license:

// package.json 이라는 설정파일이 생긴다.
```

#### express 설치
```
npm install express --save
--save : express를 설치하면서 npm의 package.json 설정 파일에 express를 등록해라.
```

#### node_modules
```
프로젝트에 쓰일 프로그램들(modules)을 모아 놓은 폴더
```

#### express 시작
```js
var express = require('express') // require() 필요한 프로그램을 가져오는 함수
var app = express() // express() 함수를 실행시켜서 해당하는 정보를 가져옴.
app.listen(3000, function() { // port 3000으로 서버 응답 대기
  console.log("start! Server port 3000");
})

// node app.js  서버 시작
```
>express 서버는 비동기로 동작하는 서버이다.

#### nodemon
```
sudo npm install nodemon -g --save
-g : 내 pc의 모든 곳에서 쓰이는 프로그램은 글로벌로 설치하여 사용하자.

nodemon app.js  nodemon으로 서버 시작
app.js 파일의 변화를 자동으로 인식하여 서버를 재시작 해주는 프로그램이다.
```

#### GET 요청 처리
```js
app.get('/', function(req, res) {
  req.param('email') // get 요청에서 url에 따라온 데이터 파싱 방법
  res.send("<h1>hi friend</h1>")  // 일반적인 응답 방법
  res.sendFile(__dirname + "/public/main.html") // 파일을 보내고 싶을때에는 절대경로를 전부 써줘야 한다.
  // __dirname 이라는 node에서 제공해주는 최상위디렉토리 변수를 사용 할 수 있다.
})
```
>서버는 모든 url 요청에 응답값이 있어야 처리해준다.

>GET 방식은 url에 뒤에 데이터가 붙어서 서버에 요청된다.

>길이 제한이 있으며 중요한 정보가 url에 노출될 수도 있다.

#### static 파일 요청 처리
>static 파일 : html, js, css, img 등의 정적인 파일들

```js
app.use(express.static('public')) // use() : express 에게 static 파일들이 있는 폴더를 알려주는 함수
```


#### FORM 태그를 통한 POST 요청 처리
```html
<form class="" action="/email_post" method="post">
  email : <input type="text" name="email" value=""><br />
  <input type="submit" name="" value="">
</form>
```
>"/email_post" 라우팅을 통해 post 요청을 처리하는 form 태그를 만든다.

```js
app.post('/email_post', function(req, res) {
  req.body.xxx
  res.send("post response")
})
```


###### body-parser
>post 방식의 요청은 get 방식과 다르게 req.param()을 쓸 수 없고
body-parser를 통해 데이터를 받아야 한다.

```
npm install body-parser --save
```

```js
var bodyParser = require('body-parser') // body-parser 프로그램 사용

app.use(bodyParser.json())  // json 형식의 post를 받을때
app.use(bodyParser.urlencoded({extended:true})) // urlencoded 형식의 post를 받을때

req.body.xxx // 오브젝트 형식으로 파일을 받는다.
```

#### ejs를 활용한 템플릿엔진(뷰엔진) 사용하기
```
npm install ejs --save
```

```js
app.set('view engine', 'ejs') // 뷰엔진은 ejs를 사용하겠다라고 세팅

res.sender('email.ejs', {'email' : req.body.email}) // 'email.ejs'라는 템플릿파일과 오브젝트 형식의 데이터를 결합하여 클라이언트에게 보내준다.
```

>view는 지정된 디렉토리네임이 있다. -> views

>email.ejs 확장자는 ejs

>치환시킬 부분은 <%= email %> 방식으로 표시한다.

```html
<h1>Welcome !! <%= email %></h1>
```

#### json을 활용한 ajax 처리
>form 태그는 document.forms[0] 으로 접근할 수 있다.

>input 태그의 값에 접근하는 방법 : document.forms[0].elements[0].value

```js
function sendAjax(url, data) {
  var data = {'email' : data};  // json 형식의 객체
  data = JSON.stringify(data);  // json 객체를 문자열로 변환시켜줘야 보낼 수 있다.
  var xhr = new XMLHttpRequest();
  xhr.open('POST', url);  //  post 방식으로 보냄
  xhr.setRequestHeader('Content-Type', 'application/json'); // 리퀘스트헤더의 콘텐츠 타입을 json 형식으로 설정
  xhr.send(data); // data와 함께 보내기
  xhr.addEventListener('load', function() {
    var result = xhr.responseText;
  });
}
```

```js
app.post('ajax_send_email', function(req, res) {
  req.body.email
  var responseData = {'result' : 'ok', 'email' : req.body.email}
  res.json(responseData)  // json 형식으로 클라이언트에게 보내주기
})
```

#### MySql 연동 설정하기
```
use databasename; // 생성되어 있는 데이터베이스를 선택하여 사용
show tables;      // 데이터베이스의 테이블을 보여주는 명령어
insert into user (email, name, pw) values ('crong@naver.com', 'crong', 'asdf'); // user 테이블을 생성하여 값을 집어 넣음  
```

mysql 설치
```
npm install mysql --save
```

```js
var mysql = require('mysql')

var connection = mysql.createConnection({ // mysql에 사용에 관한 사용자 정보 객체 생성
  host : 'localhost',
  port : 3306,
  user : 'root',
  password : 'aaaa',
  database : 'dbname'
})

connection.connect(); // mysql에 연결
```
아래 링크를 참고하여 연동시키자
[express-mysql](http://expressjs.com/en/guide/database-integration.html#mysql)

#### Mysql 연동해서 응답하기
```js
app.post('/ajax_send_email', function(req, res) {
  var email = req.body.email  // 클라이언트로부터 받은 데이타
  var responseData = {}       // 클라이언트에게 응답할 데이타 객체

  // 데이터베이스를 사용하기 위해 쿼리문 작성
  var query = connection.query('select name from user where email="' + email + '"', function(err, rows) {
    if(err) throw err       // error 처리
    if(rows[0]) {           // 정상적인 동작이면 rows로 데이타가 들어옴
      responseData.result = "ok"
      responseData.name = rows[0].name
    } else {                // 정상적인 동작이지만 해당 쿼리에 데이터가 없을시 처리
      responseData.result = "none"
      responseData.name = ""
    }
    res.json(responseData)  // 비동기 처리 방식이므로 여기에서 클라이언트에게 응답해야 한다.
  })
})
```

#### routing 모듈화
router 폴더를 만들고 처리할 main.js 파일을 만든다.
```js
var express = require('express')
var app = express()
var router = express.Router() // 익스프레스안의 라우터 함수로 라우터 사용
var path = require('path')  // 둘의 경로를 합쳐서 상대경로를 찾아주는 함수

router.get('/', function(req, res) {  // app.js에서 '/main'으로 들어오기 때문에 main.js에서 처리 할때는 루트로 처리해주어야 한다.
  res.sendFile(path.join(__dirname, '../public/main.html')) // __dirname에서 상대경로를 찾아준다.
})

module.exports = router // 모듈에 익스포트
```

app.js에서 임포트

```js
var main = require('./router/main') // main을 임포트, .js를 끝까지 안써도 작동한다

app.use('/main', main)  // 라우터가 '/main'일 경우에는 main을 쓴다
```

#### routing 모듈화에서 db연동
필요한 것들은 app.js에서와 같이 선언해주고 사용하면 된다.

router 폴더에 다른 라우팅을 처리할 email.js을 만든다.
```js
var express = require('express')
var app = express()
var router = express.Router()
var path = require('path')
var mysql = require('mysql')

var connection = mysql.createConnection({ // mysql에 사용에 관한 사용자 정보 객체 생성
  host : 'localhost',
  port : 3306,
  user : 'root',
  password : 'aaaa',
  database : 'dbname'
})

connection.connect()

router.post('/form', function(req, res) {
  console.log(req.body.email)
  res.sender('email.ejs', {'email' : req.body.email})
})

router.post('/ajax', function(req, res) {
  var email = req.body.email
  var responseData = {}

  var query = connection.query('select name from user where email="' + email + '"', function(err, rows) {
    if(err) throw err
    if(rows[0]) {
      responseData.result = "ok"
      responseData.name = rows[0].name
    } else {
      responseData.result = "none"
      responseData.name = ""
    }
    res.json(responseData)
  })
})

module.exports = router
```

app.js에서 임포트

```js
var email = require('./router/email')

app.use('/email', email)
```

모듈화를 통해 app.js의 거대화 방지

app.use 형식으로 사용한 것들은 라우터로 분리되도 같이 사용 할 수 있다.

#### 미들웨어 형식으로 라우팅 처리 리팩토링
router 폴더에 라우팅처리를 전담할 index.js 파일 생성
```js
var express = require('express')
var app = express()
var router = express.Router()
var path = require('path')

// ./main 상대경로를 지정해줘야 작동한다 *중요*
var main = require('./main')
var email = require('./email')

router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/main.html'))
})

router.use('/main', main)   // router를 익스포트 시키기 때문에 router에서 사용한다고 선언해줘야 한다.
router.use('/email', email)

module.exports = router
```

app.js에서는 index.js를 임포트 시키기만 하면 된다.
```js
var router = require('./router/index')  // 라우팅을 담당할 index.js를 가져온다

app.use(router)   // app으로 들어오는 라우팅을 router쪽으로 보낸다.
```
