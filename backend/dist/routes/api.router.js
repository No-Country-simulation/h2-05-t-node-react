"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const api_controller_1 = require("../controllers/api.controller");
const router = (0, express_1.Router)();
router.get('/api_match', api_controller_1.getMatchApi);
router.get('/api_record', api_controller_1.getRecord);
router.get('/api_country', api_controller_1.getCountriesApi);
router.get('/api_league', api_controller_1.getLeagueApi);
router.get('/api_team', api_controller_1.getTeamApi);
router.get('/api_players', api_controller_1.getPlayerApi);
exports.default = router;
//# sourceMappingURL=api.router.js.map