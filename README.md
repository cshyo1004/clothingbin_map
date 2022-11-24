## 영등포구 의류수거함 지도
영등포구의 의류수거함을 보여주는 지도입니다.<br>
<a href="https://apis.map.kakao.com/web/">카카오맵 API</a>를 기반으로 만들었습니다.<br>
사용 데이터는 공공데이터 포털 <a href="https://www.data.go.kr/data/15106473/fileData.do">서울특별시 영등포구_의류수거함 위치현황</a>입니다.<br>
데이터 기준일은 2022.07.31입니다.

## Features
- 영등포구의 동 단위 지도 표시
- 각 의류수거함별로 도로명/지번 주소 표기

## 홈 화면<br>
<img width="60%" src="https://user-images.githubusercontent.com/60250322/203462968-02846675-4a45-48ee-b028-942ad8b971e0.png">

## 장소 선택 화면<br>
<img width="60%" src="https://user-images.githubusercontent.com/60250322/203746597-ca8acc63-4798-4d65-81f1-847db047897c.png">

## 장소 정보 화면<br>
<img width="60%" src="https://user-images.githubusercontent.com/60250322/203462982-3ca28316-0260-4d75-84a6-6edcef306053.png">

## 실행순서
1. git clone https://github.com/cshyo1004/clothingbin_map.git
2. pip install -r requirements.txt
3. 카카오맵 API 사이트 접속 및 <a href="https://apis.map.kakao.com/web/guide/">가이드</a> 참고하여 appkey를 template/map/index.html에 삽입
4. python manage.py runserver
