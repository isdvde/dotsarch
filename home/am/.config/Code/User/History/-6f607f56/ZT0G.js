const { PrismaClient } = require('@prisma/client')
const db = new PrismaClient()
const Utils = require('../../lib/utils')

function searchQuery(search) {
	return "select * from carreras " + 
		"where pensum ilike '%"+search+"%' " + 
		"or descripcion ilike '%"+search+"%' " +
		"or mencion ilike '%"+search+"%' " +
		"or plan_estudio ilike '%"+search+"%' " +
		"or titulo_obtenido ilike '%"+search+"%' " +
		"or nivel_estudiante ilike '%"+search+"%' " +
		"or tipo_carrera ilike '%"+search+"%' "
}

module.exports = {
	get: async (req, res) => {
		var page = !req.query.page ? 0 : req.query.page-1
		var search = req.query.search
		var uuid = req.query.uuid
		try {
			if(search) {
				var carreras = await db.$queryRawUnsafe(searchQuery(search) + "limit 10 offset " + page*10)
				var items = await db.$queryRawUnsafe(searchQuery(search))
				items = items.length === 0 ? 0 : Number(items[0].count)
			} else if(uuid){
				var carreras = await db.carrera.findMany({
					where: { uuid: uuid }
				})
				var items = 1
			} else {
				var carreras = await db.carrera.findMany({
					skip: page*10,
					take: 10
				})
				var items = await db.carrera.count()
			}
		} catch(e) {
			console.log(e)
			return Utils.sendError(res, "Error al consultar la Base de Datos", e)
		}
		var currentPage = page+1
		var pages = items <= 10 ? 1 : Math.ceil(items/10)
		var next = page+1 < pages ? `page=${currentPage+1}` : null
		var data = {
			status: "ok" ,
			pagination: {
				items: items,
				page: currentPage,
				pages: pages,
				next: next
			},
			data: { carreras: carreras }
		}
		return res.status(200).send(data)
	},
	create: async (req, res) => {
		try {
			await db.carrera.create({
				data: {
					...req.data,
					uuid: Utils.genUuid(),
				}
			})
		} catch(e) {
			console.log(e)
			return Utils.sendError(res, 'Error al almacenar los datos', e)
		}
		var data = {
			status: 'ok',
			message: "Registro agregado correctamente"
		}
		return res.status(201).send(data)
	},
	update: async (req, res) => {
		var uuid = req.params.uuid
		try {
			await db.carrera.update({
				where: { uuid: uuid },
				data: req.data
			})
		} catch(e) {
			console.log(e)
			return Utils.sendError(res, 'Error al almacenar los datos', e)
		}
		var data = {
			status: 'ok',
			message: "Registro actualizado correctamente"
		}
		return res.status(201).send(data)
	},
	destroy: async (req, res) => {
		var uuid = req.params.uuid
		try {
			var carrera = await db.carrera.delete({
				where: { uuid: uuid }
			})
		} catch(e) {
			console.log(e)
			return Utils.sendError(res, "Error en los parametros", e)
		}
		var data = {
			status: 'ok',
			message: "Registro eliminado correctamente",
			data: { carrera: carrera }
		}
		return res.status(200).send(data)
	},
}
