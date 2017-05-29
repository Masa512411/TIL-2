깃허브를 사용할때 개발 브랜치를 만들어 놓고 마스터에 머지 한다던가
잘못 push 할 수도 있다.

그럴때 마스터 브랜치를 되돌릴 수 있는 명령어이다.

```
git checkout master
git reset --hard e3f1e37
git push --force origin master
# Then to prove it (it won't print any diff)
git diff master..origin/master
```
