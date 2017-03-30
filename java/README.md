### JAVA

자바를 배워봅시다.

파일이름과 public class 명은 같아야 합니다.

class 명은 대문자로 시작합니다.

메소드 명은 소문자로 시작합니다.

자바는 컴파일러 언어입니다.

반대는 인터프린터, 스크립트 언어입니다.

컴파일러
javac Hello.java
실행기
java Hello

자바는 public static void main(String[] args) 메소드에서 시작합니다. 없으면 시작이 안됩니다.

자바는 c언어를 기반으로 만들어진 객체 지향 언어 입니다. 그래서 다른 언어와 다르게 main 가 꼭 필요합니다.


#### String

String 은 클래스이다.

String 은 immutable 변하지 않는 값이다.

자바는 'a', "a" 를 구분한다. 'a'는 char, "a"는 String이다.

String c = "Hello";

c = c + " world";

힙에 Hello 객체가 생기고 난 다음 Hello world 객체가 새로 생겨서 c의 참조값이 변경된다. Hello 객체가 변하는 것이 아니다.

나중에 쓸모없어진 객체는 Garbage Collector가 처리한다.

#### 리터럴
1, true, 'a', "a"

변수에 값을 대입하기 위해 쓰는 영역

리터럴은 코드 영역에 저장되서 쓴다.

Heap, Stack, Code,

#### 메소드 만들기

public static [return type] func_name(arg1, arg2)

자바는 Class > Method > Code

#### 클래스와 오브젝트

###### 오브젝트 : 인스턴스

state와 behavior가 있는 소프트웨어 꾸러미

state(상태) = 변수, behavior(행동) = 메소드(함수)

###### 클래스

오브젝트는 클래스로부터 생성됨.

new 키워드를 이용해야함.

instance variable : 각각의 클래스에서 사용하는 변수, public int a;

class variable : 클래스들 모두가 공유하는 변수, public static int b;

보통 데이터베이스에 저장되는 것이 클래스로 구현된다.

###### 상속

클래스들은 상속을 받아 부모클래스의 변수와 메소드를 자식클래스에서 사용할 수 있다.

자식 클래스에서 부모 클래스의 변수를 사용할때는 super. 를 사용한다.

###### 추상클래스

추상메소드를 하나 이상 가지고 있는 클래스를 추상클래스라고 한다.

추상메소드는 부모에서는 실제로 구현되어 있지 않다.

상속받은 자식에서 구현해서 사용한다. 상속받은 자식마다 서로 다르게 구현해서 사용할 수 있다. (method overriding)

추상클래스는 인스턴스를 만들수 없다. 추상메소드를 가지고 있기 때문에.

클래스는 다중상속이 안된다. - 자바에서만 다른언어는 될 수도 있다.

###### 인터페이스

추상메소드만 있는 클래스를 인터페이스라고 한다.

클래스가 다중상속이 안되는 점을 보완하기 위해 생겼다.

인터페이스는 다중상속이 된다.

클래스에 어떤 행동(메소드)를 추가 하고 싶을때 인터페이스를 사용한다.

###### 자바의 배열

자바의 배열은 new를 사용해서 생성한다. 그러므로 heap에 저장된다.

```java
int[] a = new int[10];      // 1차원 배열
int[][] b = new int[5][10]; // 2차원 배열

Car[] c = new Car[3];       // 객체 배열
c[0] = new Car();
c[0].name = "subway";
```

객체의 배열은 배열 생성후 각 배열마다 다시 객체를 생성해 줘야한다. 생성된 객체 배열은 아무것도 들어있지 않은 빈참조 배열이기 때문에.

###### 리스트

링크드 리스트, 더블 리스트, 등등등

자바의 리스트는 오브젝트만 담을 수 있다.

리스트의 컨테이너에는 오브젝트의 참조값만 들어있다. 객체는 컨테이너에 들어가기엔 크기가 크기때문에.

```java
List <Car> carList = new ArrayList <Car>();
Car c = new Car();
c.name = "sm3";
carList.add(c);
Car x = carList.get(0);
```

###### 해쉬맵

###### 제네릭

변수의 타입을 생성할때 지정할 수 있다.

```java
List <Car> carList = new ArrayList <Car>();
```
