"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FuturePredictions = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const user_model_1 = require("./user.model");
const sequelize_1 = require("sequelize");
let FuturePredictions = class FuturePredictions extends sequelize_typescript_1.Model {
};
exports.FuturePredictions = FuturePredictions;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        defaultValue: sequelize_1.UUIDV4,
        primaryKey: true,
    }),
    __metadata("design:type", String)
], FuturePredictions.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_model_1.User),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: false,
    }),
    __metadata("design:type", String)
], FuturePredictions.prototype, "user_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATEONLY, // La fecha futura de la que se tomaron las predicciones
        allowNull: false,
    }),
    __metadata("design:type", String)
], FuturePredictions.prototype, "future_date", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        defaultValue: 0, // Cantidad de predicciones tomadas de esa fecha futura
    }),
    __metadata("design:type", Number)
], FuturePredictions.prototype, "predictions_taken", void 0);
exports.FuturePredictions = FuturePredictions = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "future_predictions",
        timestamps: true,
    })
], FuturePredictions);
//# sourceMappingURL=FuturePredictions.model.js.map