//Variables globlales que representan objetos en el html.
var imageLoader = document.getElementById('imageLoader');
imageLoader.addEventListener('change', handleImage, false);
var canvas = document.getElementById('imageCanvas');
var newCanvas = document.getElementById('newImageCanvas');
var ctx = canvas.getContext('2d');
var newCtx = newCanvas.getContext('2d');
var archivo;


/**
 * Funcion que se encarga de cargar la imagen del sistema de archivos
 *  y de mostrarla en el canvas.
 * @param {Event} event
 */
function handleImage(e) { 
  var reader = new FileReader();
  reader.onload = function(event) {
    onReaderLoad(event);
    archivo = event;
  }
  reader.readAsDataURL(e.target.files[0]);
}

/**
 * Funcion que carga las imagenes en el canvas.
 * @param {Event} event 
 */
var onReaderLoad = function(event) {
  // Se crea una imagen.
  var image = new Image();
  var newImage = new Image();

  image.src = event.target.result;
  newImage.src = event.target.result;
  
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

}

function limpiar() {
  onReaderLoad(archivo);
}
