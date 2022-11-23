

// 마커를 클릭했을 때 해당 장소의 상세정보를 보여줄 커스텀오버레이입니다
var placeOverlay = new kakao.maps.CustomOverlay({zIndex:1}), 
    contentNode = document.createElement('div'), // 커스텀 오버레이의 컨텐츠 엘리먼트 입니다 
    markers = []; // 마커를 담을 배열입니다

// 지도 생성
var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = { 
        center: new kakao.maps.LatLng(37.5138, 126.906), // 지도의 중심좌표
        level: 5 // 지도의 확대 레벨
    };
var map = new kakao.maps.Map(mapContainer, mapOption);

// 커스텀 오버레이의 컨텐츠 노드에 css class를 추가합니다 
contentNode.className = 'placeinfo_wrap';

// 커스텀 오버레이 컨텐츠를 설정합니다
placeOverlay.setContent(contentNode);  

// 선택된 장소에 마커 표시
function selectPlace() {
    var townOptions = document.getElementById("town");
    var selectedPlace = townOptions.value
    var selectedData = searchPlaces(selectedPlace)
    panTo(selectedData[0])
    markMap(selectedData)
}

// 카테고리 검색을 요청하는 함수입니다
function searchPlaces(selectedPlace) {
    if (!selectedPlace) {
        return;
    }
    
    // 커스텀 오버레이를 숨깁니다 
    placeOverlay.setMap(null);

    // 지도에 표시되고 있는 마커를 제거합니다
    removeMarker();

    return data[selectedPlace];
}

// 마커 생성 및 표시 함수
function addMarker(position) {
    var marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: position // 마커의 위치
    });
    marker.setMap(map); // 지도 위에 마커를 표출합니다
    markers.push(marker); // 마커 배열에 값 추가
    return marker;
}

// 마커 제거 함수
function removeMarker() {
    for ( var i = 0; i < markers.length; i++ ) {
        markers[i].setMap(null);
    };
}



// // 인포윈도우를 표시하는 클로저를 만드는 함수입니다 
// function OpenInfo(map, marker, infowindow) {
//     return function() {
//         infowindow.open(map, marker);
//     };
// }

// // 인포윈도우를 닫는 클로저를 만드는 함수입니다 
// function CloseInfo(infowindow) {
//     return function() {
//         infowindow.close();
//     };
// }

function markMap(place) {
    for (var i = 0; i < place.length; i ++) {
        var marker = addMarker(new kakao.maps.LatLng(place[i].latitude, place[i].longitude)); // 마커 생성 및 표시 함수 호출

        // // 마커에 표시할 인포윈도우를 생성합니다 
        // var infowindow = new kakao.maps.InfoWindow({
        //     content: a[i].street, // 인포윈도우에 표시할 내용
        //     removable : iwRemoveable = true // 인포윈도우 닫기
        // });

        // // 마커에 클릭이벤트를 등록합니다
        // kakao.maps.event.addListener(marker, 'click', OpenInfo(map, marker, infowindow));
        (function(marker, a) {
            kakao.maps.event.addListener(marker, 'click', function() {
                displayPlaceInfo(a);
            });
        })(marker, place[i]);
    }
}

function panTo(place) {
    // 이동할 위도 경도 위치를 생성합니다 
    var moveLatLon = new kakao.maps.LatLng(place.latitude, place.longitude);
    
    // 지도 중심을 부드럽게 이동시킵니다
    // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
    map.panTo(moveLatLon);            
}        

// 클릭한 마커에 대한 장소 상세정보를 커스텀 오버레이로 표시하는 함수입니다
function displayPlaceInfo (place) {
    var content = '<div class="placeinfo"><span title="' + place.street + '">' + place.street + '</span>' +
                '  <span class="jibun" title="' + place.lot + '">(지번 : ' + place.lot + ')</span></div>';
    contentNode.innerHTML = content;
    placeOverlay.setPosition(new kakao.maps.LatLng(place.latitude, place.longitude));
    placeOverlay.setMap(map);  
}