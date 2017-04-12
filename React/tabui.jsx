http://codepen.io/anon/pen/OpKgLO

class TabUI extends React.Component {
  constructor() {
    super();
    this.state = {tabs : [
      {
        "title" : "문재인",
        "body" : "출생	1953년 01월 24일, 경남 거제\n가족관계	2남 2녀 중 둘째, 배우자 김정숙, 슬하 1남 1녀\n종교	천주교\n학력	경희대학교 법학 학사, 경남고등학교\n주요경력	(현) 더불어민주당 상임고문\n(전) 더불어민주당 당 대표, 19대 국회의원\n(전) 노무현 정부 청와대 민정수석\n(전) 노무현재단 이사장\n제22회 사법시험 합격\n군필 여부	육군 병장 만기제대(특전사 출신)\n자녀 군필 여부	육군 병장 만기제대\n기타 사항	주량 - 소주 1병\n존경하는 인물	다산 정약용, 프랭클린 루스벨트\n취미	바둑, 등산"
      },
      {
        "title" : "안철수",
        "body" : "출생	1962년 2월 26일, 부산\n가족관계	2남 1녀 중 첫째, 배우자 김미경, 슬하 1녀\n종교	없음\n학력	펜실베이니아대학교 와튼스쿨 경영학 석사\n펜실베이니아대학교 대학원 공학 석사\n서울대학교 대학원 의학 박사\n서울대학교 의과대학원 의학 석사\n서울대학교 의학 학사\n부산고등학교\n주요경력	19, 20대 국회의원\n(전) 국민의당 공동대표\n(전) 안랩 이사회의장\n(전) 안철수연구소 창립, 대표이사\n군필 여부	해군 대위(군의관) 제대\n기타 사항	주량 - 안 마심\n존경하는 인물	스티브 잡스, 엘론 머스크 등 혁신가\n애창곡	사랑으로"
      },
      {
        "title" : "유승민",
        "body" : "출생	1958년 1월 7일, 대구\n가족관계	2남 1녀 중 막내, 배우자 오선혜, 슬하 1남 1녀\n종교	불교\n학력	위스콘신대학교 대학원 경제학 박사\n서울대학교 경제학 학사\n경북고등학교\n주요경력	17, 18, 19, 20대 국회의원\n(전) 한나라당 여의도연구소장\n(전) 새누리당 원내대표\n군필 여부	육군 병장 만기제대\n자녀 군필 여부	육군 병장 만기제대\n기타 사항	주량 - 소주 1병\n존경하는 인물	다산 정약용\n애창곡	김광석 ‘이등병의 편지’, 조용필 ‘바람의 노래’"
      },
      {
        "title" : "심상정",
        "body" : "출생	1959년 2월 20일, 경기 파주\n가족관계	2남 2녀 중 막내, 배우자 이승배, 슬하 1남\n종교	천주교\n학력	서울대학교 사범대학 사회교육학과 졸업\n명지여자고등학교 졸업\n주요경력	17, 19, 20대 국회의원\n정의당 당 대표\n전국금속노조 사무처장\n서울노동운동연합 중앙위원장\n서울대학교 초대 총여학생회장\n자녀 군필 여부	현역 입영 대상\n기타 사항	주량 - 맥주 500cc\n존경하는 인물	전태일\n취미	독서, 등산, 요리\n애창곡	내 하나의 사랑은 가고"
      }
    ],
    showBody : false,
    selectedTab : 0
    };
  }

  tabClick(number) {
    console.log("Click");
    this.setState({
      "showBody" : true,
      "selectedTab" : number
    });
  }

  render() {
    const data = this.state.tabs;
    const showBody = this.state.showBody;
    let currentBody;
    if(showBody) {
      const currentTab = this.state.selectedTab;
      currentBody = data[currentTab].body;
    }


    const tabLi = data.map((v,i) => {
      return (<li key={i} onClick={this.tabClick.bind(this,i)}>{v.title}</li>)
    });

    return (
      <div>
        <h2>My Tap Ui</h2>
        <ul>
          {tabLi}
        </ul>
        {(showBody) ? (<div>{currentBody}</div>) : (<div></div>)}
      </div>
    )
  }
}

ReactDOM.render(
  <TabUI/>, document.querySelector("#wrap")
)


/* css */
ul > li{
  display : inline-block;
}

li {
  list-style : none;
  border-top : 1px solid black;
  border-bottom: 1px solid black;
  border-left: 1px solid black;
  box-sizing: border-box;
  padding: .5rem;
  cursor: pointer;
}

li:last-child {
  border-right: 1px solid black;
}

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
