"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRankingByDivision = exports.postAsignDivision = exports.getRankingByUserId = void 0;
const ranking_model_1 = require("../models/ranking.model");
const user_model_1 = require("../models/user.model");
const user_service_1 = require("../services/user.service");
const getRankingByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const ranking = yield ranking_model_1.Ranking.findOne({
            where: { user_id: userId },
            attributes: ["division"],
        });
        if (!ranking) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.json({ division: ranking.division });
    }
    catch (error) {
        res.status(500).json({ message: "Error en el servidor", error });
    }
});
exports.getRankingByUserId = getRankingByUserId;
const postAsignDivision = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ranking = yield (0, user_service_1.populateRankingForExistingUsers)();
        res.status(200).json({ ranking });
    }
    catch (error) {
        res.status(500).json({ message: "Error en el servidor", error });
    }
});
exports.postAsignDivision = postAsignDivision;
const getRankingByDivision = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const division = parseInt(req.params.division, 10);
        if (![1, 2, 3, 4].includes(division)) {
            return res.status(400).json({ message: "División no válida" });
        }
        const rankings = yield ranking_model_1.Ranking.findAll({
            where: { division },
            include: [user_model_1.User], // para incluir la información del usuario
            order: [["points", "DESC"]],
        });
        res.json(rankings);
    }
    catch (error) {
        res.status(500).json({ message: "Error en el servidor", error });
    }
});
exports.getRankingByDivision = getRankingByDivision;
//# sourceMappingURL=ranking.controller.js.map