/**
 * Created by Andre on 13/11/2016.
 */
'use strict';

var clients = require('../controllers/client.server.controller');

module.exports = function (app) {
    app.route('/api/clients')
        .get(clients.list)
        .post(clients.create);

    app.route('/api/clients/:clientId')
        .get(clients.read)
        .put(clients.update)
        .delete(clients.delete);
};