import express from 'express';
import { Request, Response } from 'express';
import bodyParser from "body-parser";
import {HttpKeepAlive} from "./HttpKeepAlive";
const {measurePerformance, simpleEffort} = require("./util");


export class Http {
    private readonly port: number
    private app = express();

    constructor(port: number) {
        this.port = port;
        this.app.use(bodyParser.json());
        this.app.use(require('express-status-monitor')());
        this.app.post('/', this.handleRequest)
    }

    public handleRequest = async (req: Request, res: Response) => {
        simpleEffort(req.body)
        res.send(req.body)
    };

    public listen(){
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }
}


const http: Http = new Http(5000)
http.listen()

