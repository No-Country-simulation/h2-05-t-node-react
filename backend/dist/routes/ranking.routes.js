"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ranking_controller_1 = require("../controllers/ranking.controller");
const router = (0, express_1.Router)();
router.get('/user/:id/division', ranking_controller_1.getRankingByUserId);
router.get('/ranking/division/:division', ranking_controller_1.getRankingByDivision);
exports.default = router;
//# sourceMappingURL=ranking.routes.js.map