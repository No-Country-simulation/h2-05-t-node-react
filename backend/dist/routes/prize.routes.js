"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prize_controller_1 = require("../controllers/prize.controller");
const router = (0, express_1.Router)();
router.get('', prize_controller_1.getAllPrize);
router.get('/:id', prize_controller_1.getOnePrize);
router.post('/createPrize', prize_controller_1.createOnePrize);
router.delete('/:id', prize_controller_1.deleteOnePrize);
router.put('/:id', prize_controller_1.updateOnePrize);
exports.default = router;
//# sourceMappingURL=prize.routes.js.map