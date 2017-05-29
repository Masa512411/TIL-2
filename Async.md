## Async(비동기)

비동기 콜백 이후 실행되야 할 로직은 비동기 콜백안에서만 처리가 가능하다.

## 비동기를 동기처럼 보이게 처리하는 방법

#### Promise
- then 안에 있는 콜백함수는 Promise 객체안에 resolve 함수가 실행 된 후 실행되게 된다.

#### Generator
- 비동기처리를 위한 방법은 아니지만 도움을 줄 수는 있다.
- 밖에서 함수의 실행을 조작 할 수 있는 함수
- 마치 브레이크포인트를 거는 것처럼.

#### async/await
- Promise를 알아야 하는 이유 : 다른 비동기처리 기술들이 promise를 기반으로 하기 때문에