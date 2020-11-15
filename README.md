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
22. Instalado el framework Jasmine, para hacer unit testing
23. Creado el spec bicicleta_test, que testea la correcta funcionalidad de cada funcion del modelo bicicleta.js
24. Instalada la libreria request, que nos deja hacer llamados a la api mas facilmente, para poder testear
25. Creado los tests para todos los llamados de la api.
26. Instalado mongoDB en la maquina y ODM client mongoose para poder utilizar mongoose en nuestra pagina
27. Comenzado a migrar el modelo bicicleta para pasar de guardar en memoria a modelo de mongoose.
28. Creamos el Schema inicial del modelo Bicicleta con mongoose
29. Adaptamos las funciones del modelo bicicleta para que funcionen con Mongo.
30. Adaptamos los tests para que creen su propia base de datos que funcione con Mongo y pueda probar las funciones del modelo.
31. Adaptamos los tests y los controllers de la API  para que funcione correctamente.
32. Creamos los modelos Reserva y Usuario, con sus respectivos schemas y funciones para agregar usuarios a la base de datos y realizar reservas de bicicletas con ellos.
33. Creamos los tests para las funciones del modelo de usuario y la api
34. Creamos la Route respectiva de la API usuario y lo agregamos a app.js
35. Extendiendo funcionalidad de modelo de usuario, agregandole email, password y pasos de verificación, incluyendo los token de seguridad
36. Validamos el mail por medio de regex.
37. Creamos los token que van a ser utilizados para seguridad del password
38. instalamos la libreria de encriptacion bcrypt y lo utilizamos para verificar si el password es modificado y si es el correcto al momento de ser utilizado. 