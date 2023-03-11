const {Router} = require('express');
const { check } = require('express-validator')

const { existeProductoPorId } = require('../helpers/db-validator')

const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');
const { validarCampos } = require('../middlewares/validar-campos')

const {getProducto, 
    postProducto, 
    putProducto, 
    deleteProducto, 
    getMasVendidos, 
    getAgotados, 
    getProductoPorId} = require('../controllers/productos');

const router = Router();

router.get('/mostrar', getProducto);

router.get('/masvendidos', getMasVendidos)

router.get('/agotados', getAgotados)

router.get('/mostrarporid/:id', [
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos,
    esAdminRole
], getProductoPorId)

router.post('/agregar',[
    validarJWT,
    check('nombre', 'El nombre del producto es obligatorio').not().isEmpty(),
    validarCampos,
    esAdminRole
], postProducto);

router.put('/editar/:id',[
    validarJWT,
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    check('nombre', 'El nombre del producto es obligatorio').not().isEmpty(),
    validarCampos,
    esAdminRole
], putProducto);

router.delete('/eliminar/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], deleteProducto);

module.exports = router;