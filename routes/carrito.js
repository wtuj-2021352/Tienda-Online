const {Router} = require('express');
const { check } = require('express-validator');

const { getCarrito, postCarrito, agregarAlCarrito } = require('../controllers/carrito');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/mostrar', getCarrito);

router.put('/agregarproducto/:idCarrito',[
    validarJWT,
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom(existeProductoPorId),
], agregarAlCarrito);

router.post('/agregar',[
    validarJWT,
    check('carrito', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos,
], postCarrito);

module.exports = router;