# Obligatorio RIA

## Diseño del sistema 
Con nuestro equipo conseguimos crear una aplicación React para facilitar el manejo de archivos de audio para hacer que el uso del tiempo de nuestro usuario sea el más eficiente. 


## Descripcion de las tecnologias

Utilizamos una estructura en componentes sobre React y tratamos de sacarle la mayor ventaja de la tecnología que nos fuera posible.
también utilizamos la API publica de CHAT-GTP y un SDK de Google para poder realizar lo que nos propusimos.

## Conexiones externas

### ChatGPT

Api rest usando los metoods POST con una key de autorizacion en el header Basic

### Google

gapi.auth2 es una biblioteca de JavaScript proporcionada por Google para facilitar la autenticación y el manejo de la identidad del usuario utilizando Google Sign-In. Esta biblioteca forma parte de la API de JavaScript de Google (gapi) y proporciona funciones y métodos para interactuar con el sistema de autenticación de Google.

gapi.auth2 ofrece una capa de abstracción sobre las API de autenticación de Google

## Configuración e instalaciòn

### Instalación:

1.	Primero clonamos el repositorio por HTTPS en nuestra maquina local  
   2.1 git clone https://github.com/mathiasfernandez/ria.git  
2.	Para la instalación necesitamos lo siguiente:  
   2.1 Node version 18.2 - https://nodejs.org/en/blog/release/v18.2.0 (debemos instalar la version acorde a nuestro sistema operativo)  
3. Ejecutamos el comando:  `npm install`  

### Ejecucion: 

4. Debemos crear una cuenta y acceder a https://platform.openai.com/account/api-keys y para configurar una clave privada.
   1. Con la clave privada debemos modificar la variable de entorno (archivo .ENV)  REACT_APP_CHAT_GPT_API_KEY y cargar el valor antes mencionado
3.	Luego ejecutamos el siguiente comando y la aplicación se iniciará! `npm start`


## Mock ups
### Inicio Sesion:
![image](https://github.com/mathiasfernandez/ria/assets/81320974/c286fc21-e054-401d-8dfd-9b847a6d6879)

### Pagina principal:

![image](https://raw.githubusercontent.com/mathiasfernandez/ria/master/assets/traduccion.png)


## Mapa de navegaciòn

![image](https://github.com/mathiasfernandez/ria/assets/81320974/22a4eaa2-a0a6-4eeb-affd-4c8095828548)


## Descripciòn de servicios rest utilizado

En este sistema utilizamos la versión gratuita de la API de CHAT-GTP para realizar las transcripciones, traducciones, como también los resúmenes de los audios que se suban al sistema.

## Estudio de Usabilidad

En general, las elecciones de usabilidad se centran en proporcionar una experiencia fluida, intuitiva y eficiente para los usuarios, minimizando la fricción y facilitando el acceso a las funcionalidades del sistema.

### Historia de usuario 1:

Como usuario, quiero poder autenticarme en el sistema utilizando mi cuenta de Google para acceder a todas las funciones y características.

Criterios de aceptación:

El sistema debe proporcionar una opción de inicio de sesión con cuenta de Google en la página de inicio.  
Al hacer clic en la opción de inicio de sesión con cuenta de Google, el sistema debe redirigir al usuario a la página de inicio de sesión de Google.  
El sistema debe permitir al usuario ingresar sus credenciales de cuenta de Google en la página de inicio de sesión de Google.  
Después de que el usuario haya ingresado sus credenciales de cuenta de Google, el sistema debe validar la información y verificar si el usuario tiene una cuenta en el sistema.  
Si el usuario tiene una cuenta en el sistema y se ha autenticado correctamente con su cuenta de Google, el sistema debe permitir al usuario acceder a todas las funciones y características del sistema.  
Si el usuario no tiene una cuenta en el sistema, el sistema debe crear automáticamente una cuenta utilizando la información proporcionada por Google (nombre, correo electrónico, etc.).  
Después de la autenticación exitosa, el sistema debe mostrar al usuario su perfil o la página principal del sistema, según el flujo de la aplicación.  
El sistema debe mantener la sesión iniciada para el usuario, de modo que no sea necesario autenticarse nuevamente al cerrar y volver a abrir el sistema.  
El sistema debe proporcionar una opción para cerrar sesión, lo que permitirá al usuario cerrar su sesión actual y volver a la página de inicio de sesión.  

### Historia de usuario 2:

Como usuario autenticado, quiero tener la capacidad de subir un archivo de audio al sistema para que pueda ser transcrito y utilizado en otras funcionalidades.  

Criterios de aceptación:

El sistema debe proporcionar una opción clara y accesible para subir un archivo de audio.  
El sistema debe aceptar archivos de audio en formatos comunes, como MP3, WAV, FLAC, entre otros.  
Al seleccionar la opción de subir archivo de audio, el sistema debe abrir un cuadro de diálogo o una interfaz que permita al usuario seleccionar el archivo deseado desde su dispositivo.  
El sistema debe validar y verificar que el archivo seleccionado sea efectivamente un archivo de audio válido.  
El sistema debe mostrar una indicación visual del progreso de la carga del archivo, para que el usuario pueda tener una idea clara de cuándo se completa el proceso.  
Una vez que el archivo de audio se ha cargado exitosamente, el sistema debe iniciar el proceso de transcripción automática del audio.  
El sistema debe procesar el archivo de audio y proporcionar una transcripción precisa del contenido del mismo.  
El sistema debe almacenar la transcripción del audio asociada al archivo cargado, de manera que pueda ser utilizada en otras funcionalidades del sistema.  
El sistema debe notificar al usuario cuando la transcripción del audio esté completa y disponible para su uso.  
El sistema debe permitir al usuario acceder y visualizar la transcripción del audio en una interfaz clara y legible.  
El sistema debe permitir al usuario realizar acciones adicionales con la transcripción del audio, como guardarla, compartirla o utilizarla en otras funcionalidades del sistema.
El sistema debe manejar adecuadamente los errores durante el proceso de carga y transcripción del archivo de audio, proporcionando mensajes de error claros y orientación al usuario sobre cómo solucionarlos.  


### Historia de usuario 3:

Como usuario, quiero que el sistema transcriba el archivo subido para poder obtener una versión escrita del contenido del archivo.

Criterios de aceptación:

El sistema debe recibir un archivo de audio válido y compatible para su transcripción.  
El sistema debe proporcionar una opción clara y accesible para subir un archivo de audio.  
Al seleccionar la opción de subir archivo de audio, el sistema debe permitir al usuario seleccionar el archivo deseado desde su dispositivo.  
El sistema debe validar y verificar que el archivo seleccionado sea efectivamente un archivo de audio válido.  
El sistema debe procesar el archivo de audio y generar una transcripción precisa del contenido del mismo.  
La transcripción generada por el sistema debe reflejar de manera fiel el contenido del archivo de audio.  
El sistema debe manejar diferentes formatos de audio comunes, como MP3, WAV, FLAC, entre otros.  
La transcripción del archivo de audio debe estar disponible en un formato legible y comprensible para el usuario.  
El sistema debe proporcionar la transcripción del archivo en un tiempo razonable, considerando la duración y tamaño del archivo.  
El sistema debe permitir al usuario acceder y visualizar la transcripción del archivo en una interfaz clara y legible.  
El sistema debe mantener la privacidad y seguridad de la transcripción del archivo, asegurándose de que solo el usuario autorizado pueda acceder a ella.  
El sistema debe manejar adecuadamente los errores durante el proceso de transcripción, proporcionando mensajes de error claros y orientación al usuario sobre cómo solucionarlos.  
El sistema debe ofrecer opciones para descargar o guardar la transcripción del archivo en un formato compatible, como texto o documento.  
El sistema debe permitir al usuario realizar acciones adicionales con la transcripción del archivo, como editarla, compartirlo o utilizarlo en otras funcionalidades del sistema.  

	
### Historia de usuario 4:

Como usuario, quiero tener la opción de traducir la transcripción generada por el sistema a diferentes idiomas para facilitar su comprensión en diferentes contextos.

Criterios de aceptación:

El sistema debe proporcionar una función de traducción de la transcripción generada.  
El sistema debe permitir al usuario seleccionar el idioma al que desea traducir la transcripción.  
El sistema debe ofrecer una lista de idiomas disponibles para la traducción.  
Al seleccionar un idioma para la traducción, el sistema debe procesar la transcripción y generar una versión traducida en el idioma seleccionado.  
La traducción generada por el sistema debe ser precisa y reflejar de manera fiel el contenido de la transcripción original.  
El sistema debe admitir una amplia variedad de idiomas comunes para la traducción, como inglés, español, francés, alemán, chino, entre otros.  
El sistema debe proporcionar la traducción de la transcripción en un formato legible y comprensible para el usuario.  
La traducción de la transcripción debe estar disponible en un tiempo razonable, considerando la longitud y complejidad del contenido.  
El sistema debe permitir al usuario acceder y visualizar la transcripción traducida en una interfaz clara y legible.  
El sistema debe mantener la privacidad y seguridad de la transcripción traducida, asegurándose de que solo el usuario autorizado pueda acceder a ella.  
El sistema debe manejar adecuadamente los errores durante el proceso de traducción, proporcionando mensajes de error claros y orientación al usuario sobre cómo solucionarlos.  
El sistema debe ofrecer opciones para descargar o guardar la transcripción traducida en un formato compatible, como texto o documento.  
El sistema debe permitir al usuario realizar acciones adicionales con la transcripción traducida, como editarla, compartirla o utilizarla en otras funcionalidades del sistema.  
El sistema debe mantener una interfaz intuitiva y fácil de usar para facilitar la selección y visualización de la transcripción traducida en diferentes idiomas.  


### Historia de usuario 5:

Como usuario, quiero poder resumir la transcripción generada por el sistema para obtener un resumen conciso y comprensible del contenido del archivo de audio.

Criterios de aceptación:

El sistema debe proporcionar una función de resumen de la transcripción generada.  
El sistema debe permitir al usuario seleccionar la longitud deseada del resumen, como un número de palabras o una duración de tiempo.  
El sistema debe procesar la transcripción y generar un resumen conciso que capture los puntos clave y la idea principal del contenido del archivo de audio.  
El resumen generado por el sistema debe ser coherente y mantener la cohesión y coherencia del texto original.  
El sistema debe presentar el resumen de manera legible y comprensible para el usuario.  
El sistema debe proporcionar opciones para ajustar la longitud del resumen según las preferencias del usuario.  
El resumen generado debe reflejar de manera precisa y representativa el contenido del archivo de audio.  
El sistema debe ofrecer una interfaz clara y accesible para que el usuario pueda acceder y visualizar el resumen de la transcripción.  
El sistema debe mantener la privacidad y seguridad del resumen generado, asegurándose de que solo el usuario autorizado pueda acceder a él.  
El sistema debe manejar adecuadamente los errores durante el proceso de resumen, proporcionando mensajes de error claros y orientación al usuario sobre cómo solucionarlos.  
El sistema debe permitir al usuario realizar acciones adicionales con el resumen, como guardarlo, compartirlo o utilizarlo en otras funcionalidades del sistema.  
El sistema debe mantener una interfaz intuitiva y fácil de usar para facilitar la selección y visualización del resumen de la transcripción generada.  
El sistema debe ofrecer opciones para descargar o guardar el resumen en un formato compatible, como texto o documento.  
El sistema debe proporcionar una opción para acceder a la transcripción completa en caso de que el usuario desee consultar el contenido detallado del archivo de audio.  


## Ejemplo de funcion Asyncrona

Para cada request que  utilizamos cada vez que llamamos a  las APIs, tenemos una funcion asyncrona llamada fetchData(), que nos permite recibir una respuesta de manera más eficiente y practica.
Ejemplo:
![image](https://github.com/mathiasfernandez/ria/assets/81320974/95cb7238-191a-46bc-bbd9-d4c26589f9da)




