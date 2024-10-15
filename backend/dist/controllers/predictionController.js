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
exports.createFuturePrediction = void 0;
const enumsErrors_1 = require("../utils/enumsErrors"); // Asegúrate de que esta clase esté correctamente importada
const futurePrediction_1 = require("../utils/futurePrediction");
const HttpResponse = new enumsErrors_1.httpResponse();
// Endpoint para usar una predicción futura con un día pasado desde el front-end
const createFuturePrediction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.body.user_id;
        const futureDate = req.body.future_date; // El día futuro pasado desde el front-end
        yield (0, futurePrediction_1.handleFuturePrediction)(userId, futureDate, res);
    }
    catch (error) {
        return HttpResponse.Error(res, error.message);
    }
});
exports.createFuturePrediction = createFuturePrediction;
//# sourceMappingURL=predictionController.js.map