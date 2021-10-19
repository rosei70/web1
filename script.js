// script.js

var map;
var markers = new Array();
var poly;

var marker_car;

// In the following example, markers appear when the user clicks on the map.
function initMap() {
    var seoul = { lat: 37.5642135, lng: 127.0016985 };
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: seoul,
        //disableDefaultUI: true,
        //zoomControl: false,
        //scaleControl: true,
    });

    poly = new google.maps.Polyline({
        //editable: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 3
    });
    poly.setMap(map);

    // This event listener calls addMarker() when the map is clicked.
    google.maps.event.addListener(map, "click", (event) => {
        addLatLng(event);
    });

    // Add a marker at the center of the map.
    //addMarker(seoul, "Start", map);  

    //new google.maps.Marker({
    //  position: seoul,
    //  map: map,
    //  label: "Start"
    //});

    function changeCenter() {
        map.panTo(seoul);
        map.setZoom(14);
    }

    const icon_car =
        "https://developers.google.com/maps/documentation/javascript/examples/full/images/library_maps.png";
    
    marker_car = new google.maps.Marker({
        position: seoul,
        icon: icon_car,        
    });
}

// Handles click events on a map, and adds a new point to the Polyline.
function addLatLng(event, path = false) {
    //console.log("event", event);
    var path = poly.getPath();

    // Because path is an MVCArray, we can simply append a new coordinate
    // and it will automatically appear.
    path.push(event.latLng);

    // Add a new marker at the new plotted point on the polyline.
    var marker = new google.maps.Marker({
        position: event.latLng,
        title: '#' + path.getLength() + event.latLng,
        label: '#' + path.getLength(),
        map: map,
        id: new Date()
    });
        
    markers.push(marker);

    google.maps.event.addListener(marker, "click", (event) => {
        const infoWindow = new window.google.maps.InfoWindow({
            content: "<p>Location:" + marker.getPosition(),
            position: marker.getPosition(),
        });

        infoWindow.open(map);
    });

    // polyline의 이동이 안된다.
    //marker.setDraggable(true);  
    //google.maps.event.addListener(marker, "mouseout", (event) => {    
    //    marker.setPosition(event.latLng);    
    //});

    //console.log(markers.length - 1, event.latLng);
    poly.getPath().setAt(markers.length - 1, event.latLng);
    google.maps.event.addListener(marker, 'rightclick', function (event) {
        removePoint(marker);
    });
}

function removePoint(marker) {
    for (var i = 0; i < markers.length; i++) {
        if (markers[i].id === marker.id) {
            markers[i].setMap(null);
            markers.splice(i, 1);
            poly.getPath().removeAt(i);
        }
    }
}


function MyFuncPointCount() {
    return markers.length;
}

function POINT_XY() {
   var X;
   var Y;
}

function MyFuncPoints() {
    var pt_xy = new Array();
    
    for (var i = 0; i < markers.length; i++) {
        var pt = new POINT_XY();
        pt.Y = markers[i].getPosition().lat();
        pt.X = markers[i].getPosition().lng()
        pt_xy.push(pt);       
    }

    return pt_xy;
}


function MyFuncPoints2(y_pos) {
    var pt = [];

    if (y_pos) {
        for (var i = 0; i < markers.length; i++) {
            pt[i] = markers[i].getPosition().lng();
        }
    }
    else {
        for (var i = 0; i < markers.length; i++) {
            pt[i] = markers[i].getPosition().lat();
        }
    }

    return pt;
}


function MyFuncNewLocation(lat_y, lon_x) {
    if ((lat_y == 0) && (lon_x == 0)) {
        marker_car.setMap(null);
    }
    else {
        var new_loc = { lat: lat_y, lng: lon_x };

        marker_car.setPosition(new_loc);
        marker_car.setMap(map);
    }
}



