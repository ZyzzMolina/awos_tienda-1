const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');
const authMiddleware = require('../middlewares/authMiddleware');
const externalController = require('../controllers/externalController');

router.post('/poblar', externalController.poblarProductos);
router.get('/buscar', externalController.buscarProductos);

router.get('/', productoController.getProductos);
router.post('/', authMiddleware, productoController.crearProducto);

module.exports = router;