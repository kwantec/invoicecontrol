/**
 * Created by Andre on 13/11/2016.
 */
'use strict';

var resourceType = require('../controllers/resource.type.server.controller');

module.exports = function (app) {
    app.route('/api/resourceTypes')
        .get(resourceType.list)
        .post(resourceType.create);

    app.route('/api/resourceTypes/:resourceTypeId')
        .get(resourceType.read)
        .put(resourceType.update)
        .delete(resourceType.delete);
};
