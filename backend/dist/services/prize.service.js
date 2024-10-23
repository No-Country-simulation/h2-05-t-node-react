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
exports.updatePrize = exports.deletePrize = exports.createPrize = exports.getPrizeById = exports.getPrize = void 0;
const prize_model_1 = require("../models/prize.model");
const getPrize = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prize = yield prize_model_1.Prize.findAll();
        if (!prize) {
            throw new Error("Premios no encontrados");
        }
        return prize;
    }
    catch (error) {
        throw new Error(`Error al obtener los premios: ${error.message}`);
    }
});
exports.getPrize = getPrize;
const getPrizeById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prize = yield prize_model_1.Prize.findOne({ where: { id: id } });
        if (!prize) {
            throw new Error("Premio no encontrado");
        }
        return prize;
    }
    catch (error) {
        throw new Error(`Error al obtener el premio: ${error.message}`);
    }
});
exports.getPrizeById = getPrizeById;
const createPrize = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prize = yield prize_model_1.Prize.create(data);
        if (!prize) {
            throw new Error("Error al crear el premio");
        }
        return { data: prize, msg: "Premio creado" };
    }
    catch (error) {
        throw new Error(`Error al crear el premio: ${error.message}`);
    }
});
exports.createPrize = createPrize;
const deletePrize = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prize = yield prize_model_1.Prize.destroy({ where: { id: id } });
        if (!prize) {
            throw new Error("Error al eliminar el premio");
        }
        return { msg: "Premio eliminado" };
    }
    catch (error) {
        throw new Error(`Error al eliminar el premio: ${error.message}`);
    }
});
exports.deletePrize = deletePrize;
const updatePrize = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prize = yield prize_model_1.Prize.update(data, { where: { id: id } });
        if (!prize) {
            throw new Error("Error al actualizar el premio");
        }
        return { data: prize, msg: "Premio actualizado" };
    }
    catch (error) {
        throw new Error(`Error al actualizar el premio: ${error.message}`);
    }
});
exports.updatePrize = updatePrize;
//# sourceMappingURL=prize.service.js.map