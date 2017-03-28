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

git stash
잠시 작업 내용을 저장할 때 사용하는 유용한 명령어
stash가 만들어낸 임시 공간에 저장되어 진다.
여러개의 작업 임시 공간을 만들어 낼 수 있다.
git stash --list : 임시 공간 확인
git stash apply [아이디]: 임시 공간에 저장된 작업 내용을 덮어 씌운다. 반영되고 리스트에 남아있는다.
git stash pop [아이디]:  작업 내용을 덮어 씌운다. 리스트에서 사라진다.
git stash drop [아이디] : 리스트에 있는 작업 내용을 버릴때

배포 : 서버에 올려서 사용하는 것.
배포를 자동으로 해주는 툴
CI + CD
Jenkins : 유료
Travis : 공짜

보통 서버는 테스트 서버와 실서버가 있을 것이다.

###### 풀리퀘스트
깃허브의 기능을 이용해서 리뷰와 머지 과정을 하자.

커밋 이후 풀리퀘스트를 만들어서 다른 협업자들과 리뷰과정을 거친다.
풀리퀘스트를 만든 브랜치는 작업을 중단한다. 작업을 할수록 내용이 업데이트 돼기 때문.
리뷰어가 리뷰를 해주고 내용을 수정하자.

Comment : 이내용은 고쳐줘
Approve : 좋다. 승인
Request changes : 안됨. 거부

머지하는 과정에 커밋로그를 고칠수도 있고 브랜치를 삭제할 수도 있다.

마스터가 내 브랜치보다 앞서나가서 풀리퀘스트를 만들지 못할때는
내 브랜치를 마스터와 머지시키면 됀다.

프로젝트에 권한이 없는 경우의 풀리퀘스트
해당 리파지토리를 포크하고 브랜치를 생성 커밋 푸쉬후에 풀리퀘스트를 만든다.
이때 리파지토리를 선택하는 과정만 추가된다.
이때는 코멘트만 달수 있을뿐 어떠한 권한도 없다.
