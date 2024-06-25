const { PrismaClient } = require('@prisma/client')
const db = new PrismaClient()
const Utils = require('../../lib/utils')

module.exports = {
	get: async (req, res) => {
		users = await db.user.findMany()
		return res.status(200).send({ 
			status: "ok" ,
			data: {
				users: users
			}
		})
	},
	create: async (req, res) => {
		req.data.password = await Utils.hashPwd(req.data.password)
		try {
			await db.user.create({
				data: { ...req.data, uuid: Utils.genUuid() }
			})
		} catch(e) {
			console.log(e)
			return Utils.sendError(res, 400, 'Error al almacenar los datos', e)
		}
		return res.status(201).send({
			status: 'ok',
			message: "Usuario creado correctamente"
		})
	},
	changePassword: async(req, res) => {
		try {
			await db.user.update({
				where: { username: username },
				data: { password: await Utils.hashPwd(password) }
			})
		} catch(e) {
			console.log(e)
			return Utils.sendError(res, 400, 'Error al actualizar contraseña')
		}
		return res.status(200).send({
			status: 'ok',
			message: 'Contraseña actualizada correctamente'
		})
	}
}
