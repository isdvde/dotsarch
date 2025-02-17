const jwt = require('jsonwebtoken');
const {PrismaClient} = require('@prisma/client');
const db = new PrismaClient();
const {JWT} = require('../../config');
const Utils = require('../lib/utils')

module.exports = {
	verifyToken: async (req, res, next) => {
		const accessToken = req.headers["access-token"];
		if(!accessToken) return Utils.sendError(res, 400, "No esta autorizado");
		try {
			var verify = jwt.verify(accessToken, JWT.key);
			if(!verify) throw("No esta autorizado");
		} catch(e) {
			console.log(e);
			return Utils.sendError(res, 400, "No esta autorizado");
		}
		console.log(verify)
		if(!verify.user.id) return Utils.sendError(res, 400, "No esta autorizado");
		try {
			var user = await db.user.findFirst({
				where: {
					uuid: verify.user.id
				}
			});
			if(!user) throw("Error");
		} catch(e) {
			console.log(e);
			return Utils.sendError(res, 400, "No esta autorizado");
		}
		req.user = verify.user;
		next();
	}
}
