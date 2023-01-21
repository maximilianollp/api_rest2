const {Router} = require ("express")
const {check}=require("express-validator")
const { validarCampos } = require("../middlewares/validar-campos")
const{esRoleValido,emailExiste,existeUsuarioPorId}=require("../helpers/db-validators")
// const Role =require('../models/roles')
const {usuariosGet, usuarioPost, usuarioPut, usuarioDelete}=require('../controllers/usuarios')


const router = Router ()

router.get('/', usuariosGet)

router.post('/',
[
    check("nombre","El nombre es obligatorio").notEmpty(),
    check ("password","La contraseña debe tener como minimo 6 cracteres").isLength({min:6,}) ,
    check("email","El correo no es valido").isEmail(),
    check("email").custom(emailExiste),
    // check("role","No es un rol valido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check ("role").custom(esRoleValido),

    validarCampos,
    
],usuarioPost );

router.put('/:id', [
    check("id","No es un ID valido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    check ("role").custom(esRoleValido),
    validarCampos]  ,
    usuarioPut)

router.delete('/:id',[
    check("id","No es un ID valido").isMongoId(),
    check("id").custom(existeUsuarioPorId), 
    validarCampos
]
 ,usuarioDelete)


module.exports=router
