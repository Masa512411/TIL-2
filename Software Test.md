#### unit test
자바스크립트의 최소단위인 함수를 테스트 하는 것.

복잡하지 않은 함수는 테스트 코드를 짜기 쉽고 테스트 코드를 짜기 쉬운 함수는 좋은 함수이다.

#### Software test
1. unit test : 단위 테스트, 가장 작은 단위(함수)
2. integration test : 통합 테스트, 실제 UI와 관련된 테스트, 단위 테스트들이 모인 테스트
3. system test : 전체 시스템에 대한 동작 테스트, 시스템이 잘 동작하는가 테스트 하는 것.
4. acceptance test : 고객이 ok 할 수 있는지 판단하기 위한 테스트. 인수 테스트

[http://www.seguetech.com/the-four-levels-of-software-testing/]

#### Test Library
Qunit, Mocha, chai, shouldjs

#### Given -> When -> Then
테스트 함수를 만드는 하나의 철학
[https://martinfowler.com/bliki/GivenWhenThen.html]

#### async test

#### react unit test

#### 회귀 테스트
코드가 변경됬을때 전에 만든 함수들이 제대로 동작하는지 테스트

#### 멀티 브라우저 테스트

#### 귀찮은 브라우저 테스트 해결 - Headless Testing
1. PhantomJS
1. Chrome headless

#### Performance test
함수단위 성능측정
- console.time, console.timeEnd

#### TDD - Test Driven Development
1. 테스트 코드 작성
2. 실패하는지 확인
3. 코드를 수정
4. 모든 테스트가 성공하는지 확인
5. 중복제거(리팩토링)

#### Test Coverage
내 테스트 코드가 원코드를 어느 정도까지 테스트할 수 있는지의 범위

내가 짠 코드에 대한 품질은 내가 증명할 수 있어야 한다.
