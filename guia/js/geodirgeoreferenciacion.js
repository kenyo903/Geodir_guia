var coordenadaX = 0.0;
var coordenadaY = 0.0;
function geodriGeoreferenciar(){
  var direccion = document.getElementById("txtDireccion").value;
    
      
  jQuery.ajax({
    type : "GET",
    crossDomain : true,
    dataType : 'jsonp',
    jsonp : 'callback',
    jsonpCallback : 'jsonpCallback',
    contentType : "application/json; charset=utf-8",
    url : "http://192.168.1.16:8088/geodirservice/rest/georef/geodir?",
    data : {
      'direccion' : direccion
    },
    error : function(jqXHR, textStatus, errorThrown) {
      while( coordenadaX.firstChild ) {
          coordenadaX.removeChild( coordenadaX.firstChild );
      }
      console.log(errorThrown);
      console.log(textStatus);
      coordenadaX.value= 'ERROR DE CONEXION';
    },
    success : function(resp) {
      while( coordenadaX.firstChild ) {
          coordenadaX.removeChild( coordenadaX.firstChild );
      }
      console.log(JSON.stringify(resp));
      console.log(resp.x);
      console.log(resp.y);
      coordenadaX.value =resp.x;
      coordenadaY.value=resp.y;
       
	   try {
		map.removeLayer(marker);
		console.log("Se elimino marker anterior");
	} catch (e) {
		console.log("Error en eliminar marker anterior "+e);
	}
	marker=L.marker([resp.y, resp.x],{icon: markerIcon}).addTo(map);
	map.panTo(marker.getLatLng());
	map.setView(marker.getLatLng(),16);
    }
  });
}
