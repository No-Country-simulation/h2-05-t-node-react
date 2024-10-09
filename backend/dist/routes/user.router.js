"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const user_validator_1 = require("../middlewares/user.validator");
const auth_middeware_1 = require("../middlewares/auth.middeware");
const router = (0, express_1.Router)();
router.get('/', user_controller_1.getAllUsers);
router.get('/:id', user_controller_1.getOneUser);
router.post('/createUser', user_validator_1.userValidator, user_controller_1.createOneUser);
router.post('/login', user_controller_1.login);
router.delete('/:id', auth_middeware_1.authenticateToken, user_controller_1.deleteOneUser);
router.put('/:id', auth_middeware_1.authenticateToken, user_controller_1.updateOneUser);
exports.default = router;
//# sourceMappingURL=user.router.js.map