// productRoutes.js
const express = require('express');
const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware'); // Importa el middleware

const router = express.Router();

// Aplica el middleware a todas las rutas de productos
router.use(authMiddleware);

// Rutas de productos
router.post('/', productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/search', productController.searchProducts);
router.get('/:id', productController.getProductById);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
