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

res.render('email.ejs', {'email' : req.body.email}) // 'email.ejs'라는 템플릿파일과 오브젝트 형식의 데이터를 결합하여 클라이언트에게 보내준다.
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

#### DB 데이터 추가 방법
```js
var body = req.body
var email = body.email
var name = body.name
var passwd = body.password

// 기본적인 insert 쿼리 문장
var query = connection.query('insert into user (email, name, pw) values ("' + email + '", "' + name + '", "' + passwd + '")', function(err, rows) {
  if(err) throw err

  if(rows) {
    console.log(rows)
  }
})

// set을 이용한 insert 쿼리 문장
var sql = {email : email, name : name, pw : passwd}
var query = connection.query('insert into user set ?', sql, function(err, rows) {
  if(err) throw err

  if(rows) {
    console.log(rows)
  }
})
```
insert 쿼리문이 성공하면 rows에 해당하는 데이터 값들이 들어 있다.


#### passport 모듈을 이용한 로그인 session 처리
>로그인한 정보를 서버의 메모리나 디비에 저장하는 것

>로그인한 정보의 상태값을 확인하고 유지하면서 로직을 처리

###### 환경구축

```
npm install passport passport-local express-session connect-flash --save-dev
```
>passport : 인증관련 모듈 처리

>passport-local : 일반적인 로그인 처리 방법 사용

>express-session : session 관련 처리

>connect-flash : 리다이렉트 과정중 에러메시지 전달

>[passport](passportjs.org)

```js
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var session = require('express-session')
var flash = require('connect-flash')
```

###### middleware 설정
```js
app.use(session({
  secret : 'keyboard cat',
  resave : false,
  saveUninitialized : true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
```

session 사용 간 디폴트 값들 : secret, resave, saveUninitialized 세 값은 꼭 넣어줘야함.


###### passport strategy 만들기

```js
passport.use('local-join', new LocalStrategy({
  usernameField : 'email',
  passwordField : 'password',
  passReqToCallback : true
}, function(req, email, password, done) {
  console.log('local-join callback called')
}
))
```

form 태그를 통해 전달받는 input 값의 이름들을 적어준다.

passReqToCallback : 콜백함수에게 값을 전달해 주겠다.

콜백함수에서 디비에 저장된 값과 같은지 확인하는 절차를 수행한다.

###### passport router 처리 디폴트 방식
```js
router.post('/', passport.authenticate('local-join', {
  successRedirect : '/main',  // 성공했을시
  failureRedirect : '/join',  // 실패했을시
  failureFlash : true
}))
```

콜백함수를 쓰거나 객체리터럴을 넘겨주면 authenticate가 처리를 할 것이다.

###### passport strategy callback 함수 만들기

```js
router.get('/', function(req, res) {
  var msg;
  var errMsg = req.flash('error') // flash 모듈을 사용하여 에러메시지 받아오기
  if(errMsg) msg = errMsg
  res.render('join.ejs', {message : msg})
})

passport.serializeUser(function(user, done) {
  done(null, user.id)
})

passport.deserializeUser(function(id, done) {
  done(null, id)
})

passport.use('local-join', new LocalStrategy({
  usernameField : 'email',
  passwordField : 'password',
  passReqToCallback : true
}, function(req, email, password, done) {
  var query = connection.query('select * from user where email=?', [email], function(err, rows) {
    if(err) return done(err)

    if(rows.length) {
      console.log('existed user')
      return done(null, false, {message : 'your email is already used'})  // 실패사항일때
    } else {
      var sql = {email : email, password : password}
      var query = connection.query('insert into user set ?', sql, function(err, rows) {
        if(err) throw err
        return done(null, {'email' : email, 'id' : rows.insertId})  // 성공했을때, serialize 부분을 통해 done 함수가 실행된다.
      })
    }
  })
}
))
```

done 함수를 통해서 결과값을 리턴해준다.

done(null, false) false 이면 실패했을때 리다이렉트 페이지로 넘어가며 메세지를 넘겨주게 된다.

넘겨준 메시지는 리다이렉트 페이지 url의 라우터 처리함수에서 req.flash('error')를 통해 받아올수 있다.

serializeUser : 로그인에 성공했을때 정보를 session에 저장하는 역할이다.

deserializeUser : 페이지 이동 시 session 정보를 넘겨주는 역할이다. req.user 객체로 사용 할 수 있다.

두 함수는 필수로 쓰이는 함수이다.

###### custom callback 만들어서 ajax 요청에 json으로 응답하기, 로그인(login)
```js
router.post('/', function(req, res, next) {
  passport.authenticate('local-login', function(err, user, info) {
    if(err) res.status(500).json(err)
    if(!user) return res.status(401).json(info.message)

    req.logIn(user, function(err) {
      if(err) return next(err)
      return res.json(user)
    })
  })(req, res, next)
})
```

발생하는 모든 상황을 json 형식으로 응답한다. 로그인이 성공되면 session에 정보가 저장되며 user 객체를 클라이언트에게 응답한다.

로그인 성공하면 req.logIn의 user 객체에 데이터가 넘겨진다.

###### 로그아웃(logout)
```js
router.get('/', function(req, res) {
  var id = req.user
  if(!id) res.render('login.ejs')
  res.render('main.ejs', {'id' : id})
})
```

세션값이 없으면 로그인 페이지로 리다이렉트 시키고 세션값이 있으면 메인페이지로 유저정보와 함께 리다이렉트 시킨다.

```js
app.get('/logout', function(req, res) {
  res.logout()
  res.redirect('/')
})
```

로그아웃 모듈을 만들고 처리해준다.

res.render와 res.redirect의 차이점을 잘 생각해보자
render는 url은 바뀌지 않고 내부의 html만 바뀌고
redirect는 url 자체를 변경시켜 새로운 페이지로 이동한다.

#### npm script

#### Restful API

REpresentational State Transfer : 네트워크 어플리케이션의 구조적인 스타일 중의 하나

###### REST한 방식의 API란
- 웹을 근간으로 하는 HTTP Protocol 기반이다.
- 리소스(자원)는 URI(Uniform Resource Identifiers)로 표현하며 말 그대로 '고유'해야한다.
- URI는 단순하고 직관적인 구조여야 한다.
- 리소스의 상태는 HTTP Methods를 활용해서 구분한다.
- xml/json을 활용해서 데이터를 전송한다.(주로 json)
- URI는 동사보다는 명사를 주로 활용해서 나타낸다.

###### CRUD
네트워크를 통해 웹 리소스(Resource)를 다루기 위한 행위들
- Create(POST)
- Retrieve(GET)
- Update(PUT)
- Delete(DELETE)

###### API Design
- 복수명사를 사용(/movies)
- 필요하면 URL에 하위 자원을 표현(/movies/23), (/movies/titanic) - 단수명사의 할용 (/복수명사/단수명사)
- 필터조건을 허용 할 수 있다(/movies?state=active)
- API 개발간의 버전을 표시할 수도 있다.(OPEN API)

###### Example
| URL | Methods | 설명 |
| :------------- | :------------- | :------------- |
| /movies        | GET            | 모든 영화리스트 가져오기   |
| /movies        | POST           | 영화 추가하기           |
| /movies/:title | GET            | title 해당 영화 가져오기 |
| /movies/:title | DELETE         | title 해당 영화 삭제    |
| /movies/:title | PUT            | title 해당 영화 업데이트 |
| /movies?min=9  | GET            | 상영중이 영화리스트       |

###### RESTful API GET
```js
router.get('/', function(req, res) {
  var responseData = {}

  var query = connect.query('select title from movie', function(err, rows) {
    if(err) throw err

    if(rows.length) {
      responseData.result = 1
      responseData.data = rows
    } else {
      responseData.result = 0
    }

    res.json(responseData)
  })
})
```

###### RESTful API POST
```js
router.post('/', function(req, res) {
  var title = req.body.title
  var type = req.body.type
  var grade = req.body.grade
  var actor = req.body.actor

  var sql = {title, type, grade, actor} // es6 문법
  var query = connect.query('insert into movie set ?', sql, function(err, rows) {
    if(err) throw err

    return res.json({'result' : 1})
  })
})
```

###### RESTful API GET SUB-URI
```js
router.get('/:title', function(req, res) {
  var title = req.params.title

  var responseData = {}

  var query = connect.query('select * from movie where title = ?', [title], function(err, rows) {
    if(err) throw err

    if(rows[0]) {
      responseData.result = 1
      responseData.data = rows
    } else {
      responseData.result = 0
    }

    res.json(responseData)
  })
})
```

###### RESTful API DELETE
```js
router.delete('/:title', function(req, res) {
  var title = req.params.title

  var responseData = {}

  var query = connect.query('delete from movie where title = ?', [title], function(err, rows) {
    if(err) throw err

    if(rows.affectedRows > 0) {
      responseData.result = 1
      responseData.data = title
    } else {
      responseData.result = 0
    }

    res.json(responseData)
  })
})
```
