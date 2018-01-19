$(document).ready(function(){
    $('.seleccionUnica').on('change', function() {
    $('.seleccionUnica').not(this).prop('checked', false);
    $('#resultado').html($(this).data( "id" ));
    if($(this).is(":checked"))
        $('#resultado').html($(this).data( "id" ));
    else
        $('#resultado').html('Tienes que selcionar una respuesta');
    });
});

var contenidoJSON;
var respuestasErroneas = new Array();

function corregir() {
    // var price = document.querySelector("#jose-t-1-1 #resultado").innerHTML = "Anda PAqui";
    console.log("Corrigiendo");

    for(var j = 0; j < respuestasErroneas.length; j++){
        console.log(respuestasErroneas[j]);
        document.getElementById(respuestasErroneas[j]).style.color = "red";
    }


    for(var i = 0; i < 10; i++){

        
        var resultado = document.getElementById("resultado"+i);
        var indiceSolucion = contenidoJSON["soluciones"]["p"+i];
        var respuesta = "";
        switch (indiceSolucion) {
            case "a":
                respuesta = "a) " + contenidoJSON.respuestas["p" + i]['a'];
                break;
            case "b":
                respuesta = "b) " + contenidoJSON.respuestas["p" + i]['b'];
                break;
            case "c":
                respuesta = "c) " + contenidoJSON.respuestas["p" + i]['c'];
                break;
            case "d":
                respuesta = "d) " + contenidoJSON.respuestas["p" + i]['d'];
                break;
            default:
                break;
        }

        resultado.innerText = respuesta;
    }

}

window.onload = function () {
    var dropZone = document.getElementById('dropZone');
    dropZone.addEventListener('dragover', handleDragOver, false);
    dropZone.addEventListener('drop', handleFileSelect, false);
    var dragAndDrop = document.getElementById('dragAndDrop');
    dragAndDrop.hidden = false;
}


function generarPreguntas(){
    var titulo = document.getElementById("titulo");
    titulo.innerHTML = "<h1>" + contenidoJSON["concepto"] + "<\h1>";


    var contenido = document.getElementById('preguntasGeneradas');
    var html = "";

    html += "<div class=\"container\" id=\"preguntas\">";

    for(var i = 0; i < 10; i++, j++){
        
        html += "<div class=\"row\">" ;
        html += "<h2>" + (i+1) + ". " + contenidoJSON["preguntas"]["p"+i] + "</h2>";
        html += "</div>";

        html += "<div class=\"form - check respuestasSeleccionadas\">";
        html += "<div class=\"row\">";
        html += "<input class=\"seleccionUnica"+ i +" col form-check-input\" type=\"checkbox\" data-id=\"+"+'a'+ "seleccionado\" value=\""+'a'+"\">";
        html += "<p id=\""+'seleccionUnica'+ i + 'a' +"\">" + contenidoJSON.respuestas["p"+i]['a'] + "</p>";

        html += "</div>";
        html += "<div class=\"row\">";
        html += "<input class=\"seleccionUnica" + i +" col form-check-input\" type=\"checkbox\" data-id=\"+"+'b'+ "seleccionado\" value=\""+'b'+"\">";
        html += "<p id=\"" + 'seleccionUnica' + i + 'b' + "\">" + contenidoJSON.respuestas["p"+i]['b'] + "</p>";
        html += "</div>";
        html += "<div class=\"row\">";
        html += "<input class=\"seleccionUnica" + i +" col form-check-input\" type=\"checkbox\" data-id=\"+"+'c'+ "seleccionado\" value=\""+'c'+"\">";
        html += "<p id=\"" + 'seleccionUnica' + i + 'c' + "\">" + contenidoJSON.respuestas["p"+i]['c'] + "</p>";
        html += "</div>";
        html += "<div class=\"row\">";
        html += "<input class=\"seleccionUnica" + i +" col form-check-input\" type=\"checkbox\" data-id=\"+"+'d'+ "seleccionado\" value=\""+'d'+"\">";
        html += "<p id=\"" + 'seleccionUnica' + i + 'd' + "\">" + contenidoJSON.respuestas["p"+i]['d']  + "</p>";
        html += "</div>";
        html += "</div>"; /* fin form check*/

        html += "<div class=\"row solucion\">";
        html += "<div class=\"col\">";
        html += "<span id=\"resultado" + i+ "\">" +/*contenidoJSON.soluciones["p"+i] + */"</span>";
        html += "</div>";
        html += "</div>";
        

        html += "</br>";
        html += "</br>";
        html += "</hr>";
        html += "</br>";
        html += "</br>";
    
    }
    html += "</div>";
    contenido.innerHTML = html;

    addBotonCorregir()

    for(var j = 0; j < 10; j++){
        addUnicaSeleccion(j);
    }
       
   
}

function addBotonCorregir(){
    var botonCorregir = document.getElementById('botoncito');
    botonCorregir.innerHTML = "<button class=\"btn btn-primary code-dialog \" data-toggle=\"modal\" id=\"botonCorregir\" onclick=\"corregir()\">Corregir</button>";   

}


function addUnicaSeleccion(i){
    $('.seleccionUnica'+i).on('change', function () {
        $('.seleccionUnica'+i).not(this).prop('checked', false);
        $('#resultado').html($(this).data("id"));
        var correcta = contenidoJSON["soluciones"]["p" + i];
        var nombre = '.seleccionUnica' + i;
        nombre += ":checked";
        var checkedValue = document.querySelector(nombre).value;
        console.log(checkedValue);
        if(checkedValue != correcta){
            console.log("No has acertado");
            console.log("Vamos a cambiar: " + 'seleccionUnica' + i + checkedValue);
            var identificador = 'seleccionUnica' + i + checkedValue;
            respuestasErroneas.push(identificador);
            //document.getElementById('seleccionUnica'+i+checkedValue).style.color = "red";
            // Acceder al row correspondiente
        }else{
            console.log("Has acertado");
        }
    });
}



function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    var files = evt.dataTransfer.files;
    var archivo = files[0]

    var reader = new FileReader();
    reader.onload = (function (archivo) {
        return function (e) {
            contenidoJSON = JSON.parse(e.target.result);
            console.log(contenidoJSON);
            generarPreguntas();

        };
    })(archivo);

    reader.readAsText(archivo);
    var zonaArchivo = document.getElementById('dropZone');
    zonaArchivo.hidden = true;
}

function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy';
}
