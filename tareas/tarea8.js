/**
 * Funcion para poder manejar las acciones que sucedan en la aplicacion
 * @param {Event} opcion evento que se dispara al hacer click en un botón. 
 */
 function menu8(opcion) {
    var context = newCanvas.getContext("2d");
    var imageData = context.getImageData(0, 0, newCanvas.width, newCanvas.height);
    switch (opcion.id) {
        case "contrast":
            contrast()
            break;
    }
}

function contrast(){
    var context = newCanvas.getContext("2d");
    var imageData = context.getImageData(0, 0, newCanvas.width, newCanvas.height);
    //gris(imageData,2);
    var data = imageData.data;
    var height = newCanvas.height;
    var width = newCanvas.width;
    // Create a Set
    // key -- pixval , value -- count
    const pixels = new Map();
    //creamos histograma de frecuencia de los pixeles
    for (var i = 0; i < data.length; i += 4) {
        var f  = data[i];
        if (pixels.has(f)) {
            pixels.set(f, pixels.get(f) + 1);
        } else {
            pixels.set(f, 1);
        }
    }
    var keys=Array.from(pixels.entries());
    //ordenamos el array de mayor a menor
    keys.sort(function(a, b) {
        return b[1] - a[1];
    });
    //obtenemos el valor minimo y el valor maximo
    var min = keys[0];
    var max = keys[keys.length - 1];
    var maxContrast=Math.abs(max[0]-min[0]);
    
    //aplicamos el contraste a cada pixel de la imagen
    for (var i = 0; i < data.length; i += 4) {
        var g  = data[i];
        var newVal = (g/maxContrast)*255;
        data[i] = newVal;
        data[i + 1] = newVal;
        data[i + 2] = newVal;
    }
    context.putImageData(imageData, 0, 0)
}