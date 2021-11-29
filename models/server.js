const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: "/api/auth",
            habits: "/api/habits",
            plans: "/api/plans",
            search: "/api/search",
            users: "/api/users",
        };

        //conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        //Rutas de la aplicacion
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        //CORS
        this.app.use(cors());

        //lectura y parseo del body
        this.app.use(express.json());

        //Directorio público
        this.app.use(express.static("public"));
    }

    routes() {
        this.app.use(this.paths.auth, require("../routes/auth"));
        this.app.use(this.paths.habits, require("../routes/habits"));
        this.app.use(this.paths.plans, require("../routes/plans"));
        this.app.use(this.paths.search, require("../routes/search"));
        this.app.use(this.paths.users, require("../routes/users"));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en el puerto", this.port);
        });
    }
}

module.exports = Server;
