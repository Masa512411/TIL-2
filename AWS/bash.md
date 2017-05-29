표준 출력은 화면의 출력
표준 입력은 키보드의 입력

#### pipe
```shell
la -al | grep hello
```
앞의 표준 출력을 뒤의 표준 입력으로 전달해주는 역할이다.

#### grep
```shell
grep hi
```
입력받은 문자열과 같은 문자열이 포함되 있을 경우 출력해준다.

#### redirection
```shell
cat hello.txt > result.txt
```

#### read
```shell
read var
'asdfsdf'
echo $var
asdfadf
```
키보드 입력 받기

#### for
```shell
for i in 10
do
  echo "HI : $i"
done
```

```sh
for i in `seq 1 10`
do
  echo "$i"
done
```

#### if
```shell
if [ expr ]
then
      ...
elif [ expr ]
      ...
else
      ...
fi
```
bash는 0이 참이고 1이 거짓이다.

###### 숫자 비교
-eq 같을때
-ne 다를때
-gt 클때
-ge 크면서 같을때
-le 작으면서 같을때
-lt 작을때

###### 문자열 비교
==, !=

###### 파일 비교
-f 파일인가 체크
-d 디렉토리인가 체크
-z 문자열이 null인지 체크, null이면 0 아니면 1

#### cron
주기적으로 내가 원하는 시간에 명령어를 실행하게 해준다.
최소 1분 단위로 실행하게 만들 수 있다.
```sh
crontab -e
```

```sh
* * * * * /home/ubuntu/temp/test.sh
```
분, 시, 일, 월, 요일, 절대경로의 실행파일

#### 날짜를 사용할때
프로그램이 날짜 데이터를 사용할경우 세계표준시간인 UTC를 사용하고 클라이언트에서 현재시간으로 변환해서 사용하는게 좋다.
