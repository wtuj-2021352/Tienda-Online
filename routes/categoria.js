const { Router } = require('express');
const { check } = require('express-validator')

const { existeCategoriaPorId } = require('../helpers/db-validator')

const { getCategoria, postCategoria, putCategoria, deleteCategoria, getCategoriaById } = require('../controllers/categoria');

const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');

const router = Router();

router.get('/mostrar', getCategoria);

router.get('/mostrarporid/:id', [
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
], getCategoriaById);

router.post('/agregar',[
    validarJWT,
    check('nombre', 'El nombre de la categoria es obligatorio').not().isEmpty(),
    validarCampos,
    esAdminRole
], postCategoria);

router.put('/editar/:id',[
    validarJWT,
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    check('nombre', 'El nombre de la categoria es obligatorio').not().isEmpty(),
    validarCampos,
    esAdminRole
], putCategoria);

router.delete('/eliminar/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
], deleteCategoria);


module.exports = router;