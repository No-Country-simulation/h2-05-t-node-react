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
exports.getPredictionQuotaByDate = void 0;
const predictionQuota_service_1 = require("../services/predictionQuota.service");
const enumsErrors_1 = require("../utils/enumsErrors");
const HttpResponse = new enumsErrors_1.httpResponse();
const getPredictionQuotaByDate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const predictionQuota = yield (0, predictionQuota_service_1.getPredictionQuota)(data.user, data.date);
        if (!predictionQuota) {
            return HttpResponse.DATA_BASE_ERROR(res, "Error al obtener cuotas");
        }
        return HttpResponse.OK(res, predictionQuota);
    }
    catch (error) {
        return HttpResponse.Error(res, error.message);
    }
});
exports.getPredictionQuotaByDate = getPredictionQuotaByDate;
//# sourceMappingURL=predictionQuota.controller.js.map