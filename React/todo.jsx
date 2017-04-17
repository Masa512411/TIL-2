// store를 처음 생성할때 필요한 reducer 함수 생성
const todoReducer = (state = []/* 함수 생성시 인자에 디폴트 값 넘겨주기 */, action) => {
  console.log(state, action);
  // switch 문으로 액션타입에 따라 동작
  switch(action.type) {
    case 'ADDTODO':
      return [...state, action.todo];

    default:
      return state;
  }
}

const { createStore } = Redux; // 객체 생성 아님 ES6문법
const store = createStore(todoReducer);  // reducer를 받아 store 객체 생성



// Todo Component
class Todo extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

//   addTodo(evt) {
//     store.dispatch({  // action 은 따로 만들어주거나 객체형식으로 디스패쳐에 바로 사용해도 가능
//       type: 'ADDTODO',
//       todo: evt.target.previousSibling.value
//     });
//   }

  render() {

    let {data, addTodo} = this.props;
    let listHtml = "";

    if(typeof data !== 'undefined') {
      listHtml = data.map((v, i) => {
        return (<li key={i}>{v}</li>)
      });
    }

    return (
      <section>
        <h2>My Todo</h2>
        할 일 : <input type="text"></input><button onClick={addTodo}>add</button>
        <ul>
          {listHtml}
        </ul>
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    "data": state
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo(evt) {
      dispatch({
        type: 'ADDTODO',
        todo: evt.target.previousSibling.value
      })
    }
  }
}

const { connect } = ReactRedux;
const TodoContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Todo);

const render = () => {
  console.log("render called");
  ReactDOM.render(
    <TodoContainer store={store} />, document.querySelector("#wrap")
  )
}

// store 구독, store에 어떤 변경 사항이 있을 경우 render 함수가 실행된다.
store.subscribe(render);

render();

/*************************/

class TodoList extends React.Component {
  constructor() {
    super();
  }

  render() {
    let data = this.props.data;
    let listHtml = "";

    if(typeof data !== 'undefined') {
      listHtml = data.map((v, i) => {
        return (<li key={i}>{v}</li>)
      });
    }

    return (
      <ul>
        {listHtml}
      </ul>
    )
  }
}



// store를 처음 생성할때 필요한 reducer 함수 생성
const todoReducer = (state = []/* 함수 생성시 인자에 디폴트 값 넘겨주기 */, action) => {
  console.log(state, action);
  // switch 문으로 액션타입에 따라 동작
  switch(action.type) {
    case 'ADDTODO':
      return [...state, action.todo];

    default:
      return state;
  }
}

const { createStore } = Redux; // 객체 생성 아님 ES6문법
const store = createStore(todoReducer);  // reducer를 받아 store 객체 생성



// Todo Component
class Todo extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

//   addTodo(evt) {
//     store.dispatch({  // action 은 따로 만들어주거나 객체형식으로 디스패쳐에 바로 사용해도 가능
//       type: 'ADDTODO',
//       todo: evt.target.previousSibling.value
//     });
//   }

  render() {

    let {data, addTodo} = this.props;


    return (
      <section>
        <h2>My Todo</h2>
        할 일 : <input type="text"></input><button onClick={addTodo}>add</button>
        <TodoList
          data={data} />
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    "data": state
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo(evt) {
      dispatch({
        type: 'ADDTODO',
        todo: evt.target.previousSibling.value
      })
    }
  }
}

const { connect } = ReactRedux;
const TodoContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Todo);

const render = () => {
  console.log("render called");
  ReactDOM.render(
    <TodoContainer store={store} />, document.querySelector("#wrap")
  )
}

// store 구독, store에 어떤 변경 사항이 있을 경우 render 함수가 실행된다.
store.subscribe(render);

render();


http://jsbin.com/gihidov/edit?js,output
http://jsbin.com/xukeruy/4/edit?js,output
