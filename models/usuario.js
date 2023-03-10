const {Schema, model}=require('mongoose')

const UsuarioSchema=Schema({
    nombre:{
        type:String,
        required:[true,"El nombre es obligatorio"]
    },
    email:{
        type:String,
        required:[true,"El correo es obligatorio"],
        unique:true 
    },
    password:{
        type:String,
        required:[true,"La contraseña es obligatoria"]
    },
    role:{
        type:String,
        // enum:["ADMIN_ROLE","USER_ROLE"]
    },
    img:{
        type:String,
    },
    estado:{
        type:Boolean,
        default:true,
    },
})

// QUITAR DATOS DE LA RESPUESTA JSON
UsuarioSchema.methods.toJSON=function () {
    const {__v,password,...resto}=this.toObject()
    return resto
}


module.exports=model("Usuario",UsuarioSchema);