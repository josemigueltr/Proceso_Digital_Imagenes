//MATRICES
//Matrces obtenidas de la pagina https://lodev.org/cgtutor/filtering.html
//blur

let matriz_blur = {
    valores:[0.0, 0.2,  0.0, 0.2, 0.2,  0.2, 0.0, 0.2,  0.0],
    tam:3
}

//motion blur
const  factor = 1.0 / 9.0;
let matriz_motion_blur = {

    valores:
            [   factor, 0, 0, 0, 0, 0, 0, 0, 0,
                0, factor, 0, 0, 0, 0, 0, 0, 0,
                0, 0, factor, 0, 0, 0, 0, 0, 0,
                0, 0, 0, factor, 0, 0, 0, 0, 0,
                0, 0, 0, 0, factor, 0, 0, 0, 0,
                0, 0, 0, 0, 0, factor, 0, 0, 0,
                0, 0, 0, 0, 0, 0, factor, 0, 0,
                0, 0, 0, 0, 0, 0, 0, factor, 0,
                0, 0, 0, 0, 0, 0, 0, 0, factor
            ],
    tam:9
}



//sharpen
let matriz_sharpen = {
    valores:   [-1, -1, -1,-1, 9, -1,-1, -1, -1],
    tam:3
}

//Emboss
let matriz_emboss = {
    valores:
    [
        -1, -1, -1, -1, 0,
        -1, -1, -1,  0, 1,
        -1, -1,  0,  1, 1,
        -1,  0,  1,  1, 1,
         0,  1,  1,  1, 1
    ],
    tam:5
}

//MATRICES PARA EL FILTRO DE BORDES

//borde horizontal
let borde_horizontal={
    valores:[ 0,  0, -1,  0,  0,
              0,  0, -1,  0,  0,
              0,  0,  2,  0,  0,
              0,  0,  0,  0,  0,
              0,  0,  0,  0,  0],
    tam:5
}

//borde vertical
let borde_vertical={
    valores:[ 0,  0, -1,  0,  0,
              0,  0, -1,  0,  0,
              0,  0,  4,  0,  0,
              0,  0, -1,  0,  0,
              0,  0, -1,  0,  0],
    tam:5
}

//borde 45 grados
let borde_45={
    valores:[  -1,  0,  0,  0,  0,
                0, -2,  0,  0,  0,
                0,  0,  6,  0,  0,
                0,  0,  0, -2,  0,
                0,  0,  0,  0, -1],
        tam:5
}

//borde todas las direcciones
let borde_todas={
    valores:[   -1, -1, -1,
                -1,  8, -1,
                -1, -1, -1],
    tam:3
}

//MATRICES PARA EL FILTR= MEDIANO Y MEDIO
//matriz promedio
let factor2=1.0/9.0;
let matriz_promedio={
    valores:[ factor,  factor,  factor,
        factor,  factor,  factor,
        factor,  factor,  factor, ],
        tam:3
}

//matriz mediana 3x3
let matriz_mediana3={
    valores:[1,1,1,
             1,1,1,
             1,1,1],
    tam:3
}

//matriz mediana 5x5
let matriz_mediana5={
    valores:[1,1,1,1,1,
             1,1,1,1,1,
             1,1,1,1,1,
             1,1,1,1,1,
             1,1,1,1,1],
    tam:5
}
//matriz mediana 9x9
let matriz_mediana9={
    valores:[1,1,1,1,1,1,1,1,1,
             1,1,1,1,1,1,1,1,1,
             1,1,1,1,1,1,1,1,1,
             1,1,1,1,1,1,1,1,1,
             1,1,1,1,1,1,1,1,1,
             1,1,1,1,1,1,1,1,1,
             1,1,1,1,1,1,1,1,1,
             1,1,1,1,1,1,1,1,1,
             1,1,1,1,1,1,1,1,1],
    tam:9
}

/**
 * Funcion para poder manejar las acciones que sucedan en la aplicacion
 * @param {Event} opcion evento que se dispara al hacer click en un bot??n. 
 */
function menu2(opcion) {
    var context = newCanvas.getContext("2d");
    var imageData = context.getImageData(0, 0, newCanvas.width, newCanvas.height);
    switch (opcion.id) {
        case "blur":
            convolucion(matriz_blur);
            break;
        case "motion":
            convolucion(matriz_motion_blur);           
            break;
        case "sharpen":
            convolucion(matriz_sharpen);
            break;
        case "emboss":
            convolucion(matriz_emboss);
            break;
        case "borde_horizontal":
            convolucion(borde_horizontal);
            break;
        case "borde_vertical":
            convolucion(borde_vertical);
            break;
        case "borde_45":
            convolucion(borde_45);
            break;
        case "borde_todas":
            convolucion(borde_todas);
            break;
        case "promedio":
            convolucion(matriz_promedio);
            break;
        case "mediano3":
            medianFilter(matriz_mediana3);
            break;
        case "mediano5":
            medianFilter(matriz_mediana5);
            break;
        case "mediano9":
            medianFilter(matriz_mediana9);
            break;
        case "componentes":
            componentesRGB(imageData);
            break;
        }
}

/**
 * Funcion que aplica una matriz de convolucion a una imagen para obtener un filtro
 * @param {*} matriz Matriz de convolucion que se aplicara a la imagen. 
 */
function convolucion(matriz) {
    //Revisamos que halla una imagen cargada
    if(isCanvasBlank(canvas)){
        alert("No hay ninguna imagen cargada.");
        return;
    }
    //Obtenemos el contexto del canvas
    var context = newCanvas.getContext("2d");
    var image = context.getImageData(0, 0, newCanvas.width, newCanvas.height);
    let newImageData = context.createImageData(newCanvas.width, newCanvas.height);
    var data = image.data;
    //dimensiones de la matriz
    let mx = Math.floor(matriz.tam / 2);
    let my = Math.floor(matriz.tam / 2);
    
    //Recorremos la imagen para aplicar la matriz de convolucion
    for (let i = mx; i < newCanvas.width - mx; i++) {
        for (let j = my; j < newCanvas.height - my; j++) {
            //R-0 G-1 B-2
            let color=[0,0,0];

            for (let entrada = 0; entrada < matriz.valores.length; entrada++) {
                let x = (entrada % matriz.tam) - mx;
                let y = Math.floor(entrada / matriz.tam) - my;
                let index=[0,0,0,0]

                let coord = (i+x) * 4 + (j+y) * (newCanvas.width * 4);
                for(let i=0;i<4;i++)
                    index[i]=coord+i;
                
                for(let k=0;k<3;k++)
                    color[k]+=data[index[k]]*matriz.valores[entrada];
            }
            let index=[0,0,0,0]
            let coord = i * 4 + j * (newCanvas.width * 4);
            for(let i=0;i<4;i++)
                index[i]=coord+i;
            
            for(let k=0;k<3;k++)
                newImageData.data[index[k]] = color[k];
            newImageData.data[index[3]] = data[index[3]];
        }
    }
    context.putImageData(newImageData, 0, 0)
}

/**
 * Funcion que aplica el filtro de componente RGB a la imagen
 * @param {*} image imagen a la que se le aplicara el filtro
 * @returns 
 */
function componentesRGB(image){
    var data = image.data;
    var context = newCanvas.getContext("2d");
    var IR = document.getElementById("inputR").value;
    var IG = document.getElementById("inputG").value;
    var IB = document.getElementById("inputB").value;
    if(isCanvasBlank(canvas)){
        alert("No hay ninguna imagen cargada.");
        return;
    }

    if(IR == "" || IG == "" || IB == ""){
        alert("No puede haber campos vacios.");
        return;
    }

    if ((isNaN(IR) || parseInt(IR) < 1 || parseInt(IR) > 255) || (isNaN(IG) || parseInt(IG) < 1 || parseInt(IG) > 255) || (isNaN(IB) || parseInt(IB) < 1 || parseInt(IB) > 255)) 
     {
        alert("Los valores deben de ser un n??mero mayor a 0 y menor a 255");
        return;
     }
    
    for (let i = 0; i < data.length; i += 4) {
        data[i] = data[i] & parseInt(IR);
        data[i + 1] = data[i+1] & parseInt(IG);
        data[i + 2] = data[i+2] & parseInt(IB);
    }
    context.putImageData(image, 0, 0);
}


/**
 * Funcion que aplica el filto de mediana a una imagen
 * @param {*} matriz 
 * @returns 
 */
function medianFilter(matriz){
  //Revisamos que halla una imagen cargada
  if(isCanvasBlank(canvas)){
    alert("No hay ninguna imagen cargada.");
    return;
}
//Obtenemos el contexto del canvas
var context = newCanvas.getContext("2d");
var image = context.getImageData(0, 0, newCanvas.width, newCanvas.height);
let newImageData = context.createImageData(newCanvas.width, newCanvas.height);
var data = image.data;
//dimensiones de la matriz
let mx = Math.floor(matriz.tam / 2);
let my = Math.floor(matriz.tam / 2);

//Recorremos la imagen para aplicar la matriz de convolucion
for (let i = mx; i < newCanvas.width - mx; i++) {
    for (let j = my; j < newCanvas.height - my; j++) {
        //Almeceno los valores rgb
        //R-0 G-1 B-2
        let color=[[],[],[]];

        for (let entrada = 0; entrada < matriz.valores.length; entrada++) {
            let x = (entrada % matriz.tam) - mx;
            let y = Math.floor(entrada / matriz.tam) - my;
            let index=[0,0,0,0]

            //Redireccionamiento de coordenadas
            let coord = (i+x) * 4 + (j+y) * (newCanvas.width * 4);
            for(let i=0;i<4;i++)
                index[i]=coord+i;
            
            for(let k=0;k<3;k++)
                color[k].push(data[index[k]]*matriz.valores[entrada]);
        }

        let index=[0,0,0,0]
        let coord = i * 4 + j * (newCanvas.width * 4);
        for(let i=0;i<4;i++)
            index[i]=coord+i;
        
        for(let k=0;k<3;k++)
            newImageData.data[index[k]] = calculateMedian(color[k]);
        newImageData.data[index[3]] = data[index[3]];
    }
}
context.putImageData(newImageData, 0, 0)
}


/**
 * Funcion que regresa la mediana de un arreglo  de numeros
 * @param {*} numbers arreglo de numeros 
 * @returns mediana de un arreglo
 */
function calculateMedian(numbers) {
    const sorted = numbers.slice().sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);
    if (sorted.length % 2 === 0) {
        return (sorted[middle - 1] + sorted[middle]) / 2;
    }

    return sorted[middle];
}
