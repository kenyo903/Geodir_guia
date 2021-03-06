/*
 GeoDir, a JavaScript library for georeferenciacion interactive and maps. http://www.geodir.co
 (c) 2014-2015, Kenyo Joel Pecho Ñaupari
 */
/**
*API de google
*
**/ 
var apiGoogle = document.createElement("script");
apiGoogle.type = "text/javascript";
apiGoogle.src = "https://maps.googleapis.com/maps/api/js?signed_in=true&callback=initMap";
document.body.appendChild(apiGoogle);
function initMap(){
}
/**
*Esta funcion realiza la consulta el servicio de geodir
*si no encuentra resultado, realiza la consulta al api de google
**/
function getResults(parameters){
	jQuery.ajax({
    type : "GET",
    crossDomain : true,
    dataType : 'jsonp',
    jsonp : 'callback',
    jsonpCallback : 'jsonpCallback',
    contentType : "application/json; charset=utf-8",
    url : parameters.urlService+"/rest/georef/geodir?",
    data : {
      'direccion' : parameters.address
    },
    error : function(jqXHR, textStatus, errorThrown) {
      parameters.message="Error en conexion";
      parameters=georeferenciarGoogle(parameters);
    },
    success : function(resp) {
      parameters.message="Successful";
      if(resp.x!="0" && resp.y!="0"){
          parameters.location.lat=resp.x;
          parameters.location.lng=resp.y;
      }else{
          parameters=georeferenciarGoogle(parameters);
      }
      
    }
  }); 
  return parameters;
}

/**
*Esta functión realiza la consulta al api de google
**/
function georeferenciarGoogle(parameters){
  var geocoder= new google.maps.Geocoder();
  geocoder.geocode({'address': parameters.address}, function(results, status) {
       if (status === google.maps.GeocoderStatus.OK) {
        parameters.location.lat=results[0].geometry.location.K;
        parameters.location.lng=results[0].geometry.location.G;
      } else {
        parameters.location.lat=0;
        parameters.location.lng=0;
        parameters.message="Error en conexion con google";
    }
  });
}