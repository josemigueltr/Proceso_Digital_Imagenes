/// imagenes recursivas acrtualmente tarea 6
/**
 * Funcion para poder manejar las acciones que sucedan en la aplicacion
 * @param {Event} opcion evento que se dispara al hacer click en un botón. 
 */
 function menu6(opcion) {
    var context = newCanvas.getContext("2d");
    var imageData = context.getImageData(0, 0, newCanvas.width, newCanvas.height);
    //var imageData = context.getImageData(0, 0, newCanvas.width, newCanvas.height);
    switch (opcion.id) {
        case "recursiva-color":
            filtroRecursivo(true);
            break;
        case "recursiva-bn":
            gris(imageData,7)
            filtroRecursivo(false);
            break;
    }
}

/**
 * Funcion auxiliar que me ayuda a obtener la posicion de un pixel en la imagen
 */
 function redireccionamiento_pixel(k, j, width) {
    var i = (k + j * width) * 4;
    return { R: i, G: i + 1, B: i + 2};
}

/**
 * Funcion que se encarga de crear la  imagen recursiva
 * @param {*} funct 
 */
function auxPixel(op,data,tam,imageData) {
    let color_index;
    let new_color;
    for (let i = 0; i < tam; i++) {
        for (let j = 0; j < tam; j++) {
            color_index = redireccionamiento_pixel(i, j, tam);  
            if (op){
                var R = imageData.data[color_index.R]
                var G = imageData.data[color_index.G]
                var B = imageData.data[color_index.B]
                let gray
                gray = (R + G + B) / 3;
                new_color= { R: gray+data.r1,
                            G: gray+data.r1, 
                            B: gray+data.r1 };

            }else{
                var R = imageData.data[color_index.R]
                var G = imageData.data[color_index.G]
                var B = imageData.data[color_index.B]
                new_color={ R: R & data.r1,
                            G: G & data.g1,
                            B: B & data.b1 };

            }
                
            imageData.data[color_index.R] = new_color.R;
            imageData.data[color_index.G] = new_color.G;
            imageData.data[color_index.B] = new_color.B;

        }

    }
}
/**
 * Funcionm que aplica el filtro recursivo a una imagen
 * @param {*} op 
 */
function filtroRecursivo(op){
    //datos
    var tam = 10;
    var width = 0;
    var height = 0;
    var x = 0;
    var y = 0;
    var m = 0;
    var n = 0;
    var auxcanvas = document.getElementById("auxcanvas");
    var auxcontext = auxcanvas.getContext("2d");
    auxcanvas.setAttribute("width", tam);
    auxcanvas.setAttribute("height", tam);
    var imageData;
    var context = newCanvas.getContext("2d");
    var imageData_newCanvas = context.getImageData(0, 0, newCanvas.width, newCanvas.height);
    var data = imageData_newCanvas.data;
    var width = newCanvas.width;
    var height = newCanvas.height;
    let r = 0;
    let g = 0; 
    let b = 0;

    //Vamos generando cada una de las imagenes recursivas
    while (x < width) {
        if ((x + tam) < width){
            m = tam;
        }else{
            m = width - x;
        }
        while (y < height) {
            if ((y + tam) < height){
                n = tam;
            }else{
                n = height - y;
            }
            for (let i = 0; i < m; i++) {
                for (let j = 0; j < n; j++) {
                    let pixel = redireccionamiento_pixel(i + x, j + y, newCanvas.width);
                    r += data[pixel.R];
                    g += data[pixel.G];
                    b += data[pixel.B];
                }
            }  
            r = r/(m * n);
            g = g/(m * n);
            b = b/(m * n);
            auxcontext.clearRect(0, 0, tam, tam);
            auxcontext.drawImage(newCanvas, 0, 0, tam, tam);
            imageData = auxcontext.getImageData(0, 0, auxcanvas.width, auxcanvas.height); 
            if (op) {
                //recuriva a color
                auxPixel(false, {r1:r,g1:g,b1:b},tam,imageData);  
            } else {
                //recursiva blanco y negro
                auxPixel(true,  {r1:r},tam,imageData);
            }
            context.putImageData(imageData, x, y);
            y += n;
        }
        x += m; y = 0;
    }
}
