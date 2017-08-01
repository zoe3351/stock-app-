"use strict";
/**
 * Created by jindong on 2017/7/31.
 */
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
var ws_1 = require("ws");
var app = express();
app.use('/', express.static(path.join(__dirname, '..', 'client')));
app.get('/api/stock', function (req, res) {
    var result = stocks;
    var params = req.query;
    if (params.name) {
        result = result.filter(function (stock) { return stock.name.indexOf(params.name) !== -1; });
    }
    res.json(result);
});
app.get('/api/stock/:id', function (req, res) {
    res.json(stocks.find(function (stock) { return stock.id == req.params.id; }));
});
var server = app.listen(8000, 'localhost', function () {
    console.log('server been deployed');
});
var subscriptions = new Set();
var messageCount = 0;
var wsServer = new ws_1.Server({ port: 8085 });
wsServer.on('connection', function (websocket) {
    subscriptions.add(websocket);
});
setInterval(function () {
    subscriptions.forEach(function (ws) {
        if (ws.readyState === 1) {
            ws.send(JSON.stringify({ messageCount: _this.messageCount++ }));
        }
        else {
            subscriptions.delete(ws);
        }
    });
}, 2000);
var Stock = (function () {
    function Stock(id, name, price, rating, desc, categories) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.rating = rating;
        this.desc = desc;
        this.categories = categories;
    }
    return Stock;
}());
exports.Stock = Stock;
var stocks = [
    new Stock(1, 'the first stock', 1.99, 3.5, 'this is the first stock', ['IT', 'ANGU']),
    new Stock(2, 'the second stock', 2.99, 2.5, 'this is the second stock', ['IT', 'BAT']),
    new Stock(3, 'the third stock', 3.99, 1.5, 'this is the third stock', ['IT', 'FIN']),
    new Stock(4, 'the forth stock', 4.99, 4.5, 'this is the forth stock', ['IT', 'INTERNET']),
    new Stock(5, 'the fifth stock', 3.99, 3.5, 'this is the fifth stock', ['IT', 'ECON'])
];
//# sourceMappingURL=stock_server.js.map