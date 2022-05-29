/**
 * Funcion para poder manejar las acciones que sucedan en la aplicacion
 * @param {Event} opcion evento que se dispara al hacer click en un botón. 
 */
function menu9(elemento) {
    switch (elemento.id) {
        case "d-random":
            ditRand();
            break;
        case "d-ordenado":
            ditOrd();
            break;
        case "d-disperso":
            ditDisp();
            break;
    }
}

/**
 * funcion que aplica le filtro de dithering random a la imagen
 */
function ditRand(){
    var context = newCanvas.getContext("2d");
    var imageData = context.getImageData(0, 0, newCanvas.width, newCanvas.height);
    var data = imageData.data;

    for (let i = 0; i < newCanvas.width * newCanvas.height; i++) {
            let valor = i * 4;
            let avg = (data[valor] + data[valor+1] + data[valor+2])/3;
            
        if (avg > Math.random() * 255) {
            data[valor] = 255;
            data[valor+1] = 255;
            data[valor+2] = 255;                
        } else {
            data[valor] = 0;
            data[valor+1] = 0;
            data[valor+2] = 0;  
        }
    }
    context.putImageData(imageData, 0, 0)
}

/**
 * funcion que aplica le filtro de dithering ordenado a la imagen
 */
function ditOrd(){    
    var context = newCanvas.getContext("2d");
    var imageData = context.getImageData(0, 0, newCanvas.width, newCanvas.height);
    var data = imageData.data;

    let m_dithering_ordenado = [[8/9, 3/9, 4/9],
                  [6/9, 1/9, 2/9],
                  [7/9, 5/9, 9/9]];
    
    for (let y = 0; y < newCanvas.height; y++) {
        for (let x = 0; x < newCanvas.width; x++) {
            let prueba = m_dithering_ordenado[x % 3][y % 3] * 255;
            let valor = (y * newCanvas.width + x) * 4;
            let avg = (data[valor] + data[valor+1] + data[valor+2])/3;
            data[valor] = (avg>prueba)? 255:0;
            data[valor+1] = (avg>prueba)?255:0
            data[valor+2] = (avg>prueba)?255 :0;     
        }
        
    }
    context.putImageData(imageData, 0, 0)  
    
}

/**
 * funcion que aplica le filtro de dithering disperso a la imagen
 */
function ditDisp(){
    var context = newCanvas.getContext("2d");
    var imageData = context.getImageData(0, 0, newCanvas.width, newCanvas.height);
    var data = imageData.data;

    let matriz = [[1/9, 7/9, 4/9],
                  [5/9, 8/9, 3/9],
                  [6/9, 2/9, 9/9]];
    
    for (let y = 0; y < newCanvas.height; y++) {
        for (let x = 0; x < newCanvas.width; x++) {
            let prueba = matriz[x % 3][y % 3] * 255;
            let valor = (y * newCanvas.width + x) * 4;
            let grayScale = (data[valor] + data[valor+1] + data[valor+2])/3;

    
            data[valor] =(grayScale>prueba)? 255:0;
            data[valor+1] = (grayScale>prueba)? 255:0;
            data[valor+2] = (grayScale>prueba)? 255:0;
                
          
            
        }
    
    }

    context.putImageData(imageData, 0, 0) 

}