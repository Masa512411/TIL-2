## apache2서버 수동 배포

#### apache2 서버 인스톨
sudo apt install apache2
해당 서버의 ip로 접속하면 아파치서버 디폴트 페이지가 나옴

#### git repository clone
git clone https://github.com/latilt/deploy

#### apache 서버 디폴트 페이지 삭제
sudo rm -rf /var/www/html/*

#### apache 서버에 내가 만든 html파일 복사
sudo cp -a * /var/www/html/

다시 apache 서버에 접속하면 내가 만든 페이지가 나온다.

## apache2 서버 자동 배포 쉘스크립트 작성
```sh
#!/bin/bash
cd deploy
# 3 + 4 = git pull
git fetch
# if something changed on master
c1=`git rev-parse master`
c2=`git rev-parse origin/master`
if [[ $c1 != $c2 ]];then
  echo "Start deploy: `date`"
  git merge origin/master
  sudo rm -rf /var/www/html/*
  sudo cp -a * /var/www/html
  sudo service apache2 reload
else
  echo "nothing to do"
fi
```
지금까지 해온 동작들을 쉘스크립트 파일에 작성한다.

## crontab
```sh
* * * * * /html/ubuntu/deploy.sh >> result.sh 2>&1
```
