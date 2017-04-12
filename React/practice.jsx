http://codepen.io/anon/pen/pPzmGa

class ShowLog extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const close = this.props.onClick;
    const showLog = this.props.showLog;
    let currentNumber = this.props.selectedNumber;

    return (
      <div>
        {(showLog) ? (<div>{currentNumber} 번째 li가 선택됐어요!</div>) : (<div></div>)}
        <button onClick={close.bind(this)}>close</button>
      </div>
    )
  }
}

class MyBlogLi extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const data = this.props.data;
    const addCount = this.props.onClick;

    const myHtml = data.map((v,i) => {
      return (<li key={i} onClick={addCount.bind(this,i)}>{v.title}</li>)
    });

    return (
      <ul>
        {myHtml}
      </ul>
    )
  }
}

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

  close() {
    console.log("close");
    this.setState({'showLog':false})
  }

  render() {

    return (
      <div>
        <h2>My Blog posts</h2>
        <MyBlogLi
          data={this.state.posts}
          onClick={this.addCount.bind(this)}
          />
        <ShowLog
          onClick={this.close.bind(this)}
          selectedNumber={this.state.selectedNumber}
          showLog={this.state.showLog}
        />
      </div>
    )
  }
}

ReactDOM.render(
  <MyBlog/>, document.querySelector("#wrap")
)

/* html */
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>JS Bin</title>
</head>
<body>
  <script src="https://fb.me/react-with-addons-15.1.0.js"></script>
<script src="https://fb.me/react-dom-15.1.0.js"></script>
  <div id="wrap"></div>
</body>
</html>
