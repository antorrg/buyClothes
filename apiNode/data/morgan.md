# Morgan docs:
```javascript
// Middleware de registro de solicitudes HTTP para Node.js
// Nombrado así por Dexter, un programa que no deberías ver hasta el final.

// API
var morgan = require('morgan')
morgan(format, opciones)
// Crea una nueva función de middleware de registro de Morgan utilizando el formato y las opciones dados. 
// El argumento de formato puede ser una cadena de un nombre predefinido (ver más abajo para los nombres), 
// una cadena de un formato específico o una función que producirá una entrada de registro.

// La función de formato se llamará con tres argumentos tokens, req y res, 
// donde tokens es un objeto con todos los tokens definidos, req es la solicitud HTTP y res es la respuesta HTTP. 
// Se espera que la función devuelva una cadena que será la línea de registro, o undefined/null para omitir el registro.

// Usando una cadena de formato predefinida
morgan('tiny')

// Usando una cadena de formato con tokens predefinidos
morgan(':method :url :status :res[content-length] - :response-time ms')

// Usando una función de formato personalizado
morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ].join(' ')
})

// Opciones
// Morgan acepta estas propiedades en el objeto de opciones.

// immediate
// Escribe la línea de registro en la solicitud en lugar de la respuesta. Esto significa que las solicitudes se registrarán 
// incluso si el servidor se bloquea, pero no se pueden registrar datos de la respuesta (como el código de respuesta, la longitud del contenido, etc.).

// skip
// Función para determinar si se omite el registro, por defecto es false. 
// Esta función se llamará como skip(req, res).

// EJEMPLO: solo registrar respuestas de error
morgan('combined', {
  skip: function (req, res) { return res.statusCode < 400 }
})

// stream
// Flujo de salida para escribir líneas de registro, por defecto es process.stdout.

// Formatos predefinidos
// Hay varios formatos predefinidos proporcionados:

// combined
// Salida estándar combinada de registro Apache.

// common
// Salida estándar común de registro Apache.

// dev
// Salida concisa coloreada por el estado de respuesta para uso en desarrollo.

// short
// Más corto que el predeterminado, también incluye el tiempo de respuesta.

// tiny
// La salida mínima.

// Tokens
// Creación de nuevos tokens
// Para definir un token, simplemente invoca morgan.token() con el nombre y una función de devolución de llamada. 
// Se espera que esta función de devolución de llamada devuelva un valor de cadena. El valor devuelto está disponible como ":type" en este caso:

morgan.token('type', function (req, res) { return req.headers['content-type'] })

// Llamando a morgan.token() utilizando el mismo nombre que un token existente sobrescribirá esa definición de token.

// :date[format]
// La fecha y hora actuales en UTC. Los formatos disponibles son:

// clf para el formato de registro común ("10/Oct/2000:13:55:36 +0000")
// iso para el formato de fecha y hora común ISO 8601 (2000-10-10T13:55:36.000Z)
// web para el formato de fecha y hora común RFC 1123 (Tue, 10 Oct 2000 13:55:36 GMT)
// Si no se proporciona un formato, entonces el predeterminado es web.

// :http-version
// La versión HTTP de la solicitud.

// :method
// El método HTTP de la solicitud.

// :referrer
// La cabecera Referrer de la solicitud. Esto utilizará la cabecera Referer mal escrita si existe, de lo contrario Referrer.

// :remote-addr
// La dirección remota de la solicitud. Esto utilizará req.ip, de lo contrario el valor estándar req.connection.remoteAddress (dirección del socket).

// :remote-user
// El usuario autenticado como parte de la autenticación básica para la solicitud.

// :req[header]
// La cabecera dada de la solicitud. Si la cabecera no está presente, el valor se mostrará como "-" en el registro.

// :res[header]
// La cabecera dada de la respuesta. Si la cabecera no está presente, el valor se mostrará como "-" en el registro.

// :response-time[digits]
// El tiempo entre la solicitud que llega a Morgan y cuando se escriben las cabeceras de respuesta, en milisegundos.

// El argumento digits es un número que especifica la cantidad de dígitos a incluir en el número, con un valor predeterminado de 3, que proporciona precisión en microsegundos.

// :status
// El código de estado de la respuesta.

// Si el ciclo de solicitud / respuesta se completa antes de que se envíe una respuesta al cliente 
// (por ejemplo, el socket TCP se cierra prematuramente debido a que un cliente aborta la solicitud), 
// entonces el estado estará vacío (se mostrará como "-" en el registro).

// :total-time[digits]
// El tiempo entre la solicitud que llega a Morgan y cuando la respuesta ha terminado de escribirse en la conexión, en milisegundos.

// El argumento digits es un número que especifica la cantidad de dígitos a incluir en el número, con un valor predeterminado de 3, que proporciona precisión en microsegundos.

// :url
// La URL de la solicitud. Esto utilizará req.originalUrl si existe, de lo contrario req.url.

// :user-agent
// El contenido de la cabecera User-Agent de la solicitud.

// morgan.compile(format)
// Compila una cadena de formato en una función de formato para su uso por Morgan. 
// Una cadena de formato es una cadena que representa una única línea de registro y puede utilizar la sintaxis de token. 
// Los tokens se referencian por :nombre-token. Si los tokens aceptan argumentos, se pueden pasar usando [], por ejemplo: :nombre-token[pretty] pasaría la cadena 'pretty' como argumento al token nombre-token.

// La función devuelta por morgan.compile toma tres argumentos tokens, req y res, 
// donde tokens es un objeto con todos los tokens definidos, req es la solicitud HTTP y res es la respuesta HTTP. 
// La función devolverá una cadena que será la línea de registro, o undefined/null para omitir el registro.

// Normalmente, los formatos se definen utilizando morgan.format(nombre, formato), 
// pero para ciertos usos avanzados, esta función de compilación está directamente disponible.

// Ejemplos
// express/connect
// Aplicación simple que registrará todas las solicitudes en el formato combinado de Apache en STDOUT

var express = require('express')
var morgan = require('morgan')

var app = express()

app.use(morgan('combined'))

app.get('/', function (req, res) {
  res.send('¡Hola, mundo!')
})

// Servidor HTTP básico
// Aplicación simple que registrará todas las solicitudes en el formato combinado de Apache en STDOUT

var finalhandler = require('finalhandler')
var http = require('http')
var morgan = require('morgan')

// Crear "middleware"
var logger = morgan('combined')

http.createServer(function (req, res) {
  var done = finalhandler(req, res)
  logger(req, res, function (err) {
    if (err) return done(err)

    // Responder a la solicitud
    res.setHeader('content-type', 'text/plain')
    res.end('¡Hola, mundo!')
  })
})

// Escribir registros en un archivo
// Archivo único
// Aplicación simple que registrará todas las solicitudes en el formato combinado de Apache en el archivo access.log.

var express = require('express')
var fs = require('fs')
var morgan = require('morgan')
var path = require('path')

var app = express()

// Crear un flujo de escritura (en modo de anexar)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

// Configurar el registro
app.use(morgan('combined', { stream: accessLogStream }))

app.get('/', function (req, res) {
  res.send('¡Hola, mundo!')
})

// Rotación de archivos de registro
// Aplicación simple que registrará todas las solicitudes en el formato combinado de Apache en un archivo de registro por día en el directorio log/ usando el módulo rotating-file-stream.

var express = require('express')
var morgan = require('morgan')
var path = require('path')
var rfs = require('rotating-file-stream') // versión 2.x

var app = express()

// Crear un flujo de escritura giratorio
var accessLogStream = rfs.createStream('access.log', {
  interval: '1d', // girar diariamente
  path: path.join(__dirname, 'log')
})

// Configurar el registro
app.use(morgan('combined', { stream: accessLogStream }))

app.get('/', function (req, res) {
  res.send('¡Hola, mundo!')
})

// Registro dividido / doble
// El middleware morgan se puede usar tantas veces como sea necesario, lo que permite combinaciones como:

// Entrada de registro en la solicitud y otra en la respuesta
// Registrar todas las solicitudes en un archivo, pero los errores en la consola
// ... ¡y más!
// Aplicación de ejemplo que registrará todas las solicitudes en un archivo utilizando el formato Apache, pero las respuestas de error se registran en la consola:

var express = require('express')
var fs = require('fs')
var morgan = require('morgan')
var path = require('path')

var app = express()

// Registrar solo respuestas 4xx y 5xx en la consola
app.use(morgan('dev', {
  skip: function (req, res) { return res.statusCode < 400 }
}))

// Registrar todas las solicitudes en access.log
app.use(morgan('common', {
  stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
}))

app.get('/', function (req, res) {
  res.send('¡Hola, mundo!')
})

// Usar formatos de token personalizados
// Aplicación de ejemplo que utilizará formatos de token personalizados. Esto agrega un ID a todas las solicitudes y lo muestra usando el token :id.

var express = require('express')
var morgan = require('morgan')
var uuid = require('node-uuid')

morgan.token('id', function getId (req) {
  return req.id
})

var app = express()

app.use(assignId)
app.use(morgan(':id :method :url :response-time'))

app.get('/', function (req, res) {
  res.send('¡Hola, mundo!')
})

function assignId (req, res, next) {
  req.id = uuid.v4()
  next()
}

```

Fue un error tipográfico en la traducción. La referencia a "express/connect" se refiere a Express, el popular marco web para Node.js, y "connect" que es un módulo middleware para Node.js que proporciona una serie de funciones middleware útiles.

Cuando se menciona "express/connect" en la documentación de Morgan, se está indicando que Morgan es compatible tanto con Express como con Connect, ya que Connect es un marco web más antiguo que fue la base sobre la cual se construyó Express.

En resumen, puedes usar Morgan con Express o con Connect para registrar solicitudes HTTP. Ambos son marcos web para Node.js, y Express se basó originalmente en Connect. Por lo tanto, si estás utilizando Express, puedes utilizar Morgan para el registro de solicitudes HTTP.





