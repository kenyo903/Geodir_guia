var rootURL="http://192.168.1.16:8088/geodirservice/rest/geodir/direciones";
			var resultadosJson="";
			var dataset = [];
			var valores =null;
			var parametro="";
			var via="";
			var ubigeo;
			function listarResultados(){

				$.ajax({
					type : "GET",
				    crossDomain : true,
				    dataType : 'jsonp',
				    jsonp : 'callback',
				    jsonpCallback : 'jsonpCallback',
				    contentType : "application/json; charset=utf-8",
				    url : rootURL,
				    data : {
				      'direccion' : parametro
				    },
				    error : function(jqXHR, textStatus, errorThrown) {
				    	console.log(errorThrown);
      					console.log(textStatus);
				      resultadosJson= 'ERROR DE CONEXION';
				    },success : function(resp) {
			      		resultadosJson=JSON.stringify(resp);
			      		valores = JSON.parse(resultadosJson); 	
			   		}
				});
				
				for (var aux in valores) { 
					dataset[aux]=valores[aux]['suggest'];
				}
				
			}

            $(function() {
                $("#txtDireccion").typeahead({
                    source: dataset
                    , items: 15
                });

            });

  			$(function() {
	            $( "#txtDireccion" ).keypress(function() {
	            	parametro=document.getElementById('txtDireccion').value;
	            	if(parametro.length>1){
		    			listarResultados();
		    		}
				});
			 });
