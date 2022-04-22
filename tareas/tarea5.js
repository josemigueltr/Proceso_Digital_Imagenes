/**
 * Funcion para poder manejar las acciones que sucedan en la aplicacion
 * @param {Event} opcion evento que se dispara al hacer click en un botón. 
 */
 function menu5(opcion) {
    var context = newCanvas.getContext("2d");
    var imageData = context.getImageData(0, 0, newCanvas.width, newCanvas.height);
    switch (opcion.id) {
        case "oleo":
            oleoFilter();
            break;
    }
}

/**
 * funcion para calcular la intensidad de los pixeles
 * 
 * @param {*} height altura de la imagen actual
 * @param {*} width ancho de la imagen actual
 * @param {*} data datos de la imagen actual
 */
function calculaIntensidadPromedioRGB(height,width,data,intensity){
    var intensidad_radio = []
    var promedio_rgb = [];
    for (var y = 0; y < height; y++) {
        intensidad_radio[y] = [];
        promedio_rgb[y] = [];
        for (var x = 0; x < width; x++) {
            var idx = (y * width + x) * 4;
            var r = data[idx];
            var g = data[idx + 1];
            var b = data[idx + 2];
            var avg = (r + g + b) / 3;
            //Calculo de intensidad de pixeles
            intensidad_radio[y][x] = Math.round((avg * intensity) / 255);
            promedio_rgb[y][x] = {r: r,g: g,b: b};
        }
    }
    return {iradio: intensidad_radio, pr_rgb: promedio_rgb};
}

/**
 * Funcion que define como se compararan 2 objetos
 */ 
function compareTo (a, b) {
    return b.val - a.val;
}

/**
 * Funcion que aplica el filtro de oleo a una imagen
 */
function oleoFilter() {
    //Datos
    var context = newCanvas.getContext("2d");
    var imageData = context.getImageData(0, 0, newCanvas.width, newCanvas.height);
    var data = imageData.data;
    var height = newCanvas.height;
    var width = newCanvas.width;
    var radio=7;
    var intensidad=25;
    var intensidad_pixeles = [];
    var tonosRGB = calculaIntensidadPromedioRGB(height,width,data,intensidad);
    var  intensidad_radio = tonosRGB.iradio;
    var   promedio_rgb = tonosRGB.pr_rgb;

    convolucion(matriz_blur)
    for (y = 0; y < height; y++) {
        for (x = 0; x < width; x++) {
            intensidad_pixeles = [];
            //calculamos la intensidad del  pixeles alrededor del pixel actual
            for (var yy = -radio; yy <= radio; yy++) {
                for (var xx = -radio; xx <= radio; xx++) {
                  if (y + yy > 0 && y + yy < height && x + xx > 0 && x + xx < width) {
                      var intensidad_por_radio = intensidad_radio[y + yy][x + xx];

                      if (!intensidad_pixeles[intensidad_por_radio]) {
                          intensidad_pixeles[intensidad_por_radio] = {
                              val: 1,
                              r: promedio_rgb[y + yy][x + xx].r,
                              g: promedio_rgb[y + yy][x + xx].g,
                              b: promedio_rgb[y + yy][x + xx].b
                          }
                      } else {
                          intensidad_pixeles[intensidad_por_radio].val++;
                          intensidad_pixeles[intensidad_por_radio].r += promedio_rgb[y + yy][x + xx].r;
                          intensidad_pixeles[intensidad_por_radio].g += promedio_rgb[y + yy][x + xx].g;
                          intensidad_pixeles[intensidad_por_radio].b += promedio_rgb[y + yy][x + xx].b;
                      }
                  }
                }
            }
            intensidad_pixeles.sort(compareTo);
            var inten_max = intensidad_pixeles[0].val;
            var posX = (y * width + x) * 4;
            data[posX] = ~~ (intensidad_pixeles[0].r / inten_max);
            data[posX + 1] = ~~ (intensidad_pixeles[0].g / inten_max);
            data[posX + 2] = ~~ (intensidad_pixeles[0].b / inten_max);
            data[posX + 3] = 255;
        }
    }
    
    context.putImageData(imageData, 0, 0);
}