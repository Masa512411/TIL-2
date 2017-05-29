sudo apt update
sudo apt upgrade

## bash
0 - STDIN - keyboard
1 - STDOUT - console
2 - STDERR - console

## echo
echo는 STDOUT에게 뒤에 파라미터를 전해주는 역할이다.

bash의 설정값은 env로 볼 수 있다.
PS1 = "$ " 이런식으로 설정값을 바꿀 수 있다.

## PATH
명령어들이 들어 있는 파일들의 위치를 저장해 두는 것.

## export
현재 실행중인 bash 뿐만 아니라 생성되는 다른 bash들에게도 환경설정을 추가 할 수 있다.

## source
환경설정 파일을 만들었을때 실행시키는 방법.

## bashrc
리눅스가 시작됬을때 실행되는 명령어들을 추가 할 수 있다.

## "", '' 의 차이점
"" 는 변수가 들어가서 출력되며, ''는 그냥 문자열이 출력된다.

## echo $?
$? 는 전에 실행됬던 스크립트의 결과를 가지고 있다.

## grep
grep에 입력된 키보드값에 해당하는 사용자의 입력값이 있을때에만 출력해주는 프로그램.

## select-editor
기본 에디터를 바꾸게 해주는 명령어
