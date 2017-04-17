## Create React App

#### CRA 추가 빌드 설정

- Webpack

소드코드를 읽어 브라우저에서 잘 동작하는 하나의 Bundle로 만드는 것이 목표이다.

이 과정중에 몇가지 task를 추가적으로 수행할 수 있다.

>소스코드의 품질 확인(정적으로 문제가 없는 코드인지)

>module loader기능(브라우저에서 지원하지 않는 import나 require를 동작할 수 있게 코드를 변환)

>es6, es7을 es5로 코드 변환

>소스코드를 합치거나 html에 필요한 javascript, css를 추가해서 삽입해 주기도 한다.

CRA의 Webpack 설정은 숨겨져 있어서 특수한 방법을 써야한다.
```
npm run eject
```

#### 개발용과 제품용 빌드의 차이점

개발용에 필요하지만 제품용 빌드에 불필요한 플러그인들을 제외시켜 빌드간의 속도를 향상시킬수 있다.

sourcemaps, livereloading, console.log -> 디버깅에 관련된 개발용 빌드

코드 난독화시키기, 코드 용량 줄이기 -> 최적화에 관련된 제품용 빌드

#### postcss
브라우저 제작사 마다 css 적용 방식이 다른 경우가 있는데
빌더프로그램이 해당 css를 파악하여 벤더프리픽스를 자동으로 붙여준다.
-webkit-, -o- 등등
