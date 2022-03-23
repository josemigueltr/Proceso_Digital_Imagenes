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

FILTRO MEDIANO


FILTRO COMPONENTES RGB
Poner una mica RGB sobre las imagen

```


## TAREA 3
**Implpementacion de los filtros**
```
FILTRO LETRAS DE COLORES
	- Foto con una letra con colores.
	
FILTRO LETRAS GRISES
	- Foto con una letra pero en tono de gris
	
FILTRO EN GRISES CON LETRA EN BLANCO Y NEGRO
	-Foto en grises con letras en blanco y negro {MNH#QUAD0Y2$%+. }
	
FILTRO COMBINACIONES
	- Combinar efecto 1 con efecto 3
	- Combinar efecto 2 con efecto 3

FILTROS ADICIONALES

	- Usar las letras de un texto con los colores de la región
	- Usar el tipo de letras de cartas, para crear la imagen
	- Usar el tipo de letras dominó, para crear la imagen (puntos blancos con fondo negro)
	- Usar el tipo de letras dominó, para crear la imagen (puntos negros con fondo blanco)
```
## TAREA 4
**Implpementacion de los filtros**
```
FILTRO QUE ELIMINA MARCA DE AGUA DE IMAGENES EN BLANCO Y NEGRO
	- Filtro que remueve una marca de agua de una imagen en blanco y negro
```
### RESULTADOS OBTENIDOS
Estos son los resultados que se obtuvieron al aplicar el filtr que remueve la marca de agua con las imagenes de prueba

**Imagen 1**
![image](https://user-images.githubusercontent.com/41601470/159789589-363071e6-10c3-4d5c-ac36-2eb4329ba25b.png)

**Imagen 2**
![image](https://user-images.githubusercontent.com/41601470/159789782-4ab6cd83-24d8-493a-b954-642ec9af6e0e.png)

**Imagen 3**
![image](https://user-images.githubusercontent.com/41601470/159789823-97128e3d-ef6f-407c-9a0f-935d1f50edce.png)

**Imagen 4**
![image](https://user-images.githubusercontent.com/41601470/159789846-089f42d8-434a-4fe8-b17c-5297c66b93b8.png)

**Imagen 5**
![image](https://user-images.githubusercontent.com/41601470/159789868-0a3e4de1-2e07-4dcd-b6cd-b041590c7d0f.png)
