## Mobile Web
- 공통점

>모바일 웹 개발이나 웹 개발이나 표준 자바스크립트를 사용한다.

- 차이점

>마우스가 없고 손가락을 이용한 터치 방식으로 이루어져 있다.

>디버깅툴이 없다.

- 결론

> 오밀조밀한 UI보다는 간결하고 시원한 UI

> 핵심을 담은 UX

> 불필요한 애니메이션 보다 터치기반의 빠른 인터랙션 지원

#### viewport

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

#### Animation
모바일웹의 애니메이션은 복잡한 조작이 아니면 CSS3를 이용하는것이 가장 빠르고 쉽다.

transform, transition 속성을 사용.

CSS와 JS 애니메이션 차이점을 알아보자.
transitionend : 트랜지션이 끝나는 시점을 알 수 있다.

gpu acceleration property : gpu 가속을 사용해서 조금더 빨리 처리하는 방법.
> opacity, filter, transform

keyframes : 패턴이 있는 간단한 애니메이션 동작

더 복잡한 설정은 javascript를 활용해서 조작한다.

#### Touch Event
Touchstart
Touchmove
Touchend

마우스는 클릭이 안된 상태에서도 마우스무브가 동작하지만
터치이벤트는 터치스타트가 동작해야 터치무브가 동작한다.

스크롤이벤트는 preventDefault를 항상 탐지할려고 하기 때문에 느려질수도 있다.

터치는 손가락 여러개가 쓰일 수 있기 때문에 배열로 값이 들어온다.

touches 와 changedTouches
touches : 모든 touche 이벤트
changedTouches : 이전 대비 현재 변화가 일어난 모든 touche 이벤트
changedTouches 만 쓰면 대부분 해결된다.

#### Media Query
폭과 같은 속성에 의해서 분기처리가 가능하다.

PC -> Mobile, Mobile -> PC 둘다 가능하다. 기획전략에 따라 계획을 세우자.

#### debugging
쉽지는 않지만 여러 툴이 나오고 있다.

프록시, 피들러

#### end page
