import express from 'express';
import { Request, Response } from 'express';
import bodyParser from "body-parser";
const {simpleEffort} = require("./util");

export class HttpKeepAlive {
    private readonly port: number
    private app = express();

    constructor(port: number) {
        this.port = port;
        this.app.set('keepAliveTimeout', 60000);
        this.app.use(require('express-status-monitor')());
        this.app.use(bodyParser.json());
        this.app.post('/', this.getEmployeeType)
    }

    public getEmployeeType = async (req: Request, res: Response) => {
        simpleEffort(req.body)
        res.send(req.body)
    };

    public listen(){
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }
}

const httpKeepAlive: HttpKeepAlive = new HttpKeepAlive(5001)
httpKeepAlive.listen()
