"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ranking_controller_1 = require("../controllers/ranking.controller");
const user_service_1 = require("../services/user.service");
const router = (0, express_1.Router)();
router.get('/:id/division', ranking_controller_1.getRankingByUserId);
router.get('/division/:division', ranking_controller_1.getRankingByDivision);
router.post('/assignDivision', user_service_1.populateRankingForExistingUsers);
exports.default = router;
//# sourceMappingURL=ranking.routes.js.map