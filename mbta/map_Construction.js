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

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = parseJSONData;
var object;
xhttp.open("GET", "https://defense-in-derpth.herokuapp.com/redline.json", true);
xhttp.send();




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
    parseJSONData();
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
    var SSInfowindow = new google.maps.InfoWindow();
    google.maps.event.addListener(markerSouthStation, 'click', function() {
        SSInfowindow.setContent(getSchedule("South Station"));
        SSInfowindow.open(map, markerSouthStation);
    })

    markerAndrew = new google.maps.Marker({
        position: andrew,
        map: map,
        icon: 'T_logo.png'
    });
    var andrewInfowindow = new google.maps.InfoWindow();
    google.maps.event.addListener(markerAndrew, 'click', function() {
        andrewInfowindow.setContent(getSchedule("Andrew"));
        andrewInfowindow.open(map, markerAndrew);
    })

    markerPorterSquare = new google.maps.Marker({
        position: porterSquare,
        map: map,
        icon: 'T_logo.png'
    });
    var PSInfowindow = new google.maps.InfoWindow();
    google.maps.event.addListener(markerPorterSquare, 'click', function() {
        PSInfowindow.setContent(getSchedule("Porter Square"));
        PSInfowindow.open(map, markerPorterSquare);
    })

    markerHarvardSquare = new google.maps.Marker({
        position: harvardSquare,
        map: map,
        icon: 'T_logo.png'
    });
    var HSInfowindow = new google.maps.InfoWindow();
    google.maps.event.addListener(markerHarvardSquare, 'click', function() {
        HSInfowindow.setContent(getSchedule("Harvard Square"));
        HSInfowindow.open(map, markerHarvardSquare);
    })

    markerJFK = new google.maps.Marker({
        position: JFK,
        map: map,
        icon: 'T_logo.png'
    });
    var JFKInfowindow = new google.maps.InfoWindow();
    google.maps.event.addListener(markerJFK, 'click', function() {
        JFKInfowindow.setContent(getSchedule("JFK/UMass"));
        JFKInfowindow.open(map, markerJFK);
    })

    markerSavinHill = new google.maps.Marker({
        position: savinHill,
        map: map,
        icon: 'T_logo.png'
    });
    var SHInfowindow = new google.maps.InfoWindow();
    google.maps.event.addListener(markerSavinHill, 'click', function() {
        SHInfowindow.setContent(getSchedule("Savin Hill"));
        SHInfowindow.open(map, markerSavinHill);
    })

    markerParkStreet = new google.maps.Marker({
        position: parkStreet,
        map: map,
        icon: 'T_logo.png'
    });
    var ParkSInfowindow = new google.maps.InfoWindow();
    google.maps.event.addListener(markerParkStreet, 'click', function() {
        ParkSInfowindow.setContent(getSchedule("Park Street"));
        ParkSInfowindow.open(map, markerParkStreet);
    })

    markerBroadway = new google.maps.Marker({
        position: broadway ,
        map: map,
        icon: 'T_logo.png'
    });
    var BInfowindow = new google.maps.InfoWindow();
    google.maps.event.addListener(markerBroadway, 'click', function() {
        BInfowindow.setContent(getSchedule("Broadway"));
        BInfowindow.open(map, markerBroadway);
    })

    markerNorthQuincy = new google.maps.Marker({
        position: northQuincy,
        map: map,
        icon: 'T_logo.png'
    });
    var NQInfowindow = new google.maps.InfoWindow();
    google.maps.event.addListener(markerNorthQuincy, 'click', function() {
        NQInfowindow.setContent(getSchedule("North Quincy"));
        NQInfowindow.open(map, markerNorthQuincy);
    })

    markerShawmut = new google.maps.Marker({
        position: shawmut,
        map: map,
        icon: 'T_logo.png'
    });
    var ShawmutInfowindow = new google.maps.InfoWindow();
    google.maps.event.addListener(markerShawmut, 'click', function() {
        ShawmutInfowindow.setContent(getSchedule("Shawmut"));
        ShawmutInfowindow.open(map, markerShawmut);
    })

    markerDavis = new google.maps.Marker({
        position: davis,
        map: map,
        icon: 'T_logo.png'
    });
    var DavisInfowindow = new google.maps.InfoWindow();
    google.maps.event.addListener(markerDavis, 'click', function() {
        DavisInfowindow.setContent(getSchedule("Davis"));
        DavisInfowindow.open(map, markerDavis);
    })

    markerAlewife = new google.maps.Marker({
        position: alewife,
        map: map,
        icon: 'T_logo.png'
    });
    var AlewifeInfowindow = new google.maps.InfoWindow();
    google.maps.event.addListener(markerAlewife, 'click', function() {
        AlewifeInfowindow.setContent(getSchedule("Alewife"));
        AlewifeInfowindow.open(map, markerAlewife);
    })

    markerKendalLMIT = new google.maps.Marker({
        position: kendallMIT,
        map: map,
        icon: 'T_logo.png'
    });
    var KMInfowindow = new google.maps.InfoWindow();
    google.maps.event.addListener(markerKendalLMIT, 'click', function() {
        KMInfowindow.setContent(getSchedule("Kendall/MIT"));
        KMInfowindow.open(map, markerKendalLMIT);
    })

    markerCharlesMGH= new google.maps.Marker({
        position: charlesMGH,
        map: map,
        icon: 'T_logo.png'
    });
    var CMGHInfowindow = new google.maps.InfoWindow();
    google.maps.event.addListener(markerCharlesMGH, 'click', function() {
        CMGHInfowindow.setContent(getSchedule("Charles/MGH"));
        CMGHInfowindow.open(map, markerCharlesMGH);
    })

    markerDowntownCrossing = new google.maps.Marker({
        position: downtownCrossing,
        map: map,
        icon: 'T_logo.png'
    });
    var DCInfowindow = new google.maps.InfoWindow();
    google.maps.event.addListener(markerDowntownCrossing, 'click', function() {
        DCInfowindow.setContent(getSchedule("Downtown Crossing"));
        DCInfowindow.open(map, markerDowntownCrossing);
    })

    markerQuincyCenter = new google.maps.Marker({
        position: quincyCenter,
        map: map,
        icon: 'T_logo.png'
    });
    var QCInfowindow = new google.maps.InfoWindow();
    google.maps.event.addListener(markerQuincyCenter, 'click', function() {
        QCInfowindow.setContent(getSchedule("Quincy Center"));
        QCInfowindow.open(map, markerQuincyCenter);
    })

    markerQuincyAdams = new google.maps.Marker({
        position: quincyAdams,
        map: map,
        icon: 'T_logo.png'
    });
    var QAInfowindow = new google.maps.InfoWindow();
    google.maps.event.addListener(markerQuincyAdams, 'click', function() {
        QAInfowindow.setContent(getSchedule("Quincy Adams"));
        QAInfowindow.open(map, markerQuincyAdams);
    })

    markerAshmont = new google.maps.Marker({
        position: ashmont,
        map: map,
        icon: 'T_logo.png'
    });
    var AshInfowindow = new google.maps.InfoWindow();
    google.maps.event.addListener(markerAshmont, 'click', function() {
        AshInfowindow.setContent(getSchedule("Ashmont"));
        AshInfowindow.open(map, markerAshmont);
    })

    markerWollaston = new google.maps.Marker({
        position: wollaston,
        map: map,
        icon: 'T_logo.png'
    });
    var WollInfowindow = new google.maps.InfoWindow();
    google.maps.event.addListener(markerWollaston, 'click', function() {
        WollInfowindow.setContent(getSchedule("Wollaston"));
        WollInfowindow.open(map, markerWollaston);
    })

    markerFieldsCorner = new google.maps.Marker({
        position: fieldsCorner,
        map: map,
        icon: 'T_logo.png'
    });
    var FCInfowindow = new google.maps.InfoWindow();
    google.maps.event.addListener(markerFieldsCorner, 'click', function() {
        FCInfowindow.setContent(getSchedule("Fields Corner"));
        FCInfowindow.open(map, markerFieldsCorner);
    })

    markerCentralSquare = new google.maps.Marker({
        position: centralSquare,
        map: map,
        icon: 'T_logo.png'
    });
    var CSInfowindow = new google.maps.InfoWindow();
    google.maps.event.addListener(markerCentralSquare, 'click', function() {
        CSInfowindow.setContent(getSchedule("Central Square"));
        CSInfowindow.open(map, markerCentralSquare);
    })

    markerBraintree = new google.maps.Marker({
        position: braintree,
        map: map,
        icon: 'T_logo.png'
    });
    var BtInfowindow = new google.maps.InfoWindow();
    google.maps.event.addListener(markerBraintree, 'click', function() {
        BtInfowindow.setContent(getSchedule("Braintree"));
        BtInfowindow.open(map, markerBraintree);
    })
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



function getSchedule(name) {

    var schedule = "Train Schedule: <br/>";

    for (var i = 0; i < object.TripList.Trips.length; i++) {
        for (var j = 0; j < object.TripList.Trips[i].Predictions.length; j++) {
            if (name == object.TripList.Trips[i].Predictions[j].Stop) {
                schedule += object.TripList.Trips[i].Destination + " - " + 
                    ((object.TripList.Trips[i].Predictions[j].Seconds)/60).toFixed(2) + " mins" + "<br/>";
            }            
        }
    }
    return schedule;
}




function parseJSONData() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
       object = JSON.parse(xhttp.responseText);
    }
}


