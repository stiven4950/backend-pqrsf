const express = require('express');
const cors = require('cors');
// const fileUpload = require('express-fileupload');

const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            user: '/api/user',
            admin: '/api/admin',
            city: '/api/city',
            matter: '/api/matter',
            filling: '/api/filling',
        }

        // Connect database
        this.connectDB();

        // Middlewares
        this.middlewares();

        // Routes of application
        this.routes();
    }

    async connectDB() {
        await dbConnection();
    }


    middlewares() {

        // CORS
        this.app.use(cors({
            origin: '*',
        }));

        // read and conversion of body
        this.app.use(express.json());

        // public directory
        this.app.use(express.static('public'));

        // Fileupload - Carga de archivos
        /* this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        })); */
        
    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.user, require('../routes/user'));
        this.app.use(this.paths.admin, require('../routes/admin'));
        this.app.use(this.paths.city, require('../routes/city'));
        this.app.use(this.paths.matter, require('../routes/matter'));
        this.app.use(this.paths.filling, require('../routes/filling'));
        // this.app.use(this.paths.uploads, require('../routes/uploads'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server is runing on port', this.port);
        });
    }

}

module.exports = Server;