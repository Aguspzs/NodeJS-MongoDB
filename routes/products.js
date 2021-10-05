var express = require('express');
var router = express.Router();

const productController = require("../controllers/productsController")

/* GET users listing. */
router.get('/', productController.getAll);
router.get('/destacados', productController.getDestacados);
router.get('/:id', productController.getById);
router.post('/', (req, res, next) => { req.app.validateUser(req, res, next) }, productController.create);
router.put('/:id', (req, res, next) => { req.app.validateUser(req, res, next) }, productController.update);
router.delete('/:id', (req, res, next) => { req.app.validateUser(req, res, next) }, productController.delete);

module.exports = router;