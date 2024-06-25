const express = require('express')
const router = express.Router()

router.use('/users', require('./modules/user/router'))
// router.use('/auth', require('./AuthRouter'))
router.use('/profesores', require('./modules/profesor/router'))
router.use('/asignaturas', require('./modules/asignatura/router'))
router.use('/carreras', require('./modules/carrera/router'))

module.exports = router
