/*
* Javascript for map_Construction 
* for assignment Closest MBTA Station
*
* by Hazen Breen
*/


var ssLat = 42.352271;
var ssLng = -71.05524200000001;
var myLat = 0;
var myLng = 0;
var request = new XMLHttpRequest();
var southStation = new google.maps.LatLng(ssLat, ssLng);
var myLocation = new google.maps.LatLng(myLat, myLng);
var myOptions = {
            zoom: 12, 
            center: southStation,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
var map;
var marker;
var infowindow = new google.maps.InfoWindow();



/////////create stations///////////////
southStation     = new google.maps.LatLng(42.352271, -71.05524200000001);
andrew           = new google.maps.LatLng(42.330154, -71.057655);
porterSquare     = new google.maps.LatLng(42.3884, -71.11914899999999);
harvardSquare    = new google.maps.LatLng(42.373362, -71.118956);
JFK              = new google.maps.LatLng(42.320685, -71.052391);
savinHill        = new google.maps.LatLng(42.31129, -71.053331);
parkStreet       = new google.maps.LatLng(42.35639457, -71.0624242);
broadway         = new google.maps.LatLng(42.342622, -71.056967);
northQuincy      = new google.maps.LatLng(42.275275, -71.029583);
shawmut          = new google.maps.LatLng(42.29312583, -71.06573796000001);
davis            = new google.maps.LatLng(42.39674, -71.121815);
alewife          = new google.maps.LatLng(42.395428, -71.142483);
kendallMIT       = new google.maps.LatLng(42.36249079, -71.08617653);
charlesMGH       = new google.maps.LatLng(42.361166, -71.070628);
downtownCrossing = new google.maps.LatLng(42.355518, -71.060225);
quincyCenter     = new google.maps.LatLng(42.251809, -71.005409);
quincyAdams      = new google.maps.LatLng(42.233391, -71.007153);
ashmont          = new google.maps.LatLng(42.284652, -71.06448899999999);
wollaston        = new google.maps.LatLng(42.2665139, -71.0203369);
fieldsCorner     = new google.maps.LatLng(42.300093, -71.061667);
centralSquare    = new google.maps.LatLng(42.365486, -71.103802);
braintree        = new google.maps.LatLng(42.2078543, -71.0011385);

var allStations = [southStation, andrew, porterSquare, harvardSquare, JFK, savinHill, parkStreet, broadway, northQuincy, shawmut, 
                    davis, alewife, kendallMIT, charlesMGH, downtownCrossing, quincyCenter, quincyAdams, ashmont, wollaston, fieldsCorner,
                    centralSquare, braintree];  

var allStationNames = ["South Station", "Andrew", "Porter Square", "Harvard Square", "JFK", "Savin Hill", "Park Street", "Broadway", 
                    "North Quincy", "Shawmut", "Davis Square", "Alewife", "Kendall MIT", "Charles MGH", "Downtown Crossing", "Quincy Center", 
                    "Quincy Adams", "Ashmont", "Wollaston", "Fields Corner", "Central Square", "Braintree"]

function init()
{
    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    navigator.geolocation.getCurrentPosition(createMyMarker);
    createMarkers();
    createPolyline();
    parse();
}



function findMyClosestStation()
{
    var closestDistance = google.maps.geometry.spherical.computeDistanceBetween(myLocation, southStation);
    var currentDistance = 0;
    var closestStationNumber = 0;

    for (i = 0; i < 22; i++) {
        currentDistance = google.maps.geometry.spherical.computeDistanceBetween(myLocation, allStations[i]);
        if (currentDistance < closestDistance){
            closestDistance = currentDistance;
            closestStationNumber = i;
        }
    }

    infowindow.setContent(marker.title + "<br />Closest Redline Station:  " + allStationNames[closestStationNumber] + 
                            "<br />Distance from you:  " + Math.round(closestDistance) + " meters");
    infowindow.open(map, marker);

    //create polyline
    var myLocationToClosestStation = [
        myLocation,
        allStations[closestStationNumber]
    ]
    
    var myLocationToClosestStationPath = new google.maps.Polyline({
      path: myLocationToClosestStation, 
      geodesic: true,
      strokeColor: '#0FFF00',
      strokeOpacity: 1.0,
      strokeWeight: 4
    });


    myLocationToClosestStationPath.setMap(map);
}


function createMyMarker(position)
{

    myLat = position.coords.latitude;
    myLng = position.coords.longitude;

    myLocation = new google.maps.LatLng(myLat, myLng);

    marker = new google.maps.Marker({
        position: myLocation,
        title: "You are here!"
    });

    // Open info window on click of marker
    google.maps.event.addListener(marker, 'click', findMyClosestStation);



    marker.setMap(map);
}


function createMarkers()
{
    markerSouthStation = new google.maps.Marker({
        position: southStation,
        map: map,
        icon: 'T_logo.png'
    });

    markerAndrew = new google.maps.Marker({
        position: andrew,
        map: map,
        icon: 'T_logo.png'
    });

    markerPorterSquare = new google.maps.Marker({
        position: porterSquare,
        map: map,
        icon: 'T_logo.png'
    });

    markerHarvardSquare = new google.maps.Marker({
        position: harvardSquare,
        map: map,
        icon: 'T_logo.png'
    });

    markerJFK = new google.maps.Marker({
        position: JFK,
        map: map,
        icon: 'T_logo.png'
    });

    markerSavinHill = new google.maps.Marker({
        position: savinHill,
        map: map,
        icon: 'T_logo.png'
    });

    markerParkStreet = new google.maps.Marker({
        position: parkStreet,
        map: map,
        icon: 'T_logo.png'
    });

    markerBroadway = new google.maps.Marker({
        position: broadway ,
        map: map,
        icon: 'T_logo.png'
    });

    markerNorthQuincy = new google.maps.Marker({
        position: northQuincy,
        map: map,
        icon: 'T_logo.png'
    });

    markerShawmut = new google.maps.Marker({
        position: shawmut,
        map: map,
        icon: 'T_logo.png'
    });

    markerDavis = new google.maps.Marker({
        position: davis,
        map: map,
        icon: 'T_logo.png'
    });

    markerAlewife = new google.maps.Marker({
        position: alewife,
        map: map,
        icon: 'T_logo.png'
    });

    markerKendalLMIT = new google.maps.Marker({
        position: kendallMIT,
        map: map,
        icon: 'T_logo.png'
    });

    markerCharlesMGH= new google.maps.Marker({
        position: charlesMGH,
        map: map,
        icon: 'T_logo.png'
    });

    markerDowntownCrossing = new google.maps.Marker({
        position: downtownCrossing,
        map: map,
        icon: 'T_logo.png'
    });

    markerQuincyCenter = new google.maps.Marker({
        position: quincyCenter,
        map: map,
        icon: 'T_logo.png'
    });

    markerQuincyAdams = new google.maps.Marker({
        position: quincyAdams,
        map: map,
        icon: 'T_logo.png'
    });

    markerAshmont = new google.maps.Marker({
        position: ashmont,
        map: map,
        icon: 'T_logo.png'
    });

    markerWollaston = new google.maps.Marker({
        position: wollaston,
        map: map,
        icon: 'T_logo.png'
    });

    markerFieldsCorner = new google.maps.Marker({
        position: fieldsCorner,
        map: map,
        icon: 'T_logo.png'
    });

    markerCentralSquare = new google.maps.Marker({
        position: centralSquare,
        map: map,
        icon: 'T_logo.png'
    });

    markerBraintree = new google.maps.Marker({
        position: braintree,
        map: map,
        icon: 'T_logo.png'
    });
}



function createPolyline () {
    var alewifeToJFK = [
        alewife,
        davis,
        porterSquare,
        harvardSquare,
        centralSquare,
        kendallMIT,
        charlesMGH,
        parkStreet,
        downtownCrossing,
        southStation,
        broadway,
        andrew,
        JFK
    ];

    var JFKToAshmont = [
        JFK,
        savinHill,
        fieldsCorner,
        shawmut,
        ashmont
    ];

    var JFKToBraintree = [
        JFK,
        northQuincy,
        wollaston,
        quincyCenter,
        quincyAdams,
        braintree
    ];
    
    var alewifeToJFKPath = new google.maps.Polyline({
      path: alewifeToJFK, 
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });

    var JFKToAshmontPath = new google.maps.Polyline({
      path: JFKToAshmont, 
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });

    var JFKToBraintreePath = new google.maps.Polyline({
      path: JFKToBraintree, 
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });


    alewifeToJFKPath.setMap(map);
    JFKToAshmontPath.setMap(map);
    JFKToBraintreePath.setMap(map);
}






var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = parse();

    http.get("https://defense-in-derpth.herokuapp.com/redline.json", parse);


function parse() {
    if (this.readyState == 4 && this.status == 200) {
        console.log(1);

       var object = JSON.parse(this.responseText);




    }
}



xhttp.open("GET", "https://defense-in-derpth.herokuapp.com/redline.json", true);
xhttp.send();
