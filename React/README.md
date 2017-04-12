리액트를 만들어볼까???

프레임워크와 라이브러리는 왜 써야하는지 필요성과 이유를 가지고 사용해야한다.

요즘 추세는 클라이언트에서 모델을 사용, 서버의 부담을 덜어준다.

#### Library
- 개발단계에서 자주 사용되는 기능을 묶어서 제공.
- 주로 범용적으로 사용 할 수 있는 함수 단위로 제공

#### Framework
각각의 기능함수들이 연결되어 있다. 처음부터 끝까지의 틀이 있다.
완전한 틀을 제공하기 때문에 수정사항을 반영하기 어렵다.
우리가 만들어준 틀대로 서비스를 만들어라.
- 애플리케이션 대부분 개발에 필요한 기능을 제공 : DOM, EVENT, Template, Ajax, Module 등
- 정해진 '틀'을 제공함으로써 다양한 패턴을 찾아가며 결정하지 않아도 됨.
- 숙련되지 않은 개발자들도 평균수준을 유지 할 수 있음.
- 헙업에 유리

#### SPA(Single Page Application)
한 페이지 내에서 안정적으로 동작을 주고 받는다.
템플릿을 모듈화해서 관리한다. 그만큼 클라이언트에서 템플릿과 돔조작이 많다.
- 서버에서는 API만 주로 제공하고, 클라이언트에서 Ajax와 Template 작업을 통해 동작하는 Rich한 웹기반 애플리케이션

URL로 유니크한 리소스를 공유할 수 있는 점이 웹과 앱의 차이이다.(페이크 URL을 만들어 서버에서 라우팅 처리를 한다.)

backbone, Angular, React, Vue

프레임워크를 사용하여 밀도있게 프로젝트를 만들고 프레임워크의 단점이 무엇인지 파악해보자.
프레임워크를 사용하기 위해 프레임워크간에 심도있는 장단점을 파악하고 우리 서비스에 최적의 프레임워크를 찾아야 된다.(1번을 쓰느냐, 2번을 쓰느냐, 둘다 안쓰느냐)

#### UI 개발 트렌드
- DOM 조작은 UI 개발의 주요한 부분이다.
- DOM 조작은 여전히 어렵고 귀찮다.
- DOM 조작은 여전히 느리다.
UI는 재사용이 어렵다. 웹사이트들은 전부다 다르니까.
- component 단위의 개발을 통한 효율성. (HTML과 CSS, JavaScript를 하나로 묶어서 개발)
component는 스타일과 기능이 같아야 한다. 재사용이 될 것 같다.
- SPA에서 데이터 처리가 많이 필요로 하는 경우도 많음.

프론트엔드 개발자가 구조(HTML, CSS)와 기능(JavaScript)을 같이 개발하는 Component 스타일의 개발

#### React의 친구들
- 거대함을 벗어나 view 작업에 좀더 집중하자.
- 넌 렌더링에 신경쓰지마!
- DOM 조작을 위해 template을 별도 분리하지 말고, UI컴포넌트 단위로 그안에서 표현해두자.
- DOM 조작에 필요한 view의 표현은 HTML과 유사하게 하자 : JSX
- virtual DOM으로 DOM 조작을 최대한 효율적으로 하자.
>변경이 일어난 부분만 수정하려고 노력
>재사용을 하면서 속성을 변경할 수 있으면 그렇게 변경.
>그렇다고 DOM API를 사용해서 직접 개발하는 것보다 빠르지는 않다.

![](https://i.stack.imgur.com/S1vng.png)

프레임워크간의 성능속도차이는 거의 의미가 없다. 실사용자들에게는 거의 체감차이가 없는 경우가 많다.

- ES6 Class를 단위 컴포넌트의 틀로 사용 할 수 있다.(function이나 prototype등 다른 방법으로도 만들수 있다.)
- import / export 를 통한 모듈(클래스로 만든) 의존성을 관리하자.(webpack, 아직 지원은 하지 않지만 빌더들을 사용해 가능)
- 그외 React를 개발하면서 es6의 feature를 쓰는 건 자연스러운 일이다.

리액트는 함수를 많이 사용하는 라이브러리를 지향하는 프레임워크이다.

#### Component 코드 살펴보기
```js
class MyBlog extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <h2>My Blog posts</h2>
    )
  }
}

ReactDOM.render(
  <MyBlog/>, document.querySelector("#wrap")
)
```

render가 실행되기전에 한번, render가 실행된 후의 한번 동작할 행동들을 지정할 수 있다.
this.state = {} 생성된 클래스의 데이터들을 담아 두는 곳.
react는 setstate()가 불릴때마다 state가 바뀌고 render()가 실행되서 돔이 변경된다.(React의 철학)
조건을 달아서 예외적인 경우를 넣을 수 있다.

```js
render() {
  return (
    <div>
      <h2>My Blog posts</h2>
      <h2>Hello World</h2>
    </div>
  )
}
```
render 함수내에 겉의 태그는 하나여야 한다.

#### webpack

코드 변환, 불러오기 : loader
코드 최적화 : plugin

파일명을 js를 사용해도 되는데 jsx도 사용하는 이유
jsx 문법을 사용한 react view의 문서라는 의미를 강하게 내포하기 위해.

react best practice 의 코드 제작자가 원제작자인 것을 찾아보자.

경험이 없으면 Angular(기본적인 틀이 있어서 적용하기 쉽다) 경험이 어느 정도 있으면 React(필요한 컴포넌트들을 개발해서 넣기 쉽다)

iterator가 되는 태그들은(li) key 속성을 부여해주면 virtual DOM이 작업하기 수월해진다.
key 값은 1,2,3,4 같은 숫자보다는 데이터의 고유한 값으로 넣는 것이 좋다.

#### Component에 Event 등록해보기
```js
class MyBlog extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  handleClick(e) {
    console.log("this is", this);
  }

  render() {
    return (
      <li onClick={this.handleClick}>hi</li>
    )
  }
}

ReactDOM.render(
  <MyBlog/>, document.querySelector("#wrap")
)
```

react 내부적으로 event delegation 으로 이벤트를 등록한다.(document에 등록된다)

#### event로 state 값 바꾸기
```js
class MyBlog extends React.Component {
  constructor() {
    super();
    this.state = {posts : [
      {
        "title": "sunt aut facere repellat",
         "body": "quia et suscipit\nsuscipit"
      },
      {
        "title": "qui est essexxxxx",
        "body": "est rerum tempore vitae\nsequi sint"
      }
    ],
    showLog :false,
    selectedNumber : 0,              
    };
  }

  addCount(number) {
    console.log("log");
    number++;
    this.setState({'showLog':true, 'selectedNumber':number});
  }

  render() {
    const data = this.state.posts;

    const myHTML = data.map((v,i) => {
      return (<li key={i} onClick={this.addCount.bind(this, i)}>{v.title}</li>)
    });

    const bShow = this.state.showLog;
    let currentNumber = 0;
    if(bShow) currentNumber = this.state.selectedNumber;

    return (
      <div>
        <h2>My Blog posts</h2>
        <ul>
          {myHTML}
        </ul>
        {(bShow) ? (<div>{currentNumber} 번째 li가 선택됐어요!</div>) : (<div></div>)}
        </div>
    )
  }
}

ReactDOM.render(
  <MyBlog/>, document.querySelector("#wrap")
)
```
{myHTML} : 배열형식으로 값을 넘겨주면 render 함수 내에서 돔조작을 자동으로 해준다. 배열 형식으로 값을 리턴해주는 map을 쓰도록 하자.

#### 하위 컴포넌트와의 데이터 연결

this.props.XXX 를 통해서 하위 컴포넌트에서 인자로 전달 받아 사용할 수 있다.

#### functional component
렌더링만 담당하는 부분은 함수로 만들어서 리턴만 시켜주는 방식이 있다.

#### binding
React는 binding을 constructor 에서 하도록 권장한다.
굳이 안지켜도 되긴 하다.

#### React 에서 ajax 통신하기
fetch : promise 패턴을 적용한 ajax
axios

#### should component update
컴포넌트의 업데이트를 수동적으로 조절해주는 방법

#### React.createApp
리액트의 설정을 자동으로 해주는 장치

#### React-Redux
데이터, 스토어, 스테이츠, 모델 다 같은 의미이다.
react는 스토어라고 부른다.
내부적으로 스테이츠를 취합해서 스토어로 합친다.

프레임워크의 목표 : 단방향으로의 데이터 처리의 흐름으로 예측가능하고 이해하기 쉬운 프로그래밍

Redux는 React에 사용되는 데이터 처리의 플러그인일 뿐이다.

#### Flux

Action : 사용자가 일으킨 이벤트
Dispatcher : 발생한 이벤트를 store에게 알려줌
Store : store는 dispatcher에게 받은 이벤트에 따라 준비된대로 상태값을 바꾼다. 그리고난후 view 에게 상태값이 바뀌었다고 알려준다.
View : view는 store에게 값이 바꼇다고 알림을 받으면 바뀐 값을 요청하고 화면을 다시 렌더링 한다. 렌더링한 결과에 따라 다시 액션이 생겨서 디스패쳐에게 전달할 수도 있다.

Store : 상태값을 모아놓은 객체
Reducer : 상태값(스테이츠)을 바꾸는 함수들의 집합

store.dispatch(action)

#### 구독과 발행
Store 와 View의 관계 -> Redux에서 가장 중요한 부분이다.
view는 store를 구독하고 store는 발행한다(?)
root view는 store 객체를 받아서 하위 컴포넌트들에게 props로 넘겨주고 렌더링시킨다.

#### Redux
store는 이벤트가 들어올때마다 스테이츠를 새로 만든다.

Redux의 흐름
view 컴포넌트는 액션 메소드 호출
디스패쳐는 해당 액션의 결과를 객체로 반환
리듀서는 받은 객체를 해석하여 현재 스테이츠를 복사하여 새로운 스테이츠 값으로 변환
스토어는 스테이츠가 바꼈다는걸 뷰에게 알리고
뷰는 스토어에게 스테이츠를 요청 뷰를 다시 렌더링한다.

#### view layer binding
