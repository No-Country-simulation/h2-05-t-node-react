"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const match_controller_1 = require("../controllers/match.controller");
const router = (0, express_1.Router)();
router.get('', match_controller_1.getAllMatches);
router.get('/:id', match_controller_1.getOneMatch);
router.post('/createMatch', match_controller_1.createMatch);
router.delete('/:id', match_controller_1.deleteMatch);
router.put('/:id', match_controller_1.updateMatch);
exports.default = router;
//# sourceMappingURL=match.routes.js.map