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
exports.updateOneMatch = exports.deleteOneMatch = exports.CreateMatches = exports.CreateOneMatch = exports.getMatchById = exports.getMatches = void 0;
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
        return match;
    }
    catch (error) {
        throw new Error(`Error al crear el partido: ${error.message}`);
    }
});
exports.CreateOneMatch = CreateOneMatch;
const CreateMatches = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Recorremos para crear todos los partidos si no existen
        const createdMatches = yield Promise.all(data.map((matchData) => __awaiter(void 0, void 0, void 0, function* () {
            // Verificamos si el partido ya existe por match.id_apiMatch
            const existingMatch = yield match_model_1.Match.findOne({
                where: { id_apiMatch: matchData.id_apiMatch },
            });
            if (existingMatch) {
                console.log(`El partido con ID ${matchData.id} ya existe, omitiendo creación.`);
                return existingMatch; // Retornamos el partido existente para omitir su creación
            }
            // Si el partido no existe, lo creamos
            const match = yield match_model_1.Match.create(matchData);
            if (!match) {
                throw new Error(`Error al cargar el partido: ${JSON.stringify(matchData)}`);
            }
            return match;
        })));
        return createdMatches;
    }
    catch (error) {
        throw new Error(`Error al crear el partido: ${error.message}`);
    }
});
exports.CreateMatches = CreateMatches;
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