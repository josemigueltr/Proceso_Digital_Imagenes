
var images = document.getElementById('images');
images.addEventListener('change', selectImage, false);
/**
 * Funcion para poder manejar las acciones que sucedan en la aplicacion
 * @param {Event} opcion evento que se dispara al hacer click en un botón. 
 */
 function menu4(opcion) {
    var context = newCanvas.getContext("2d");
    var imageData = context.getImageData(0, 0, newCanvas.width, newCanvas.height);
    switch (opcion.id) {
        case "marcaAgua":
            remueveMarcaAgua(imageData);
            break;
    }
}


/**
 * Funcion que se encarga de remover la marca de agua de la imagen.
 **/
function  remueveMarcaAgua(imageData){
     //Revisamos que halla una imagen cargada
     if(isCanvasBlank(canvas)){
        alert("No hay ninguna imagen cargada.");
        return;
    }

    var context = newCanvas.getContext("2d");
    var data = imageData.data;
    for (var i = 0; i < data.length; i += 4) {
        var r = data[i];
        var g = data[i + 1];
        var b = data[i + 2];
        var difBG = Math.abs(b-g);
        var difGR = Math.abs(g-r);
        var difRB = Math.abs(r-b);

        if(difBG<=10 && difGR<=10 && difRB<=10)
            continue;
            
        var promedio = (r+g+b)/3 + 40;
        promedio = promedio > 255 ? 255 : promedio;
        promedio = promedio < 128 ? promedio - 60 : promedio;
        data[i] = promedio;
        data[i + 1] = promedio;
        data[i + 2] = promedio;
    }
    context.putImageData(imageData, 0, 0);

}

/**
 * Funcion que se encarga demostrar las imagenes de prueba para remover las marcas de agua.
 */
function selectImage(){
    switch (images.value) {
        case "image1":
            image.src = "../public/images/imagen1.jpeg";
            newImage.src = "../public/images/imagen1.jpeg";
            break;
        case "image2":
            image.src = "../public/images/imagen2.jpeg";
            newImage.src = "../public/images/imagen2.jpeg";
            break;
        case "image3":
            image.src = "../public/images/imagen3.jpeg";
            newImage.src = "../public/images/imagen3.jpeg";
            break;
        case "image4":
            image.src = "../public/images/imagen4.jpeg";
            newImage.src = "../public/images/imagen4.jpeg";
            break;
        case "image5":
            image.src = "../public/images/imagen5.jpeg";
            newImage.src = "../public/images/imagen5.jpeg";
            break;
    }
    
    image.onload = () => {
      canvas.width = image.width/2;
      canvas.height = image.height/2;
      ctx.drawImage(image, 0, 0,canvas.width,canvas.height);
    }
    
    newImage.onload = () => {
      newCanvas.width = newImage.width/2;
    newCanvas.height = newImage.height/2;
    // ...ésta se dibuja en el canvas.
    newCtx.drawImage(newImage, 0, 0,canvas.width,canvas.height);
    }

    archivo=undefined;
}
