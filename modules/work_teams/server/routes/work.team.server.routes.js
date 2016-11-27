/**
 * Created by Andre on 13/11/2016.
 */
'use strict';

var workTeam = require('../controllers/work.team.server.controller');

module.exports = function (app) {
    app.route('/api/workTeams')
        .get(workTeam.list)
        .post(workTeam.create);

    app.route('/api/workTeams/:workTeamId')
        .get(workTeam.read)
        .put(workTeam.update)
        .delete(workTeam.delete);
};
