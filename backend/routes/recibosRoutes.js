const express = require('express')
const router = express.Router()
const recibosController = require('../controllers/recibosController')

router.post('/', recibosController.createRecibo)
router.get('/', recibosController.getRecibos)
router.get('/:id', recibosController.getReciboById)
router.delete('/:id', recibosController.deleteRecibo)

module.exports = router
