## LinkedList

#### Runner, Strider
포인터를 2개 혹은 그 이상을 만들어서 각각의 포인터의 진행 속도를 다르게 함으로써
루프를 돌았을때 서로 다른 위치에 있게만들고 문제를 해결하는 방법.

```Java
Node n1 = head;
Node n2 = head;

while(n2 != null) {
  n1 = n1.next;
  n2 = n2.next;
}
```
