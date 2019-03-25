var mymap = L.map('mapid').setView([45.5171, 13.6795], 12);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiZHlub3ZhZXIiLCJhIjoiY2p0bGFlNTFlMGFzYTQ0bzJxdXdyZzBoNyJ9.n0BK5x9vawFlpgg1lP3emg'
}).addTo(mymap);

var marker = L.marker([45.54736,13.73554]).addTo(mymap);

marker.bindPopup("Ghetto Something");