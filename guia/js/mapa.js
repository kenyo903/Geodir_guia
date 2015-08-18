var map = L.map('canvas',{'zoomControl': false,}).setView([-11.892198, -75.345678], 6);
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
		
//new L.Control.Zoom({ position: 'topright' }).addTo(map);

map.addControl(L.control.zoom({position: 'topright'}));

var markerIcon = L.icon({
	iconUrl : 'leaflet/images/marker-icon.png',
	shadowUrl : 'leaflet/images/marker-shadow.png',
	iconSize : [ 25, 41 ],
	iconAnchor : [ 12, 41 ],
	popupAnchor : [ 1, -34 ],
	shadowSize : [ 41, 41 ]
});
var marker=null;
