const { PrismaClient } = require('@prisma/client')
const db = new PrismaClient()
const Utils = require('../lib/utils')

module.exports = {
	checkConfirm: function(req, res, next) {
		if(!req.confirm) return Utils.sendError(res,  400, 'Debe confirmar la contraseña')
		next()
	},
	checkPasswords: function(req, res, next){
		if(req.data.password !== req.confirm) return Utils.sendError(res, 400, 'Contraseñas no coinciden')
		next()
	},
	checkUser: async function(req, res, next){
		try {
			var user = await db.user.findUnique({
				where: { username: req.data.username }
			})
			if(!user) throw("Usuario no existe en la Base de Datos")
		} catch(e) {
			console.log(e)
			return Utils.sendError(res, 400, 'Usuario no existe', e)
		}
		req.user = user
		next()
	},
	checkPassword: async function(req, res, next){
		if(!await Utils.checkPwd(req.data.password, req.user.password)) return Utils.sendError(res, 400, 'Contraseña incorrecta');
		next()
	}
}
