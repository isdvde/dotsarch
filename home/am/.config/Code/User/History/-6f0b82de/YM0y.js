const express = require('express')
const router = express.Router()
const Controller = require('./controller')
const AuthMiddleware = require('../../middlewares/AuthMiddleware')
const GlobalMiddleware = require('../../middlewares/GlobalMiddleware')
const Middleware = require('./middleware')
const Model = require('./model')

var createMiddlewares = [GlobalMiddleware.checkModel(Model.create)]
var updateMiddlewares = [GlobalMiddleware.checkModel(Model.create),
	Middleware.checkConfirm,
	Middleware.checkUser,
	Middleware.checkPasswords]
var deleteMiddlewares = [GlobalMiddleware.checkUuid]

// router.use(AuthMiddleware.verifyToken)

router.get('/', Controller.get)
router.post('/', createMiddlewares, Controller.create)
router.post('/password', updateMiddlewares, Controller.changePassword)

module.exports = router

/**
* @api {get} /users 1.Obtener usuarios
* @apiName OptenerUsuarios
* @apiGroup Users
*
* @apiHeader {String} access-token Token para acceso a la API despues de login.
* @apiHeaderExample {json} Ejemplo access-token:
*
* {
*	"access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiOGRmNTExMGQtZjQyYy00MmY3LWExY2ItZmVhNWYyZGJiZjRkIiwidXNlcm5hbWUiOiJ0ZXN0In0sImlhdCI6MTY5MzU3NzMxNCwiZXhwIjoxNjkzNTgwOTE0fQ.Grd4g15x9wApc4phKBQNXHku1jQwwlyLGM5sLtgLCn0"
* }
*
*
* @apiExample {json} Ejemplo de uso:
* 		GET http://localhost:3000/api/v1/users
*/

/**
* @api {post} /users 2.Agregar usuario
* @apiName AgregarUsuario
* @apiGroup Users
*
* @apiHeader {String} access-token Token para acceso a la API despues de login.
* @apiHeaderExample {json} Ejemplo access-token:
*
* {
*	"access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiOGRmNTExMGQtZjQyYy00MmY3LWExY2ItZmVhNWYyZGJiZjRkIiwidXNlcm5hbWUiOiJ0ZXN0In0sImlhdCI6MTY5MzU3NzMxNCwiZXhwIjoxNjkzNTgwOTE0fQ.Grd4g15x9wApc4phKBQNXHku1jQwwlyLGM5sLtgLCn0"
* }
*
* @apiBody {String} username Nombre de usuario
* @apiBody {String} password Contraseña
*
* @apiExample {json} Ejemplo para agregar usuario:
* 	POST http://localhost:3000/api/v1/users
* 	{
*		"username": "admin",
*		"password": "admin"
* 	}
*
*/

/**
* @api {post} /users/password 3.Cambiar contraseña
* @apiName CambiarContraseñaUsuario
* @apiGroup Users
*
* @apiHeader {String} access-token Token para acceso a la API despues de login.
* @apiHeaderExample {json} Ejemplo access-token:
*
* {
*	"access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiOGRmNTExMGQtZjQyYy00MmY3LWExY2ItZmVhNWYyZGJiZjRkIiwidXNlcm5hbWUiOiJ0ZXN0In0sImlhdCI6MTY5MzU3NzMxNCwiZXhwIjoxNjkzNTgwOTE0fQ.Grd4g15x9wApc4phKBQNXHku1jQwwlyLGM5sLtgLCn0"
* }
*
* @apiBody {String} username Nombre de usuario
* @apiBody {String} password Contraseña
* @apiBody {String} confirm Repetir contraseña
*
* @apiExample {json} Ejemplo para agregar usuario:
* 	POST http://localhost:3000/api/v1/users
* 	{
*		"username": "admin",
*		"password": "admin"
*		"confirm": "admin"
* 	}
*
*/
