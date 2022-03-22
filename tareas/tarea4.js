
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
        case "image1":
            break;
    }
}


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
