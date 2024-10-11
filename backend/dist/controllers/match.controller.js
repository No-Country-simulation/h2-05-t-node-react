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
exports.updateMatch = exports.deleteMatch = exports.createMatch = exports.getOneMatch = exports.getAllMatches = void 0;
const enumsErrors_1 = require("../utils/enumsErrors");
const match_service_1 = require("../services/match.service");
const HttpResponse = new enumsErrors_1.httpResponse();
const getAllMatches = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const match = yield (0, match_service_1.getMatches)();
        if (!match) {
            return HttpResponse.DATA_BASE_ERROR(res, "Partidos no encontradas");
        }
        return HttpResponse.OK(res, match);
    }
    catch (error) {
        return HttpResponse.Error(res, error.message);
    }
});
exports.getAllMatches = getAllMatches;
const getOneMatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const match = yield (0, match_service_1.getMatchById)(id);
        if (!match) {
            return HttpResponse.DATA_BASE_ERROR(res, "Partido no encontrada");
        }
        return HttpResponse.OK(res, match);
    }
    catch (error) {
        return HttpResponse.Error(res, error.message);
    }
});
exports.getOneMatch = getOneMatch;
const createMatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const match = yield (0, match_service_1.CreateOneMatch)(data);
        if (!match) {
            return HttpResponse.DATA_BASE_ERROR(res, "Partido no creado");
        }
        return HttpResponse.OK(res, match);
    }
    catch (error) {
        return HttpResponse.Error(res, error.message);
    }
});
exports.createMatch = createMatch;
const deleteMatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const match = yield (0, match_service_1.deleteOneMatch)(id);
        if (!match) {
            return HttpResponse.DATA_BASE_ERROR(res, "Partido no eliminado");
        }
        return HttpResponse.OK(res, match);
    }
    catch (error) {
        return HttpResponse.Error(res, error.message);
    }
});
exports.deleteMatch = deleteMatch;
const updateMatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = req.body;
        const match = yield (0, match_service_1.updateOneMatch)(id, data);
        if (!match) {
            return HttpResponse.DATA_BASE_ERROR(res, "Partido no actualizado");
        }
        return HttpResponse.OK(res, match);
    }
    catch (error) {
        return HttpResponse.Error(res, error.message);
    }
});
exports.updateMatch = updateMatch;
//# sourceMappingURL=match.controller.js.map