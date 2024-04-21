const crypto = require('crypto')
const bcrypt = require('bcrypt')


module.exports = {
	sendError: function(res, status, message, description="Error") {
		return res.status(status).send({
			status: 'error',
			message: message,
			description: `${description}`
		})
	},
	toUpper: function(obj) {
		for (var key in obj) {
			if (obj[key] !== null && typeof obj[key] === "object") {
				continue;
				// iterate(obj[key]);
			} else if (obj[key] !== null && typeof obj[key] === "string") {
				obj[key] = obj[key].toUpperCase();
			}
		}
	},
	genUuid: function(){
		return crypto.randomUUID()
	},
	hashPwd: async function(pwd) {
		salt = await bcrypt.genSalt(2)
		return await bcrypt.hash(pwd, salt)
	},
	checkPwd: async function(pwd, hash) {
		return await bcrypt.compare(pwd, hash);
	}

}
