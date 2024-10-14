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
exports.updateOneMatch = exports.deleteOneMatch = exports.CreateOneMatch = exports.getMatchById = exports.getMatches = void 0;
const match_model_1 = require("../models/match.model");
const getMatches = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const match = yield match_model_1.Match.findAll();
        if (!match)
            throw new Error("Partidos no encontrados");
        return match;
    }
    catch (error) {
        throw new Error(`Error al obtener los partidos: ${error.message}`);
    }
});
exports.getMatches = getMatches;
const getMatchById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const match = yield match_model_1.Match.findOne(id);
        if (!match)
            throw new Error("Partido no encontrado");
        return match;
    }
    catch (error) {
        throw new Error(`Error al obtener el partido: ${error.message}`);
    }
});
exports.getMatchById = getMatchById;
const CreateOneMatch = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const match = yield match_model_1.Match.create(data);
        if (!match)
            throw new Error("Partido no creado");
        return { msg: "Partido creado" };
    }
    catch (error) {
        throw new Error(`Error al crear el partido: ${error.message}`);
    }
});
exports.CreateOneMatch = CreateOneMatch;
const deleteOneMatch = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const match = yield match_model_1.Match.destroy({ where: { id: id } });
        if (!match)
            throw new Error("Partido no eliminado");
        return { msg: "Partido eliminado" };
    }
    catch (error) {
        throw new Error(`Error al eliminar el partido: ${error.message}`);
    }
});
exports.deleteOneMatch = deleteOneMatch;
const updateOneMatch = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const match = yield match_model_1.Match.update(data, { where: { id: id } });
        if (!match)
            throw new Error("Partido no actualizado");
        return { msg: "Partido actualizado" };
    }
    catch (error) {
        throw new Error(`Error al actualizar el partido: ${error.message}`);
    }
});
exports.updateOneMatch = updateOneMatch;
//# sourceMappingURL=match.service.js.map