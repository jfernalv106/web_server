import express, { Application } from 'express';
import http from 'http';



export default class Server {
    private static _intance: Server;
    public app: Application;
    public port: string;


    private httpServer: http.Server;



    private constructor() {
        this.app = express();

        this.port = process.env.PORT || '80';
        this.httpServer = http.createServer(this.app);
      
        this.middlewares();
        this.routes();
       
    }
    public static get instance() {
        return this._intance || (this._intance = new this());
    }


    middlewares() {
        // Lectura del body
        this.app.use(express.json());
        // Carpeta pública
        this.app.use(express.static('public'));
    }

    routes() {

        this.app.get('*', (req, res) => {
            res.sendFile('index.html', {root: 'public'});
          });
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo puerto: ' + this.port);
        });
    }

    start(callback: VoidFunction) {

        this.httpServer.listen(this.port, callback);

    }
}