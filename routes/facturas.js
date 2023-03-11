const {Router} = require('express');
const { check } = require('express-validator');

const { getFactura, comprar } = require('../controllers/facturas');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');

const router = Router();

router.get('/mostrar',[
    validarJWT,
    esAdminRole
], getFactura);

router.get('/comprar',[
    validarJWT,
    validarCampos,
    esAdminRole
], comprar)


module.exports = router