# Coursera_Red_Bicicletas

Repositorio que contiene el codigo que estoy utilizando actualmente para seguir el curso de backend con NodeJS, Express y MongoDB, contiene el proyecto creado a partir de tutoriales junto con cosas que decidi agregar personalmente.

## Cronologia del Proyecto.

1. Creado el proyecto NodeJS
2. Instalado el framework Express y el script nodemon, agregandolo a package.json como dependencia
3. Creado la pagina principal de red de bicicletas
4. Dando formato a la pagina principal con un bootstrap template
5. Creada la subpagina '/bicicletas'
6. Creada las carpetas Models y Controllers para seguir el patrón MVC
7. Creado el archivo bicicleta en modelo, donde agregamos las funciones para seguir el estilo CRUD
8. Creado el archivo bicicleta en Controllers, donde manejamos los exports que se llaman al realizar distintas requests o llamados GET o POST
9. Creado el archivo bicicletas en routes, donde se utiliza el Router de Express para manejar los llamados segun el metodo utilizado (GET y POST actualmente)
10. Exportado el router y agregado '/bicicletas' como index de el modelo de bicicletas, donde vamos a manejar lo que eventualmente será la base de datos.
11. Creada la subcarpeta bicicletas en Views, donde agregamos los archivos pug encargados de mostrar, crear, editar e indexar las bicicletas.
12. Creado el archivo show, donde utilicé la libreria Leafletjs para agregar un mapa interactivo al seleccionar una bicicleta especifica por ID.
13. Creado el modelo para la api, con el controller devolviendo un JSON y el route que exporta ese controller a app.js
14. Decidi cambiar un poco los nombres, en el tutorial es todo nombrado bicicleta, creo que eso es muy confuso así que salvo a las vistas que definen la url, le voy a agregar un nombre descriptivo a los demas archivos
15. Utilicé la plataforma [Postman](https://www.postman.com/) para verificar la correct aplicación de la API.
16. Ahora que tenemos una API con la ubicacion de las bicicletas vamos a acceder a esa API para poder agregarlas al mapa de la pagina principal.
17. El curso utiliza .ajax para acceder a la API, yo decidi utilizar .fetch, pero igualmente dejé comentado la solución original. Probado originalmente en una branch nueva.
18. Las bicicletas actuales aparecen en la pagina principal, insertadas por medio de un fetch request.
19. Creando un metodo para crear nuevas bicicletas y agregarlas a la api por medio de POST request, agregado al router, probado en postman, funcionando.
20. Creado metodo Update, donde se puede modificar la bicicleta segun su ID. probado en postman con verbo PATCH, funcionando.
21. Merge de la branch que probaba ES6 a la branch master, commit y subido al remoto.