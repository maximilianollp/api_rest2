const {request, resolve }=require('express')
const bcrypt = require ('bcryptjs')


const Usuario = require ('../models/usuario')
const { Promise } = require('mongoose')


const usuariosGet= async(req=request, res)=> {
const {limite=5,desde=0}= req.query
// const usuarios=await Usuario.find({estado:true})
// .skip(desde)
// .limit(limite)

// const total=await Usuario.countDocuments({estado:true})

// hacer peticiones simultaneas
const [usuarios,total]=await Promise.all([
    Usuario.find({estado:true})
.skip(desde)
.limit(limite),
Usuario.countDocuments({estado:true}),
])
    res.json({
        total,
        usuarios,
    })
}

const usuarioPost= async(req=request, res=resolve)=> {

    const {nombre,email,password,role}=req.body;
    const usuario= new Usuario({nombre,email,password,role});

    // encriptar contraseña
    const salt=bcrypt.genSaltSync();
    usuario.password=bcrypt.hashSync(password,salt);


    await usuario.save();

    res.status(201).json({
        // msg: 'Peticion POST- controller',
        usuario,
    });
}

const usuarioPut= async (req, res)=> {
    const {id} = req.params
    const{_id,password,email,...datos}=req.body

    // validar contra la base de datos
    if (password) {
        // encriptar contraseña
        const salt=bcrypt.genSaltSync();
    datos.password=bcrypt.hashSync(password,salt);    
    }

    const usuario=await Usuario.findByIdAndUpdate(id,datos,{new:true})


    res.json({
        msg: 'usuario actualizado',
        usuario,
    })
}

const usuarioDelete= async(req, res)=> {
    const {id} = req.params

    // inactivar al usuario
    const query={estado:false}
    const usuarioBorrado= await Usuario.findByIdAndUpdate(id,query,{new:true})

    // borrar fisicamente un registro
    // const usuarioBorrado=await Usuario.findByIdAndDelete(id)

    res.json({
        msg: 'Usuario borrado de la BD',
        usuarioBorrado,
        
    })
}


module.exports={
    usuariosGet,usuarioPost,usuarioPut,usuarioDelete
}