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
exports.PredictionRecord = void 0;
const sequelize_1 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const prediction_model_1 = require("./prediction.model");
let PredictionRecord = class PredictionRecord extends sequelize_typescript_1.Model {
};
exports.PredictionRecord = PredictionRecord;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        defaultValue: sequelize_1.UUIDV4,
        primaryKey: true,
    }),
    __metadata("design:type", String)
], PredictionRecord.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => prediction_model_1.Prediction),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: false,
        onDelete: "CASCADE",
    }),
    __metadata("design:type", String)
], PredictionRecord.prototype, "prediction_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false,
    }),
    __metadata("design:type", Date)
], PredictionRecord.prototype, "timestamp", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => prediction_model_1.Prediction),
    __metadata("design:type", prediction_model_1.Prediction)
], PredictionRecord.prototype, "prediction", void 0);
exports.PredictionRecord = PredictionRecord = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "predictionRecord",
        timestamps: true,
    })
], PredictionRecord);
//# sourceMappingURL=predictionRecord.model.js.map