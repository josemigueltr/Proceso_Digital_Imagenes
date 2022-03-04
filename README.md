# Proceso_Digital_Imagenes
Repositorio correspondiente a la materia de proceso digital de imagenes


El proyecto puede facilmente consultarse en la siguente [aqui](https://josemigueltr.github.io/Proceso_Digital_Imagenes/)

## TAREA 1
**Implpementacion de los filtros**

```
ESCALA DE GRISES
Gray = (R*1 + G*1 + B*1) / 3 (división entera)
Gray = (Red * 0.3 + Green * 0.59 + Blue * 0.11)
Gray = (Red * 0.2126 + Green * 0.7152 + Blue * 0.0722)
Gray = (Red * 0.299 + Green * 0.587 + Blue * 0.114)
Gray = ( Max(Red, Green, Blue) + Min(Red, Green, Blue) ) / 2
Gray = Max(Red, Green, Blue)
Gray = Min(Red, Green, Blue)

FILTROS RGB
Filtro Rojo (R,0,0)
Filtro Verde (0,G,0)
Filtro Azul (0,0,B)

FILTRO EFECTO MOSAICO
Filtro mosaico

FILROS DE CONTRASTE
Alto contraste
Inverso

FILTRO DE BRILLO
Brillo (sumar o restar una constante a cada tripleta RGB, o sea, a cada pixel.
```
## TAREA 2
**Implpementacion de los filtros**

```
FILTRO BLUR
Blur (difumina una imagen - la hace borrosa)
Motion Blur (efecto de foto movida)
Find edges (encuentran bordes)
	- en vertical
	- en horizontal
	- a 45 grados
	- en todas las direcciones

FILTRO SHARPEN
Sharpen (hace que la imagen sea más precisa)
Emboss (encuentra bordes y los pone en relieve (3D))

FILTRO PROMEDIO
Filtro promedio (mean)
Filtro mediano

Poner una mica RGB sobre las imagen

```
