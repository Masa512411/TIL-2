## AWS

#### Why AWS?
- 사용 편의성
- 유연성
- 비용 효율성
- 안정성
- 확장성 및 고성능

빠른 속도와 혁신성

#### AWS의 인프라
- 16개의 리전
- 42개의 가용영역(AZ)
- 60개 이상의 edge location

#### CDN
컨텐츠를 지역별로 서버에 분산시켜서 응답속도가 가장 빠른 곳에서 서비스를 받게 하는 방법.

#### DNS
DNS lookup : 도메인네임을 ip주소로 변환하는 과정
DNS Server
도메인네임은 컴퓨터, 브라우저, 서버에 캐싱되어 저장되어져 있다.
도메인네임의 ip주소를 모르면 상위 계층으로 올라가며 확인하고 응답을 받는다.

EC2 : Server
- Apache
- Node

S3 : upload files

파일 업로드 하는 방법:
1. App -> Server -> ImageServer
  ImageServer -> Server -> App
  처음 사용하던 방법.
2. App -> Server -> ImageServer
  ImageServer -> App
  두번째 사용하는 방법.
3. App -> S3.ImageServer(Image), App -> Server(meta data)
AWS S3를 사용하는 방법.
