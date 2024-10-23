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
exports.updateOnePrize = exports.deleteOnePrize = exports.createOnePrize = exports.getOnePrize = exports.getAllPrize = void 0;
const prize_service_1 = require("../services/prize.service");
const enumsErrors_1 = require("../utils/enumsErrors");
const HttpResponse = new enumsErrors_1.httpResponse();
const getAllPrize = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prize = yield (0, prize_service_1.getPrize)();
        if (!prize) {
            HttpResponse.DATA_BASE_ERROR(res, "Premios no encontrados");
        }
        return HttpResponse.OK(res, prize);
    }
    catch (error) {
        return HttpResponse.Error(res, error.message);
    }
});
exports.getAllPrize = getAllPrize;
const getOnePrize = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const prize = yield (0, prize_service_1.getPrizeById)(id);
        if (!prize) {
            HttpResponse.DATA_BASE_ERROR(res, "Premio no encontrado");
        }
        return HttpResponse.OK(res, prize);
    }
    catch (error) {
        return HttpResponse.Error(res, error.message);
    }
});
exports.getOnePrize = getOnePrize;
const createOnePrize = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const prize = yield (0, prize_service_1.createPrize)(data);
        if (!prize) {
            HttpResponse.DATA_BASE_ERROR(res, "Premio no creado");
        }
        return HttpResponse.OK(res, prize);
    }
    catch (error) {
        return HttpResponse.Error(res, error.message);
    }
});
exports.createOnePrize = createOnePrize;
const deleteOnePrize = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const prize = yield (0, prize_service_1.deletePrize)(id);
        if (!prize) {
            HttpResponse.DATA_BASE_ERROR(res, "Premio no eliminado");
        }
        return HttpResponse.OK(res, prize);
    }
    catch (error) {
        return HttpResponse.Error(res, error.message);
    }
});
exports.deleteOnePrize = deleteOnePrize;
const updateOnePrize = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = req.body;
        const prize = yield (0, prize_service_1.updatePrize)(id, data);
        if (!prize) {
            HttpResponse.DATA_BASE_ERROR(res, "Premio no actualizado");
        }
        return HttpResponse.OK(res, prize);
    }
    catch (error) {
        return HttpResponse.Error(res, error.message);
    }
});
exports.updateOnePrize = updateOnePrize;
//# sourceMappingURL=prize.controller.js.map