/**
 * Created by jindong on 2017/7/31.
 */

import * as express from "express";
import * as path from 'path';
import {Server} from "ws";

const app = express();

app.use('/', express.static(path.join(__dirname, '..', 'client')));

app.get('/api/stock', (req, res) => {
    let result = stocks;
    let params = req.query;
    if (params.name){
        result = result.filter(stock => stock.name.indexOf(params.name) !== -1)
    }

    res.json(result);
});

app.get('/api/stock/:id', (req, res) => {
    res.json(stocks.find(stock => stock.id == req.params.id))
});

const server = app.listen(8000, 'localhost', () => {
    console.log('server been deployed');
});

const subscriptions = new Set<any>();


var messageCount = 0;

const wsServer = new Server({port: 8085});
wsServer.on('connection', websocket => {
    subscriptions.add(websocket);
});

setInterval(() => {
    subscriptions.forEach(ws =>{
        if (ws.readyState === 1){
            ws.send(JSON.stringify({messageCount: this.messageCount++}));
        }else {
            subscriptions.delete(ws);
        }
    })
}, 2000);

export class Stock {
    constructor(public id: number,
                public name: string,
                public price: number,
                public rating: number,
                public desc: string,
                public categories: Array<string>) {
    }
}

const stocks: Stock[] = [
    new Stock(1, 'the first stock', 1.99, 3.5, 'this is the first stock', ['IT', 'ANGU']),
    new Stock(2, 'the second stock', 2.99, 2.5, 'this is the second stock', ['IT', 'BAT']),
    new Stock(3, 'the third stock', 3.99, 1.5, 'this is the third stock', ['IT', 'FIN']),
    new Stock(4, 'the forth stock', 4.99, 4.5, 'this is the forth stock', ['IT', 'INTERNET']),
    new Stock(5, 'the fifth stock', 3.99, 3.5, 'this is the fifth stock', ['IT', 'ECON'])
];
