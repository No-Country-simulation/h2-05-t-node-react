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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignDivisions = assignDivisions;
exports.addPoints = addPoints;
const ranking_model_1 = require("../models/ranking.model");
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
//Asigna las divisiones de todos los usuarios con puntos
function assignDivisions() {
    return __awaiter(this, void 0, void 0, function* () {
        const usersWithPoints = yield ranking_model_1.Ranking.findAll({
            where: {
                points: { [sequelize_1.Op.gt]: 0 },
            },
            order: [['points', 'DESC']],
        });
        const totalUsers = usersWithPoints.length;
        const divisionSize = Math.floor(totalUsers / 3);
        usersWithPoints.forEach((ranking, index) => {
            let division;
            if (index < divisionSize) {
                division = 1;
            }
            else if (index < 2 * divisionSize) {
                division = 2;
            }
            else {
                division = 3;
            }
            ranking.update({ division });
        });
        // Actualizar usuarios sin puntos
        yield ranking_model_1.Ranking.update({ division: 4 }, // "No clasificado"
        { where: { points: 0 } });
    });
}
// Función para añadir puntos a un usuario
function addPoints(userId, points) {
    return __awaiter(this, void 0, void 0, function* () {
        const transaction = yield database_1.default.transaction();
        try {
            const ranking = yield ranking_model_1.Ranking.findOne({ where: { user_id: userId }, transaction });
            if (ranking) {
                ranking.points += points;
                yield ranking.save({ transaction });
                // Recalcular divisiones
                yield assignDivisions();
            }
            yield transaction.commit();
        }
        catch (error) {
            yield transaction.rollback();
            throw error;
        }
    });
}
//# sourceMappingURL=ranking.service.js.map