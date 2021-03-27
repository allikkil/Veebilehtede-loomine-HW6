(function () {
    "use strict";

    //clock

    document.addEventListener("DOMContentLoaded", function () {

        let c = document.getElementById("clock");

        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1000);

        function updateClock() {

            let date = new Date();
            let h = date.getHours();
            let m = date.getMinutes();
            let s = date.getSeconds();
            let time = " AM"

            if (h >= 12) {
                time = " PM"
                if (h > 12) {
                    h = h - 12
                }
            }

            if (h < 10) {
                h = "0" + h;
            }

            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }

            c.innerHTML = h + ":" + m + ":" + s + time;

        };

    });

    // forms

    document.getElementById("form").addEventListener("submit", estimateDelivery);

    let e = document.getElementById("delivery");

    e.innerHTML = "0,00 &euro;";

    function estimateDelivery(event) {
        let hind = 0;
        event.preventDefault();

        let linn = document.getElementById("linn");
        let kingitus = document.getElementById("v1").checked;
        let kontaktivaba = document.getElementById("v2").checked;
        let eesnimi = document.getElementById("fname");
        let perenimi = document.getElementById("lname");
        let checked_radio = document.querySelector('input[name = "pakiautomaat"]:checked');

        if (checked_radio === null) {
            alert("Palun valige pakiautomaat");
            checked_radio.focus();
            return;
        }

        if (eesnimi.value === "") {
            alert("Palun sisestage eesnimi");
            eesnimi.focus();
            return;
        }
        if (perenimi.value === "") {
            alert("Palun sisestage perenimi");
            perenimi.focus();
            return;
        }

        if (kingitus) {
            hind += 5;
        }
        if (kontaktivaba) {
            hind += 1;
        }

        switch (linn.value) {
            case "tln":
                break;
            case "trt":
            case "nrv":
                hind += 2.5;
                break;
            case "prn":
                hind += 3;
                break;
            default:
                alert("Palun valige linn nimekirjast");
                linn.focus();
                break;

        }

        e.innerHTML = hind.toFixed(2) + " &euro;";
        console.log("Tarne hind on arvutatud");
    }

})();

// map

let mapAPIKey = "AqLLRE37SJGqIxXEYxezPUa6fF2oCzl3cvG4n05FtFIVBrotBYxchpMYYpwuxBak";

let map;

function GetMap() {

    "use strict";


    let center = new Microsoft.Maps.Location(
        58.373745,
        26.158705
    )
    let tartu = new Microsoft.Maps.Location(
        58.38104,
        26.71992
    );

    let viljandi = new Microsoft.Maps.Location(
        58.36645,
        25.59749
    )

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: center,
        zoom: 10,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true
    });

    let infobox = new Microsoft.Maps.Infobox(center, {
        visible: false
    });

    infobox.setMap(map);

    let pushpin = new Microsoft.Maps.Pushpin(tartu);

    pushpin.metadata = {
        title: 'Tartu Ülikool',
        description: 'Main building of Tartu University is the main building of the University of Tartu. This building is one of the most notable examples of classical style in Estonia.'
    };

   

    let pin = new Microsoft.Maps.Pushpin(viljandi, {
        title: 'Viljandi Kultuuriakadeemia'
    });

    pin.metadata = {
        title: 'Viljandi Kultuuriakadeemia',
        description: 'University of Tartu Viljandi Culture Academy is an Estonian institution of higher education, situated in the provincial town of Viljandi, central Estonia. The UT Viljandi Culture Academy merged with the University of Tartu in 2005.'
    };

    
    Microsoft.Maps.Events.addHandler(pushpin, 'click', pushpinClicked);
    Microsoft.Maps.Events.addHandler(pin, 'click', pushpinClicked);
    map.entities.push(pushpin);
    map.entities.push(pin);

    function pushpinClicked(e) {
        
        if (e.target.metadata) {
            
            infobox.setOptions({
                location: e.target.getLocation(),
                title: e.target.metadata.title,
                description: e.target.metadata.description,
                visible: true
            });
        }
    }
}


// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

