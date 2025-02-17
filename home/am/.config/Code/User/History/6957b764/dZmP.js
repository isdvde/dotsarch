const Utils = require('../lib/utils')

module.exports = {
	checkModel: function(model) {
		return function(req, res, next) {
			try {
				var data = model.validateSync(req.body, {abortEarly: false, stripUnknown: true})
			} catch(e) {
				return Utils.sendError(res, 400, "Error en los parametros", e)
			}
			req.data = data
			next()
		}
	},
	upperData: function(req, res, next){
		Utils.toUpper(req.data)
		next()
	},
	checkBody: function(req, res, next) {
		if(Object.keys(req.body).length == 0) return Utils.sendError(res, 400, "No ha proporcionado atributos")
		next()
	},
	checkUuid: function(req, res, next) {
		if(!req.params.uuid) return Utils.sendError(res, 400, "Debe pasar el uuid de la asignatura")
		next()
	},
}
