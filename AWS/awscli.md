## awscli 설치
```
pip3 install awscli
// pip3, pip 명령어가 안될때는 python 설치할것
```

## accessKeys.csv 받기
1. IAM 접속
2. Users
3. ID 선택
4. Security credentials
5. Create Access Key

## aws configure
1. Access Key : 복사
2. Secret Key : 복사
3. Default region namee : ap-northeast-2 (서울)
4. Default output format : json

aws s3 ls 명령어를 입력해서 확인

.aws 폴더에 configure 설정 파일들이 생기게 된다.
config = region, output
credentials = access, secret

## aws s3

#### s3 버켓 목록 확인
aws s3 ls

#### 해당하는 name의 버켓안의 컨텐츠 확인
aws s3 ls s3://name

#### 복수의 계정을 쓸때
aws s3 ls s3://name --profile cs2

#### 해당하는 name의 이름으로 버켓 만들기
aws s3 mb s3://name

#### 파일 복사하기
aws s3 cp ~/Picture/logo.png s3://uncle2/some

폴더가 없을경우 폴더까지 알아서 만들어준다.

서버로 올릴땐 upload, 로컬로 다운받을땐 download

#### 파일 공유하기
aws s3 presign s3://latilt-code/some/taco.png

해당 파일을 공유 하는 기능. 디폴트값은 1시간이며 설정 가능하다.

## aws ec2

#### instance 확인하기
aws ec2 describe-instances

#### 결과물을 여러 방법으로 보기
aws ec2 describe-instances --output table, text, json

#### 결과물중에 내가 찾고자 하는 것 필터
aws ec2 describe-instances --filters "Name=tag:Name,Values=latilt*" --output table

#### instance id로 찾기
aws ec2 describe-instances --instance-ids i-0867278dfbbdd8020 --output table

#### ec2 서버 시작하기
aws ec2 start-instances --instance-ids i-0867278dfbbdd8020

#### 필요한 정보들만 가져와서 보여주기
aws ec2 describe-instances --instance-ids i-0867278dfbbdd8020 --query --output table

#### aws ec2 start / stop script
```bash
#!/bin/bash

instance=i-1234abcd

aws ec2 describe-instances --instance-ids $instance --query Reservations[*].Instances[*].[InstanceId,State.Name,Tags[0].Value,PublicDnsName] --output text

echo '+-------------------+'
echo '| 1. start instance |'
echo '| 2. stop instance  |'
echo '+-------------------+'
printf "choose (1-2): "
read choice

echo $choice
if [ $choice -eq 1 ];then
	echo "start instance $instane"
	aws ec2 start-instances --instance-ids $instance
elif [ $choice -eq 2 ]; then
	echo "stop instance $instance"
	aws ec2 stop-instances --instance-ids $instance --dry-run
else
	echo "bye~"
fi
```

###### --dry-run
하는 척만 해주는 명령어. 실제 서비스 할때는 지우도록 하자.

## webhook
curl 명령어로 slack bot 에게 메시지를 보내 띄워보자.
> slack 주소 : https://hooks.slack.com/services/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

#### slack에게 메시지를 날리는 스크립트
```bash
#!/bin/bash
url=webhook url here
if [ $# -ge 1 ]; then
  msg=$@
else
  msg="hello world"
fi
payload='{"text": "'$msg'", "link_names" : 1}'
echo Try send $payload to Slack channel
curl -X POST -H 'Content-type: application/json' \
--data "$payload" $url
```

> link_names : mention 기능 켜기

#### 서버가 시작할때 slack에게 메시지를 날리는 스크립트
```bash
#!/bin/bash
ip=`/usr/bin/curl -s -w '\n' http://169.254.169.254/latest/meta-data/public-ipv4`
instance=`/usr/bin/curl -s -w '\n' http://169.254.169.254/latest/meta-data/instance-id`
url=WEBHOOK_URL_HERE
name="YOURNAME HERE"
payload="{\"text\": \"`date`: $name $instance $ip started\"}"
/usr/bin/curl -X POST -H 'Content-type: application/json' \
--data "$payload" $url
```

###### aws 서버 시작할때 자동으로 시작하게 등록하기

>sudo vi /etc/systemd/system/slack.service

```bash
[Unit]
Description=Slack IP Notification
Wants=network-online.target
After=network-online.target
[Service]
Type=oneshot
WorkingDirectory=/home/ubuntu/script
ExecStart=/home/ubuntu/script/slack.sh
[Install]
WantedBy=multi-user.target
```

>sudo systemctl enable slack.service

>sudo systemctl status slack
