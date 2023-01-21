const express = require('express')
const {dbConnection} = require('../database/config') 

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT
        this.usuariosPath = '/api/usuarios'

        // // conexion DB 
        this.conectarDB()


        //middlewares
        this.middlewares()

        // rutas
        this.routes()
    }

    async conectarDB(){
        await dbConnection()
    }

    middlewares() {
        //lectura de body
        this.app.use(express.json())
        // carpeta publica 
        this.app.use(express.static("public"))
    }

    routes() {
        this.app.use(this.usuariosPath, require("../routes/usuarios"))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("server online port:", this.port);


        })
    }
}

module.exports = Server