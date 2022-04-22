
/**
 * Funcion para poder manejar las acciones que sucedan en la aplicacion
 * @param {Event} opcion evento que se dispara al hacer click en un botón. 
 */
 function menu5(opcion) {
    var context = newCanvas.getContext("2d");
    var imageData = context.getImageData(0, 0, newCanvas.width, newCanvas.height);
    switch (opcion.id) {
        case "oleo":
            alert("La imagen se esta oleando");
            doOilPaintEffect();
            break;
    }
}


function doOilPaintEffect(){
    oilPaintEffect(4 , 25);
  }

  


function oilPaintEffect( radius, intensity) {
    //Datos
    var context = newCanvas.getContext("2d");
    var imageData = context.getImageData(0, 0, newCanvas.width, newCanvas.height);
    var data = imageData.data;
    var height = newCanvas.height;
    var width = newCanvas.width;
    var pixelIntensityCount = [];
    var    intensityLUT = []
    var    rgbLUT = [];
    
    for (var y = 0; y < height; y++) {
        intensityLUT[y] = [];
        rgbLUT[y] = [];
        for (var x = 0; x < width; x++) {
            var idx = (y * width + x) * 4,
                r = data[idx],
                g = data[idx + 1],
                b = data[idx + 2],
                avg = (r + g + b) / 3;
            
            intensityLUT[y][x] = Math.round((avg * intensity) / 255);
            rgbLUT[y][x] = {
                r: r,
                g: g,
                b: b
            };
        }
    }
    

    
    for (y = 0; y < height; y++) {
        for (x = 0; x < width; x++) {
            pixelIntensityCount = [];
            
            // Find intensities of nearest pixels within radius.
            for (var yy = -radius; yy <= radius; yy++) {
                for (var xx = -radius; xx <= radius; xx++) {
                  if (y + yy > 0 && y + yy < height && x + xx > 0 && x + xx < width) {
                      var intensityVal = intensityLUT[y + yy][x + xx];

                      if (!pixelIntensityCount[intensityVal]) {
                          pixelIntensityCount[intensityVal] = {
                              val: 1,
                              r: rgbLUT[y + yy][x + xx].r,
                              g: rgbLUT[y + yy][x + xx].g,
                              b: rgbLUT[y + yy][x + xx].b
                          }
                      } else {
                          pixelIntensityCount[intensityVal].val++;
                          pixelIntensityCount[intensityVal].r += rgbLUT[y + yy][x + xx].r;
                          pixelIntensityCount[intensityVal].g += rgbLUT[y + yy][x + xx].g;
                          pixelIntensityCount[intensityVal].b += rgbLUT[y + yy][x + xx].b;
                      }
                  }
                }
            }
            
            pixelIntensityCount.sort(function (a, b) {
                return b.val - a.val;
            });
            
            var curMax = pixelIntensityCount[0].val,
                dIdx = (y * width + x) * 4;
            
            data[dIdx] = ~~ (pixelIntensityCount[0].r / curMax);
            data[dIdx + 1] = ~~ (pixelIntensityCount[0].g / curMax);
            data[dIdx + 2] = ~~ (pixelIntensityCount[0].b / curMax);
            data[dIdx + 3] = 255;
        }
    }
    
    context.putImageData(imageData, 0, 0);
}