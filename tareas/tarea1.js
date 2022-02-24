//Tarea 1

/**
 * Funcion para poder manejar las acciones que sucedan en la aplicacion
 * @param {Event} elemento evento que se dispara al hacer click en el botón. 
 */
function menu(elemento) {
    var context = newCanvas.getContext("2d");
    var imageData = context.getImageData(0, 0, newCanvas.width, newCanvas.height);
    switch (elemento.id) {
        case "G1":
            gris(imageData,1)
            break;
        case "G2":
            gris(imageData,2)
            break;
        case "G3":
            gris(imageData,3)
            break;
        case "G4":
            gris(imageData,4)
            break;
        case "G5":
            gris(imageData,5)
            break;
        case "G6":
            gris(imageData,6)
            break;
        case "G7":
            gris(imageData,7)
            break;
        case "red":
            filtroRGB(imageData,1);
            break;
        case "green":
            filtroRGB(imageData,2);
            break;
        case "blue":
            filtroRGB(imageData,3);
            break;
        case "contraste":
            altoInverso(imageData,1);
            break;
        case "inverso":
            altoInverso(imageData,2);
            break;

    }
}

/**
 * funcion que se encarga de definir cual formula se aplicara para aplicar la tonalida de gris
 * @param {*} x valor del pixel r
 * @param {*} y valor del pixel g
 * @param {*} z valor del pixel b
 * @param {*} val valor que indica la tonalidad de gris que se aplicara
 * @returns el valor de la tonalidad de gris
 * 
*/
function calculoGris(x,y,z,val) {
    switch (val) {
        case 1:
            return (x + y + z) / 3;
            break;
        case 2:
            return (x * 0.3 +y* 0.59 + z * 0.11)
            break;
        case 3:
            return (x * 0.2126 + y * 0.7152 + z * 0.0722)
            break;
        case 4:
            return (x * 0.299 + y * 0.587 + z * 0.114)
            break;
        case 5:
            return  (Math.min(x, y, z) + Math.max(x, y, z)) / 2;
            break;
        case 6:
            return Math.max(x, y, z)
            break;
        case 7:
            return Math.min(x, y, z)
            break;
}
}

/**
 * Funcion que aplica los filtros de grises que se escogieron
 * @param {} imageData imagen a la que sele aplicara el filtro
 * @param {*} val  valor que indica la tonalidad de gris que se aplicara
 */
function gris(imageData,val) {
    var context = newCanvas.getContext("2d");
    var data = imageData.data;
    for (var i = 0; i < data.length; i += 4) {
        const g = calculoGris(data[i],data[i + 1] , data[i + 2],val);
        data[i] = g;
        data[i + 1] = g;
        data[i + 2] = g;
    }
    context.putImageData(imageData, 0, 0);
}




/**
 * Funcion que aplica el filtro de brillo a una imagen
 * para realizar dicho filtro se le debe de sumar una constante a cada componente de cada pixel.
 * @param {*} imageData imagen a la que se aplicara el filtro
 */ 
function brillo() {
    var value = document.getElementById("myRange").value;
    value=parseInt(value);
    var context = newCanvas.getContext("2d");
    var imageData = context.getImageData(0, 0, newCanvas.width, newCanvas.height);
    var data = imageData.data;
    for (var i = 0; i < data.length; i += 4) {
        data[i] = (data[i] + value) < 0 ? 0 : (data[i] + value) > 255 ? 255 : data[i] + value;
        data[i + 1] = (data[i + 1] + value) < 0 ? 0 : (data[i + 1] + value) > 255 ? 255 : data[i + 1] + value;
        data[i + 2] = (data[i + 2] + value) < 0 ? 0 : (data[i + 2] + value) > 255 ? 255 : data[i + 2] + value;
    }
    context.putImageData(imageData, 0, 0)
}

/**
 * Funcion que aplica el filtro de mosaico a una imagen.
 */
function mosaico() {
    var tam = document.getElementById("botonTam").value;
    console.log(isCanvasBlank(canvas))
    if (tam == "") {
        alert("Ingresa un valor para el tamaño del mosaico.");
        return;
    }
    if (isNaN(tam) || parseInt(tam) < 1) {
        alert("El valor debe ser un número mayor a 0.");
        return;
    }
    else{
        if (isCanvasBlank(canvas)) {
            alert("No hay ninguna imagen cargada.");
            return;
        }
    }
    tam = parseInt(tam);
    var context = newCanvas.getContext("2d");
    console.log(context)
    var imageData = context.getImageData(0, 0, newCanvas.width, newCanvas.height);
    var data = imageData.data;

    var height = newCanvas.height;
    var width = newCanvas.width;

    for (var y = 0; y < height; y += tam) {
        for (var x = 0; x < width; x += tam) {   
            var arr = promedio(x, y, tam, data,width,height);
            context.fillStyle = "rgb(" + arr[0] + ", " + arr[1] + ", " + arr[2] + ")";
            context.fillRect(x, y, tam, tam);
        }
    }
}

/**
 * Calcula el promedio de colores de un pixel
 * @param {int} x 
 * @param {int} y 
 * @returns 
 */
function promedio(x, y,tam,data,width,height) {
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
    r = Math.round(r / count);
    g = Math.round(g / count);
    b = Math.round(b / count);
    return [r, g, b];
} 

/*
* Función que verifica si el canvas está vacío.
* @param canvas: canvas sobre el que se va a realizar la verificación.
* @return true si el canvas está vacío, false en caso contrario.
*/
function isCanvasBlank(c) {
    return !c.getContext('2d')
      .getImageData(0, 0, c.width, c.height).data
      .some(channel => channel !== 0);
  }

/*
* Función que aplica un filtro de color a la imagen.
* @param value: valor del filtro que se aplicara 1-RED 2-GREEN 3-BLUE
*/
function filtroRGB(imageData, value) {
    //revisamos que el canvas no este vacio
    if(isCanvasBlank(canvas)){
        alert("No hay ninguna imagen cargada.");
        return;
    }
    var context = newCanvas.getContext("2d");
    var data = imageData.data;
    for (var i = 0; i < data.length; i += 4) {
        if (value==1){
            data[i + 1] = 0;
            data[i + 2] = 0;
        }
        if (value==2){
            data[i ] = 0;
            data[i + 2] = 0;
        }
        if (value==3){
            data[i ] = 0;
            data[i + 1] = 0;
        }
    }
    context.putImageData(imageData, 0, 0);
}

/**
 * Funcion que aplica el filtro de inverso a una imagen.
 * @param {} imageData  imagen a la que se le aplicara el filtro.
 */
function inverso(imageData) {
    var context = newCanvas.getContext("2d");
    var data = imageData.data;
    for (var i = 0; i < data.length; i += 4) {
        const promedio = (data[i] * 0.2126 + data[i + 1] * 0.7152 + data[i + 2] * 0.0722) > 127 ? 0 : 255;
        data[i] = promedio  
        data[i + 1] = promedio
        data[i + 2] = promedio  

    }
    context.putImageData(imageData, 0, 0);
}

/**
 * Funcion que aplica el filtro de ialto contraste a una imagen.
 * @param {} imageData  imagen a la que se le aplicara el filtro.
 */
 function altoInverso(imageData,val) {
    var context = newCanvas.getContext("2d");
    var data = imageData.data;
    var promedio = 0;
    for (var i = 0; i < data.length; i += 4) {
        if(val==1)
            promedio = (data[i] * 0.2126 + data[i + 1] * 0.7152 + data[i + 2] * 0.0722)> 127 ? 255 : 0; 
        else
            promedio = (data[i] * 0.2126 + data[i + 1] * 0.7152 + data[i + 2] * 0.0722) > 127 ? 0 : 255;


        data[i] = promedio  
        data[i + 1] = promedio
        data[i + 2] = promedio  

    }
    context.putImageData(imageData, 0, 0);
}
       


