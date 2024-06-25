const express = require('express')
const router = express.Router()
const Controller = require('../../controllers/v1/ProfesorController')
const AuthMiddleware = require('../../middlewares/v1/AuthMiddleware')
const GlobalMiddleware = require('../../middlewares/v1/GlobalMiddleware')
const Model = require('../../models/v1/ProfesorModel')

var createMiddlewares = [GlobalMiddleware.checkModel(Model.create),GlobalMiddleware.upperData]
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
* @api {get} /profesores 1.Obtener profesores
* @apiName OptenerProfesores
* @apiGroup Profesores
*
* @apiHeader {String} access-token Token para acceso a la API despues de login.
* @apiHeaderExample {json} Ejemplo access-token:
*
* {
*	"access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiOGRmNTExMGQtZjQyYy00MmY3LWExY2ItZmVhNWYyZGJiZjRkIiwidXNlcm5hbWUiOiJ0ZXN0In0sImlhdCI6MTY5MzU3NzMxNCwiZXhwIjoxNjkzNTgwOTE0fQ.Grd4g15x9wApc4phKBQNXHku1jQwwlyLGM5sLtgLCn0"
* }
*
* @apiQuery {String} uuid UUID de profesor para busqueda de uno en especifico
* @apiQuery {String} search Cadena de texto para busqueda de profesores segun: cedula, nombres, apellidos, telefono, sexo, estado_civil
*
*
* @apiExample {json} Ejemplo de uso:
* 		GET http://localhost:3000/api/v1/profesores
* @apiExample {json} Ejemplo de uso de uuid:
* 		GET http://localhost:3000/api/v1/profesores?uuid=bf4ed6e6-e926-4010-8fee-fb6572df1a03
* @apiExample {json} Ejemplo de uso de search:
* 		GET http://localhost:3000/api/v1/profesores?search=alejandro
*/

/**
* @api {post} /profesores 2.Agregar profesor
* @apiName AgregarProfesor
* @apiGroup Profesores
*
* @apiHeader {String} access-token Token para acceso a la API despues de login.
* @apiHeaderExample {json} Ejemplo access-token:
*
* {
*	"access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiOGRmNTExMGQtZjQyYy00MmY3LWExY2ItZmVhNWYyZGJiZjRkIiwidXNlcm5hbWUiOiJ0ZXN0In0sImlhdCI6MTY5MzU3NzMxNCwiZXhwIjoxNjkzNTgwOTE0fQ.Grd4g15x9wApc4phKBQNXHku1jQwwlyLGM5sLtgLCn0"
* }
*
* @apiBody {String} cedula Debe tener el formato V-0000000
* @apiBody {String} nombres
* @apiBody {String} apellidos
* @apiBody {String} sexo Solo permite valores M o F
* @apiBody {String} estado_civil=SOLTERO Solo permite valores SOLTERO, CASADO, DIVORCIADO, VIUDO
* @apiBody {String} telefono
* @apiBody {String} [titulo]
* @apiBody {String} [instituto_egreso]
* @apiBody {String} [anno_graduado]
* @apiBody {String} [cargo]
* @apiBody {String} [fecha_ingreso]
* @apiBody {String} [fecha_egreso]
* @apiBody {String} [sueldo]
* @apiBody {String} [direccion]
* @apiBody {String} [email]
*
* @apiExample {json} Ejemplo para agregar profesor:
* 	POST http://localhost:3000/api/v1/profesores
* 	{
*		"cedula": "V-12345",
*		"nombres": "Jose Andres",
*		"apellidos": "Molina Perez",
*		"telefono": "498732948372",
*		"sexo": "M",
*		"estado_civil": "SOLTERO"
* 	}
*
*/

/**
* @api {put} /profesores/{uuid} 3.Actualizar profesor
* @apiName ActualizarProfesor
* @apiGroup Profesores
*
* @apiHeader {String} access-token Token para acceso a la API despues de login.
* @apiHeaderExample {json} Ejemplo access-token:
*
* {
*	"access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiOGRmNTExMGQtZjQyYy00MmY3LWExY2ItZmVhNWYyZGJiZjRkIiwidXNlcm5hbWUiOiJ0ZXN0In0sImlhdCI6MTY5MzU3NzMxNCwiZXhwIjoxNjkzNTgwOTE0fQ.Grd4g15x9wApc4phKBQNXHku1jQwwlyLGM5sLtgLCn0"
* }
*
* @apiBody {String} [cedula] Debe tener el formato V-0000000
* @apiBody {String} [nombres]
* @apiBody {String} [apellidos]
* @apiBody {String} [sexo] Solo permite valores M o F
* @apiBody {String} [estado_civil=SOLTERO] Solo permite valores SOLTERO, CASADO, DIVORCIADO, VIUDO
* @apiBody {String} [telefono]
* @apiBody {String} [titulo]
* @apiBody {String} [instituto_egreso]
* @apiBody {String} [anno_graduado]
* @apiBody {String} [cargo]
* @apiBody {String} [fecha_ingreso]
* @apiBody {String} [fecha_egreso]
* @apiBody {String} [sueldo]
* @apiBody {String} [direccion]
* @apiBody {String} [email]
*
* @apiExample {json} Ejemplo para actualizar profesor:
* 	PUT http://localhost:3000/api/v1/profesores/3243ec03-adcc-49ee-9819-42cecfe24e31
* 	{
*		"telefono": "8761231",
* 	}
*
*/

/**
* @api {delete} /profesores/{uuid} 4.Eliminar profesor
* @apiName EliminarProfesor
* @apiGroup Profesores
*
* @apiHeader {String} access-token Token para acceso a la API despues de login.
* @apiHeaderExample {json} Ejemplo access-token:
*
* {
*	"access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiOGRmNTExMGQtZjQyYy00MmY3LWExY2ItZmVhNWYyZGJiZjRkIiwidXNlcm5hbWUiOiJ0ZXN0In0sImlhdCI6MTY5MzU3NzMxNCwiZXhwIjoxNjkzNTgwOTE0fQ.Grd4g15x9wApc4phKBQNXHku1jQwwlyLGM5sLtgLCn0"
* }
*
* @apiExample {json} Ejemplo para eliminar profesor:
* 	DELETE http://localhost:3000/api/v1/profesores/3243ec03-adcc-49ee-9819-42cecfe24e31
*
*/
