### git

![image](http://uclouvain.github.io/osis-louvain-documentation/doc/development/images/git-state-diagram.png)

git init

git clone

>git clone 원본저장소 [디렉토리이름] [ ]:옵션

>원본저장소는 로컬저장소, 원격저장소 둘다 된다.

git config

git config --global --list

깃 명령어를 줄이는 방법 : alias
>git config --global alias.co commit

>alias 는 새창을 뛰우면 없어진다.

git add

git commit

git commit --amend : 현재 커밋에 덮어씌우다.
전의 커밋을 복사해서 새로운 커밋으로 대체한다.

git fetch

git merge : 나를 토대로 상대방과 합친다.

git pull -> fetch + merge

git checkout : 깃의 head를 옮기는 방법

git branch

>브랜치를 강제적으로 특정 커밋으로 옮기는 방법

>git branch -f 3rd C4  -f : 강제로, -F : 매우 강제로

>브랜치를 만들면서 체크아웃하는 방법

>git checkout -b 5th C7

HEAD

HEAD^1 : 가로 방향의 부모

HEAD~1 : 세로 방향의 부모

git rebase : 나를 상대방에게 얹어준다.

git rebase -i 커밋
커밋들을 조정해서 새로운 커밋을 만든다.
원본이랑은 내용이 달라진다.
-i interactive : 사람이 조정하겠다.

git cherrypick : 커밋 하나를 떼서 붙인다.

git을 되돌리는 방법

git revert 커밋
전의 커밋을 남기고 되돌아간다. -> 이전 커밋을 지금 커밋 다음에 붙인다

git reset --hard 커밋
전의 커밋으로 되돌아간다.
--hard를 붙인것과 안붙인것은 다른 명령어다.

git branch -f master c1
현재 작업 상태의 브랜치는 옮길수 없다. 현재 작업을 다른 곳으로 이동한 후 옮긴다.

원격저장소 연결
git remote add 원격저장소이름 원격저장소주소

원격저장소와 브랜치 연결
git push -u 원격저장소이름 브랜치이름
git push --set-upstream 원격저장소이름 브랜치이름

파일을 내버려두고 인덱스에서 파일을 내리고 싶을때
git -rm --cached 파일이름

깃에서 특정파일을 깃 히스토리에서 삭제하고 싶을때
brew install bfg
bfg --delete-files 1.txt

깃 저장소를 지우는 방법 :
rm -rf .git
