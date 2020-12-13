# Coursera_Red_Bicicletas

Repositorio que contiene el codigo que estoy utilizando actualmente para seguir el curso de backend con NodeJS, Express y MongoDB, contiene el proyecto creado a partir de tutoriales junto con cosas que decidi agregar personalmente.

Aqui se encuentra la web en heroku:
https://red-bicicletas-juanfe.herokuapp.com

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
39. creamos el Schema token.js en models, lo vinculamos con el usuario por medio del ObjectId que referencia a "Usuario"
40. Incluido validadores de atributos con el plugin unique validator que instalamos por npm y agregamos por medio de usuarioSchema.plugin
41. Instalado el nodemailer y creada una cuenta de ethereal, creado un test para testear que envie mails correctamente, el orden del video y la actividad estaba invertido así que no era necesario, simplemente fue un test extra que agregue
42. Creados y maqueteados los pugs index, create y update de usuarios
43. agregado el route de user y token a app.js
44. modificado el modelo de usuario para funcionar con ese token y enviar el mail de bienvenida usando el mailer
45. El curso está fuera de orden así que hay que revisar bien todo antes de continuar
46. Bajamos la carpeta adicional session, que incluye informacion de login, forgot and reset password y un css para darle formato
47. Instalamos passport, passport local y express-sessions para poder crear la autenticacion del login y el seteo de cookies
48. Programamos el tipo de sesion local y la inicializacion de cookies en el app.js y la estrategia, serializacion y deserializacion del usuario en config/passport.js
49. Creamos los metodos get y post del login, forgot password y reset password en app.js acorde al ejercicio (despues lo cambiare a sus respectivos routes y controllers)
50. Agregando el metodo para reiniciar password en el modelo de usuario.js en app.js
51. Creado la funcion loggedIn para verificar que el usuario este logueado y pueda acceder a otras paginas como '/bicicletas'
52. Arreglando bugs en las vistas y controller de bicicleta
53. Instalamos JWT para poder utilizar autenticacion en la API con JSON Web Token
54. Creamos la funcion validarUsuario que verifica que el token sea el correcto
55. Creamos el controller authControllerAPI.js para que autentique a los usuario que pidan algo a las API
56. aplicamos la funcion validarUsuario a la api de bicicletas.
57. creamos el remoto a heroku
58. creamos la base de datos en la nube con mongo atlas
59. creamos un usuario en la base de datos en la nube
60. Instalamos dotenv y empezamos a utilizar información sensible como variables de ambiente en lugar de mostrarlas explicitamente.
61. Instalado nodemailer-sendgrid-transport para utilizar en production con heroku
62. cambiamos las variables con información de mailer para utilizarse con variables de ambiente.
63. Agregado opciones de login con facebook y google
64. Agregado registro de facebook por token.
65. Agregado monitoreo por new relic.
66. Arreglado sistema de envio de mails de sendgrid
67. Arreglado sistema de login y cambiado para usar routes y controllers.
68. Agregado una opcion de registro de usuario sin vulnerar la parte de usuarios
69. Agregado un nuevo token al mapa para que pueda acceder y detectar bicicletas.