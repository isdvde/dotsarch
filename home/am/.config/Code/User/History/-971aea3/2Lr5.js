const express = require('express')
const router = express.Router()
const Controller = require('./controller')
const AuthMiddleware = require('../../middlewares/AuthMiddleware')
const GlobalMiddleware = require('../../middlewares/GlobalMiddleware')
const Model = require('./model')

var createMiddlewares = [GlobalMiddleware.checkModel(Model.create)]
var updateMiddlewares = [GlobalMiddleware.checkUuid,
	GlobalMiddleware.checkBody,
	GlobalMiddleware.checkModel(Model.update),
	GlobalMiddleware.upperData]
var deleteMiddlewares = [GlobalMiddleware.checkUuid]

// router.use(AuthMiddleware.verifyToken)

router.get('/', Controller.get)
router.post('/',createMiddlewares, Controller.create)
router.put('/:uuid', updateMiddlewares, Controller.update)
router.delete('/:uuid', deleteMiddlewares, Controller.destroy)

module.exports = router

/**
* @api {get} /carreras 1.Obtener carreras
* @apiName OptenerCarreras
* @apiGroup Carreras
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
* 		GET http://localhost:3000/api/v1/carreras
* @apiExample {json} Ejemplo de uso de uuid:
* 		GET http://localhost:3000/api/v1/carreras?uuid=bf4ed6e6-e926-4010-8fee-fb6572df1a03
* @apiExample {json} Ejemplo de uso de search:
* 		GET http://localhost:3000/api/v1/carreras?search=castellano
*/

/**
* @api {post} /carreras 2.Agregar carrera
* @apiName AgregarCarrera
* @apiGroup Carreras
*
* @apiHeader {String} access-token Token para acceso a la API despues de login.
* @apiHeaderExample {json} Ejemplo access-token:
*
* {
*	"access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiOGRmNTExMGQtZjQyYy00MmY3LWExY2ItZmVhNWYyZGJiZjRkIiwidXNlcm5hbWUiOiJ0ZXN0In0sImlhdCI6MTY5MzU3NzMxNCwiZXhwIjoxNjkzNTgwOTE0fQ.Grd4g15x9wApc4phKBQNXHku1jQwwlyLGM5sLtgLCn0"
* }
*
* @apiBody {String} pensum
* @apiBody {String} descripcion
* @apiBody {String} mencion
* @apiBody {String} plan_estudio
* @apiBody {String} titulo_obtenido
* @apiBody {Int} tipo_nivel
* @apiBody {String} nivel_estudiante
* @apiBody {String} tipo_carrera
* @apiBody {Boolean} derrogado
* @apiBody {Int} reforma
*
* @apiExample {json} Ejemplo para agregar carrera:
* 	POST http://localhost:3000/api/v1/carreras
* 	{
*		"pensum": "32011",
*		"descripcion": "educacion media general",
*		"mencion": "bachiller",
*		"plan_estudio": "educacion media general",
*		"titulo_obtenido":"bachiller",
*		"tipo_nivel": 4,
*		"nivel_estudiante":"789",
*		"tipo_carrera":"n",
*		"derrogado": false,
*		"reforma": 1
* 	}
*
*/

/**
* @api {put} /carreras/{uuid} 3.Actualizar carrera
* @apiName ActualizarCarrera
* @apiGroup Carreras
*
* @apiHeader {String} access-token Token para acceso a la API despues de login.
* @apiHeaderExample {json} Ejemplo access-token:
*
* {
*	"access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiOGRmNTExMGQtZjQyYy00MmY3LWExY2ItZmVhNWYyZGJiZjRkIiwidXNlcm5hbWUiOiJ0ZXN0In0sImlhdCI6MTY5MzU3NzMxNCwiZXhwIjoxNjkzNTgwOTE0fQ.Grd4g15x9wApc4phKBQNXHku1jQwwlyLGM5sLtgLCn0"
* }
*
* @apiBody {String} [pensum]
* @apiBody {String} [descripcion]
* @apiBody {String} [mencion]
* @apiBody {String} [plan_estudio]
* @apiBody {String} [titulo_obtenido]
* @apiBody {Int} [tipo_nivel]
* @apiBody {String} [nivel_estudiante]
* @apiBody {String} [tipo_carrera]
* @apiBody {Boolean} [derrogado]
* @apiBody {Int} [reforma]
*
* @apiExample {json} Ejemplo para actualizar carrera:
* 	PUT http://localhost:3000/api/v1/carreras/3243ec03-adcc-49ee-9819-42cecfe24e31
* 	{
* 	"descripcion": "educacion media"
* 	}
*
*/

/**
* @api {delete} /carreras/{uuid} 4.Eliminar carrera
* @apiName EliminarCarrera
* @apiGroup Carreras
*
* @apiHeader {String} access-token Token para acceso a la API despues de login.
* @apiHeaderExample {json} Ejemplo access-token:
*
* {
*	"access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiOGRmNTExMGQtZjQyYy00MmY3LWExY2ItZmVhNWYyZGJiZjRkIiwidXNlcm5hbWUiOiJ0ZXN0In0sImlhdCI6MTY5MzU3NzMxNCwiZXhwIjoxNjkzNTgwOTE0fQ.Grd4g15x9wApc4phKBQNXHku1jQwwlyLGM5sLtgLCn0"
* }
*
* @apiExample {json} Ejemplo para eliminar carrera:
* 	DELETE http://localhost:3000/api/v1/carreras/3243ec03-adcc-49ee-9819-42cecfe24e31
*
*/
