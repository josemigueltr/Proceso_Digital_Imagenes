//Font de naipes
CargaFont("naipes");
//Fonts de domino
CargaFont("domino-blanco");
CargaFont("domino-negro");

/**
 * Funcion para poder manejar las acciones que sucedan en la aplicacion
 * @param {Event} opcion evento que se dispara al hacer click en un botón. 
 */
 function menu3(opcion) {
    var context = newCanvas.getContext("2d");
    var imageData = context.getImageData(0, 0, newCanvas.width, newCanvas.height);
    switch (opcion.id) {
        case "colorLetra":
            ColorLetra();
            break;
        case "grisLetra":
            GrisLetra();
            break;
        case "simbolos1":
            Simbolos1();
            break;
        case "simbolos2":
            Simbolos2();
            break;
        case "simbolos3":
            Simbolos3();
            break;
        case "letrero":
            Letrero();
            break;
        case "naipes":
            Naipes();
            break;
        case "domino-blanco":
            Domino(1);
            break;
        case "domino-negro":
            Domino(2);
            break;
    }

}

/**
 * Funcion que aplica le filtro de letra en tono de color
 */
function ColorLetra() {
     //Revisamos que halla una imagen cargada
     if(isCanvasBlank(canvas)){
        alert("No hay ninguna imagen cargada.");
        return;
    }
    //tamño de la letra
    var tam =10
    //Se usa por defecto la letra M
    var letra = "M";

    //Datos
    var context = newCanvas.getContext("2d");
    var imageData = context.getImageData(0, 0, newCanvas.width, newCanvas.height);
    var data = imageData.data;
    var height = newCanvas.height;
    var width = newCanvas.width;

    //Se recorre la imagen//Se aplica el filtro
    for (var y = 0; y < height; y += tam) {
        for (var x = 0; x < width; x += tam) {
            var arr = ColorLetraAux(x, y, data,tam,width,height);
            context.fillStyle = "rgb(" + arr[0] + ", " + arr[1] + ", " + arr[2] + ")";
            context.fillText(letra, x, y, tam);
            context.clearRect(x, y, tam, tam);
        }
    }


}


/**
 * Funcion que aplica le filtro de letra en tono de gris
 */
function GrisLetra() {
       //Revisamos que halla una imagen cargada
       if(isCanvasBlank(canvas)){
        alert("No hay ninguna imagen cargada.");
        return;
    }
  
    //tamño de la letra
    var tam =10
    //Se usa por defecto la letra M
    var letra = "M";

    //DATOS
    var context = newCanvas.getContext("2d");
    var imageData = context.getImageData(0, 0, newCanvas.width, newCanvas.height);
    var data = imageData.data;
    var height = newCanvas.height;
    var width = newCanvas.width;

    //Convertimos la imagen a grises
    gris(imageData,3);

    for (var y = 0; y < height; y += tam) {
        for (var x = 0; x < width; x += tam) {
            var arr = ColorLetraAux(x, y, data,tam,width,height);
            context.fillStyle = "rgb(" + arr[0] + ", " + arr[1] + ", " + arr[2] + ")";
            context.fillText(letra, x, y, tam);
            context.clearRect(x, y, tam, tam);
        }
    }

}

/**
 * Funcion que aplica le filtro de los 16 simbolos en blanco y negro
*/
function Simbolos1() {
      //Revisamos que halla una imagen cargada
      if(isCanvasBlank(canvas)){
        alert("No hay ninguna imagen cargada.");
        return;
    }
  
    //tamño de la letra
    var tam = 10
    //Datos
    var context = newCanvas.getContext("2d");
    var imageData = context.getImageData(0, 0, newCanvas.width, newCanvas.height);
    var data = imageData.data;
    var height = newCanvas.height;
    var width = newCanvas.width;

    for (var y = 0; y < height; y += tam) {
        for (var x = 0; x < width; x += tam) {
            var arr = ColorLetraAux(x, y, data,tam,width,height);
            var promedio = (arr[0] + arr[1] + arr[2]) / 3;
            //Obtenemos la letra escogida de acuerdo al promedio
            var letra=SimbolosAux(Math.round(promedio))
            context.fillText(letra, x, y, tam);
            context.clearRect(x, y, tam, tam);
        }
    }
}

/**
 * Funcion que aplica el filtro de los 16 simbolo a color
 * @returns 
 */
 function Simbolos2(){

    //Revisamos que halla una imagen cargada
      if(isCanvasBlank(canvas)){
          alert("No hay ninguna imagen cargada.");
          return;
      }
  
      //tamño de la letra
      var tam = 10
  
      //Datos
      var context = newCanvas.getContext("2d");
      var imageData = context.getImageData(0, 0, newCanvas.width, newCanvas.height);
      var data = imageData.data;
      var height = newCanvas.height;
      var width = newCanvas.width;
  
      for (var y = 0; y < height; y += tam) {
          for (var x = 0; x < width; x += tam) {
              var rgb = ColorLetraAux(x, y, data,tam,width,height);
              var promedio = (rgb[0] + rgb[1] + rgb[2]) / 3;
              var letra=SimbolosAux(Math.round(promedio));
              context.fillStyle = "rgb(" + rgb[0] + ", " + rgb[1] + ", " + rgb[2] + ")";
              context.fillText(letra, x, y, tam);
              context.clearRect(x, y, tam, tam);
          }
      }
  }
  
  
  function Simbolos3(){
    //Revisamos que halla una imagen cargada
    if(isCanvasBlank(canvas)){
        alert("No hay ninguna imagen cargada.");
        return;
    }

    //tamño de la letra
    var tam = 10
    //Datos
    var context = newCanvas.getContext("2d");
    var imageData = context.getImageData(0, 0, newCanvas.width, newCanvas.height);
    var data = imageData.data;    
    var height = newCanvas.height;
    var width = newCanvas.width;
    gris(imageData,3);

    
    for (var y = 0; y < height; y += tam) {
        for (var x = 0; x < width; x += tam) {
            var rgb = ColorLetraAux(x, y, data,tam,width,height);
            var promedio = (rgb[0] + rgb[1] + rgb[2]) / 3;
            var letra=SimbolosAux(Math.round(promedio));
            context.fillStyle = "rgb(" + rgb[0] + ", " + rgb[1] + ", " + rgb[2] + ")";
            context.fillText(letra, x, y, tam);
            context.clearRect(x, y, tam, tam);
        }
    }
  }

  /**
   * Funcion que aplica el filtro de letrero a una imagen
  */
function Letrero() {

    // Se obtiene el valor del letrero.
    var text = document.getElementById("inputLetrero").value;
    
    if(text==""){
        alert("No ha ingresado un letrero");
        return;
    }
    
    //Revisamos que halla una imagen cargada
    if(isCanvasBlank(canvas)){
        alert("No hay ninguna imagen cargada.");
        return;
    }

    //tamño de la letra
    var tam = 10;
    //Datos
    var context = newCanvas.getContext("2d");
    var imageData = context.getImageData(0, 0, newCanvas.width, newCanvas.height);
    var data = imageData.data;
    var height = newCanvas.height;
    var width = newCanvas.width;

    for (var y = 0; y < height; y += tam) {
        for (var x = 0; x < width; x += tam) {
            var rgb = ColorLetraAux(x, y, data,tam,width,height);
            context.fillStyle = "rgb(" + rgb[0] + ", " + rgb[1] + ", " + rgb[2] + ")";
            context.fillText(text, x, y, tam);
            context.clearRect(x, y, tam, tam);
        }
    }

}

function Naipes(){
     //Revisamos que halla una imagen cargada
     if(isCanvasBlank(canvas)){
        alert("No hay ninguna imagen cargada.");
        return;
    }

    //Tamaño predeterminado
    var tam = 10;
    //Datos
    var context = newCanvas.getContext("2d");
    var imageData = context.getImageData(0, 0, newCanvas.width, newCanvas.height);
    var data = imageData.data;
    var height = newCanvas.height;
    var width = newCanvas.width;

    for (var y = 0; y < height; y += tam) {
        for (var x = 0; x < width; x += tam) {
            var rgb = ColorLetraAux(x, y, data,tam,width,height);
            var promedio = (rgb[0] + rgb[1] + rgb[2]) / 3;
            var naipe=NaipesAux(Math.round(promedio));
            context.font = "10px naipes";
            context.fillText(naipe, x, y, tam);
            context.clearRect(x, y, tam, tam);
        }
    }
}

function Domino(val){
    
    //Revisamos que halla una imagen cargada
    if(isCanvasBlank(canvas)){
        alert("No hay ninguna imagen cargada.");
        return;
    }
    
    //Tamaño predeterminado
    var tam = 10;
    //Datos
    var context = newCanvas.getContext("2d");
    var imageData = context.getImageData(0, 0, newCanvas.width, newCanvas.height);
    var data = imageData.data;
    var height = newCanvas.height;
    var width = newCanvas.width;

    for (var y = 0; y < height; y += tam) {
        for (var x = 0; x < width; x += tam) {
            var arr = ColorLetraAux(x, y, data,tam,width,height);
            var promedio = (arr[0] + arr[1] + arr[2]) / 3;
            var domino=DominoAux(Math.round(promedio));
            context.font = (val==1) ? "10px domino-blanco": "10px domino-negro";
            context.fillText(domino, x, y, tam);
            context.clearRect(x, y, tam, tam);
        }
    }



}
/**
 * Funcion que obtiene el simbolo correspondiente al  promedio obtenido
 * @param {*} promedio  promedio obtenido
 * @returns simbolo correspondiente al promedio
 * Datos  y valores obtenidos de acuerdo a la informacion vista en clase
 */
function SimbolosAux(promedio) {
    if (promedio > 0 && promedio <= 15)
        return 'M';
    else if (promedio >= 16 && promedio <= 31)
        return 'N';
    else if (promedio >= 32 && promedio <= 47)
        return 'H';
    else if (promedio >= 48 && promedio <= 63)
        return '#';
    else if (promedio >= 64 && promedio <= 79)
        return 'Q';
    else if (promedio >= 80 && promedio <= 95)
        return 'U';
    else if (promedio >= 96 && promedio <= 111)
        return 'A';
    else if (promedio >= 112 && promedio <= 127)
        return 'D';
    else if (promedio >= 128 && promedio <= 143)
        return '0';
    else if (promedio >= 144 && promedio <= 159)
        return 'Y';
    else if (promedio >= 160 && promedio <= 175)
        return '2';
    else if (promedio >= 176 && promedio <= 191)
        return '$';
    else if (promedio >= 192 && promedio <= 209)
        return '%';
    else if (promedio >= 210 && promedio <= 225)
        return '+';
    else if (promedio >= 226 && promedio <= 239)
        return '.';
    else if (promedio >= 240 && promedio <= 255)
        return ' ';

}



/**
 * Funcion auxiliar para calcular el promedio de los colores de  un pixel
 * @param {*} x coordenada x del pixel
 * @param {*} y coordenada y del pixel
 * @param {*} data datos de la imagen 
 * @param {*} tam tamano de la region de pixeles
 * @param {*} width ancho de la imagen
 * @param {*} height  alto de la imagen
 * @returns Promedio de los colores de un pixel
 */
function ColorLetraAux(x, y,data,tam,width,height) {

    var r = 0;
    var g = 0;
    var b = 0;

    var count = 0;

    for (var j = y; j < y + tam; j++)
        for (var k = x; k < x + tam; k++) {
            if (k >= width || j >= height) continue;
            var i = (k + j * width) * 4;
            r += data[i];
            g += data[i + 1];
            b += data[i + 2];
            count++;
        }
    return [Math.round(r / count), Math.round(g / count), Math.round(b / count)];
    
}

/**
 * Funcion auxiliar que carga los fonts que se aplicaran a un imagen
 * @param {*} fontname nombre del font que se va a cargar
 */
function CargaFont(fontname) {
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    ctx.font = "4px " + fontname;
    ctx.fillText("text", 0, 8);
}

/**
 * Funcion auxiliar que devuelve un codigo para contruir el naipe dependiendo del promedio obtenido
 * @param {} promedio  promedio con el que se obtendra el naipe
 * @returns  codigo para formar el naipe
 */
function NaipesAux(promedio) {
    if(promedio > 0 && promedio <= 19) 
        return 'A';
    else if(promedio >= 20 && promedio <= 38) 
        return 'B';
    else if(promedio >= 39 && promedio <= 57) 
        return 'C';
    else if(promedio >= 58 && promedio <= 76) 
        return 'D';
    else if(promedio >= 77 && promedio <= 95) 
        return 'E';
    else if(promedio >= 96 && promedio <= 114) 
        return 'F';
    else if(promedio >= 115 && promedio <= 133) 
        return 'G';
    else if(promedio >= 134 && promedio <= 152) 
        return 'H';
    else if(promedio >= 153 && promedio <= 171) 
        return 'I';
    else if(promedio >= 172 && promedio <= 190) 
        return 'J';
    else if(promedio >= 191 && promedio <= 209) 
        return 'K';
    else if(promedio >= 210 && promedio <= 228) 
        return 'L';
    else if(promedio >= 229 && promedio <= 256) 
        return 'M';
}


/**
 * Funcion auxiliar que nos regresa el valor de la ficha de domino a usar dependiendo del promedio
 * @param {*} promedio  que determinara la ficha de domino a usar
 * @returns  valor de la ficha de domino a usar 
 */
function DominoAux(promedio) {
    if (promedio > 0 && promedio <= 25)
        return '1';
    else if (promedio >= 26 && promedio <= 50)
        return '2';
    else if (promedio >= 51 && promedio <= 75)
        return '3';
    else if (promedio >= 76 && promedio <= 100)
        return '4';
    else if (promedio >= 101 && promedio <= 125)
        return '5';
    else if (promedio >= 126 && promedio <= 150)
        return '6';
    else if (promedio >= 151 && promedio <= 175)
        return '7';
    else if (promedio >= 176 && promedio <= 200)
        return '8';
    else if (promedio >= 201 && promedio <= 225)
        return '9';
    else if (promedio >= 226 && promedio <= 256)
        return '0';
}
