    var ssLat = 42.352271;
    var ssLng = -71.05524200000001;
    var request = new XMLHttpRequest();
    var southStation = new google.maps.LatLng(ssLat, ssLng);
    var myOptions = {
                zoom: 15, // The larger the zoom number, the bigger the zoom
                center: southStation,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
    var map;
    var marker;
    var infowindow = new google.maps.InfoWindow();
    
    function init()
    {
        map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
        renderMap();
    }

    function renderMap()
    {
        southStation = new google.maps.LatLng(ssLat, ssLng);
        
        // Update map and go there...
        // map.panTo(me);

        // Create a marker
        marker = new google.maps.Marker({
            position: southStation,
            title: "Here is South Station!"
        });
        marker.setMap(map);
            
        // Open info window on click of marker
        google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent(marker.title);
            infowindow.open(map, marker);
        });


        //create markers
        southStation     = new google.maps.LatLng(ssLat, ssLng);
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

        //Create polyline
        var alewifeToJFK = [
            {lat:   42.395428,  lng:         -71.142483},
            {lat:    42.39674,  lng:         -71.121815},
            {lat:     42.3884,  lng: -71.11914899999999},
            {lat:   42.373362,  lng:         -71.118956},
            {lat:   42.365486,  lng:         -71.103802},
            {lat: 42.36249079,  lng:       -71.08617653},
            {lat:   42.361166,  lng:         -71.070628},
            {lat: 42.35639457,  lng:        -71.0624242},
            {lat:   42.355518,  lng:         -71.060225},
            {lat:   42.352271,  lng: -71.05524200000001},
            {lat:   42.342622,  lng:         -71.056967},
            {lat:   42.330154,  lng:         -71.057655},
            {lat:   42.330154,  lng:         -71.057655},
            {lat:   42.320685,  lng:         -71.052391}
        ];

        var JFKToAshmont = [
            {lat:   42.320685,  lng:         -71.052391},
            {lat:    42.31129,  lng:         -71.053331},
            {lat:   42.300093,  lng:         -71.061667},
            {lat: 42.29312583,  lng: -71.06573796000001},
            {lat:   42.284652,  lng: -71.06448899999999}
        ];

        var JFKToBraintree = [
            {lat:   42.320685,  lng:         -71.052391},
            {lat:   42.275275,  lng:         -71.029583},
            {lat:  42.2665139,  lng:        -71.0203369},
            {lat:   42.251809,  lng:         -71.005409},
            {lat:   42.233391,  lng:         -71.007153},
            {lat:  42.2078543,  lng:        -71.0011385},
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




 
 
 
 
 
 
 
 
 
 
 
 
 
 