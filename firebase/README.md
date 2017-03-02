인증기능과
리얼타임 데이터베이스를 중점적으로
파이어베이스 호스팅
## Firebase 개발환경 설정

#### Authentication
```
1. 이메일 / 비밀번호
2. Google
3. Facebook
4. Twitter
5. Github
6. 익명
6가지 방법으로 로그인 가능
```

```
OAuth Redirection Domain
기본적으로 localhost와 프로젝트 도메인 제공
도메인 추가 가능
```

```
이메일 주소 당 복수의 계정 생성 가능
```

```
이메일 템플릿
1. 이메일 주소 인증
2. 비밀번호 재설정
3. 이메일 주소 변경
이메일 인증 방식 사용시 3가지 방법의 이메일 템플릿이 준비되어 있어 수정해서 사용하기만 하면 된다.
```
#### Database
```
데이터
실시간 클라우드 호스팅 데이터베이스
데이터는 모두 json 형식으로 저장된다.
연결되어 있는 모든 클라이언트에게 실시간으로 동기화 된다.
오프라인에서는 디스크에 데이터를 캐쉬로 저장 원활한 동작 지원
오프라인에서 온라인으로 전환될시 최신 상태로 서버와 동기화

데이터가 추가되거나 변경되면 클라이언트에게 바로바로 동기화 - 와우 -
```

```
규칙
해당 데이터베이스의 읽기, 쓰기 권한 설정
추가, 수정, 조회, 삭제
시뮬레이터로 권한 설정이 제대로 되었는지 확인 가능
```

```
사용량 확인 페이지와
백업 페이지
```

## 로컬개발환경설정
```
node.js 설치
sudo npm install firebase-tools -g
Firebase CLI 권한 설정 : firebase login
Firebase 프로젝트 목록 보기 : firebase list
Firebase 프로젝트 시작 : firebase init
데이터베이스 룰 환경설정과 호스팅 메뉴가 나옴
데이터베이스 룰 환경설정을 선택하고 프로젝트를 선택하면 룰 설정가능(기존의 json 형태 사용)
호스팅 메뉴 : public 디렉토리를 사용할 것인지(사용) index페이지를 rewrite 할것인지(y)

완료되면 firebase.json 파일에 설정이 저장됨.
```

```
파이어베이스 서버 시작하기 : firebase serve
```

## Firebase 시작하기
```
overview의 웹추가하기에서 script를 html에 복사
```

## Firebase 배포, 호스팅
```
전세계에 배포하기 : firebase deploy
```

1. 인증기능을 이용한 구글창 호출
```js
var auth; // auth 변수 선언
auth = firebase.auth();
var authProvider = new firebase.auth.GoogleAuthProvider(); // 구글인증 객체 생성
auth.signInWithPopup(authProvider); // 팝업형식으로 인증창 생성, 구글인증 사용
```
2. 구글 성공 - 메모리스트 출력, 실패 - 구글 인증창 다시 호출
```js
// 인증상태 변화에 따라 콜백함수를 사용하여 성공, 실패시 구현
auth.onAuthStateChanged(function(user) { // 콜백함수는 user 정보를 받는다.
  if(user) {
    // 인증 성공시
  } else {
    // 인증 실패시
  }
});
```
3. 메모 출력 기능
```js
var database; // database 변수 선언
database = firebase.database();

var memoRef = database.ref('memos/' + userInfo.uid);  // 데이터베이스 레퍼런스 받아오기. 유저의 uid값을 사용하여 전부 불러옴.
memoRef.on('child_added', function(data) {  // 데이터가 추가되었을때 불러지는 콜백함수. 값을 여러개 가져오는 경우는 on을 사용한다. 비동기적으로 들어오는 데이터 처리 'child_added'
  console.log(data.val());  // 해당 데이터의 값을 가져오는 함수 .val()
});

// json 데이터 구조
{
  memos : {
    uid : { text : "텍스트"},
    uid : { text : "텍스트"},
    uid : { text : "텍스트"}
  }
}
```
```
파이어베이스의 데이터베이스는 값이 비동기적으로 들어오게 되어있음.
콜백함수를 사용하여 값이 추가될때마다 일을 수행해야 함.
```
4. 메모 저장 기능
```js
memoRef.push({  // 데이터베이스 저장하기
  txt : txt,
  createDate : new Data().getTime()
});
```
```
JSON 형태로 데이터만 만들어준 후 push 하면 저장됨.
자동 동기화 기능 덕에 메모가 저장되면 메모 출력 기능에서 만들어놓은 on_child_added 콜백함수가 자동으로 실행됨.
```
5. 메모 한건 출력 기능
```js
function fn_get_data_one(key) { // 자동으로 생성된 키 값을 사용하여 해당하는 키의 데이터만 가져와서 사용함.
  var memoRef = database.ref('memos/' + userInfo.uid + '/' + key)
    .once('value').then(function(snapshot) {  // 값을 한개만 가져올것이기 때문에 once를 사용함. promise함수 사용.
      $(".textarea").val(snapshot.val().txt); // snapshot 이란 변수 사용
    })
}
```
5. 메모 수정 기능
```js
memoRef = database.ref('memos/' + userInfo.uid + '/' + selectedKey);  // 키값을 통해 특정 데이터에 레퍼런스 생성
memoRef.update({  // update를 통해 수정
  txt : txt,
  createDate : new Date().getTime(),
  updateDate : new Date().getTime()
});
```

```js
memoRef.on('child_changed', function(data) {  // 데이터가 수정되었을때 수행할 콜백함수 'child_changed'
  var key = data.key;
  var txt = data.val().txt;
  var title = txt.substr(0, txt.indexOf("\n"));

  $("#" + key + " > .title").text(title);
  $("#" + key + " > .txt").text(txt);
});
```
6. 메모 삭제 기능
```js
function fn_delete_data(key) {
  if(!confirm("삭제하시겠습니까?")) {
    return;
  }
  var memoRef = database.ref('memos/' + userInfo.uid + '/' + key);
  memoRef.remove(); // key값으로 데이터 삭제
  $("#" + key).remove();  
}
```
