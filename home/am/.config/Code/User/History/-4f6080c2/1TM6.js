const express = require('express')
const router = express.Router()

// router.use('/users', require('./UserRouter'))
// router.use('/auth', require('./AuthRouter'))
router.use('/profesores', require('./modules/profesor/router'))
// router.use('/asignaturas', require('./AsignaturaRouter'))
// router.use('/carreras', require('./CarreraRouter'))

module.exports = router
