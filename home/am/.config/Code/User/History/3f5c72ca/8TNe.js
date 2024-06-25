const express = require('express')
const router = express.Router()
const Controller = require('./controller')
const AuthMiddleware = require('../../middlewares/AuthMiddleware')
const GlobalMiddleware = require('../../middlewares/GlobalMiddleware')
const Model = require('./model')

var createMiddlewares = [GlobalMiddleware.checkModel(Model.create)]
var updateMiddlewares = [GlobalMiddleware.checkUuid, GlobalMiddleware.checkBody, GlobalMiddleware.checkModel(Model.update), GlobalMiddleware.upperData]
var deleteMiddlewares = [GlobalMiddleware.checkUuid]

// router.use(AuthMiddleware.verifyToken)

router.get('/', Controller.get)
router.post('/',createMiddlewares, Controller.create)
router.put('/:uuid', updateMiddlewares, Controller.update)
router.delete('/:uuid', deleteMiddlewares, Controller.destroy)

module.exports = router

/**
* @api {get} /asignaturas 1.Obtener asignaturas
* @apiName OptenerAsignaturas
* @apiGroup Asignaturas
*
* @apiHeader {String} access-token Token para acceso a la API despues de login.
* @apiHeaderExample {json} Ejemplo access-token:
*
* {
*	"access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiOGRmNTExMGQtZjQyYy00MmY3LWExY2ItZmVhNWYyZGJiZjRkIiwidXNlcm5hbWUiOiJ0ZXN0In0sImlhdCI6MTY5MzU3NzMxNCwiZXhwIjoxNjkzNTgwOTE0fQ.Grd4g15x9wApc4phKBQNXHku1jQwwlyLGM5sLtgLCn0"
* }
*
* @apiQuery {String} uuid UUID de profesor para busqueda de uno en especifico
* @apiQuery {String} search Cadena de texto para busqueda de profesores segun: nombre, nombre_corto, iniciales, practica
*
*
* @apiExample {json} Ejemplo de uso:
* 		GET http://localhost:3000/api/v1/asignaturas
* @apiExample {json} Ejemplo de uso de uuid:
* 		GET http://localhost:3000/api/v1/asignaturas?uuid=bf4ed6e6-e926-4010-8fee-fb6572df1a03
* @apiExample {json} Ejemplo de uso de search:
* 		GET http://localhost:3000/api/v1/asignaturas?search=castellano
*/

/**
* @api {post} /asignaturas 2.Agregar asignatura
* @apiName AgregarAsignatura
* @apiGroup Asignaturas
*
* @apiHeader {String} access-token Token para acceso a la API despues de login.
* @apiHeaderExample {json} Ejemplo access-token:
*
* {
*	"access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiOGRmNTExMGQtZjQyYy00MmY3LWExY2ItZmVhNWYyZGJiZjRkIiwidXNlcm5hbWUiOiJ0ZXN0In0sImlhdCI6MTY5MzU3NzMxNCwiZXhwIjoxNjkzNTgwOTE0fQ.Grd4g15x9wApc4phKBQNXHku1jQwwlyLGM5sLtgLCn0"
* }
*
* @apiBody {String} nombre
* @apiBody {String} [nombre_corto]
* @apiBody {String} [iniciales]
* @apiBody {String} [practica]
*
* @apiExample {json} Ejemplo para agregar asignatura:
* 	POST http://localhost:3000/api/v1/asignaturas
* 	{
*		"nombre": "matematica",
*		"nombre_corto": "matematica",
*		"iniciales": "MA",
* 	}
*
*/

/**
* @api {put} /asignaturas/{uuid} 3.Actualizar asignatura
* @apiName ActualizarAsignatura
* @apiGroup Asignaturas
*
* @apiHeader {String} access-token Token para acceso a la API despues de login.
* @apiHeaderExample {json} Ejemplo access-token:
*
* {
*	"access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiOGRmNTExMGQtZjQyYy00MmY3LWExY2ItZmVhNWYyZGJiZjRkIiwidXNlcm5hbWUiOiJ0ZXN0In0sImlhdCI6MTY5MzU3NzMxNCwiZXhwIjoxNjkzNTgwOTE0fQ.Grd4g15x9wApc4phKBQNXHku1jQwwlyLGM5sLtgLCn0"
* }
*
* @apiBody {String} [nombre]
* @apiBody {String} [nombre_corto]
* @apiBody {String} [iniciales]
* @apiBody {String} [practica]
*
* @apiExample {json} Ejemplo para actualizar asignatura:
* 	PUT http://localhost:3000/api/v1/asignaturas/3243ec03-adcc-49ee-9819-42cecfe24e31
* 	{
*		"iniciales": "MA",
* 	}
*
*/

/**
* @api {delete} /asignaturas/{uuid} 4.Eliminar asignatura
* @apiName EliminarAsignatura
* @apiGroup Asignaturas
*
* @apiHeader {String} access-token Token para acceso a la API despues de login.
* @apiHeaderExample {json} Ejemplo access-token:
*
* {
*	"access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiOGRmNTExMGQtZjQyYy00MmY3LWExY2ItZmVhNWYyZGJiZjRkIiwidXNlcm5hbWUiOiJ0ZXN0In0sImlhdCI6MTY5MzU3NzMxNCwiZXhwIjoxNjkzNTgwOTE0fQ.Grd4g15x9wApc4phKBQNXHku1jQwwlyLGM5sLtgLCn0"
* }
*
* @apiExample {json} Ejemplo para eliminar asignatura:
* 	DELETE http://localhost:3000/api/v1/asignaturas/3243ec03-adcc-49ee-9819-42cecfe24e31
*
*/
