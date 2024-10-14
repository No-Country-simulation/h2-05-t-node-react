"use strict";
/*
  id_apuesta_detalle REFERENCES !!!!
  tipo varchar [note:"Simple o Encadenada"]
  puntos_apostados int
  couta_total float [note:"total de la cuota, si es encadenada se multiplica x10"] !!!!
  fecha_prediccion datetime
  estado bool
  puntos_ganados int */
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
exports.Prediction = void 0;
const sequelize_1 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const user_model_1 = require("./user.model");
const prediction_info_model_1 = require("./prediction_info.model");
const predictionRecord_model_1 = require("./predictionRecord.model");
let Prediction = class Prediction extends sequelize_typescript_1.Model {
};
exports.Prediction = Prediction;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        primaryKey: true,
        defaultValue: sequelize_1.UUIDV4,
    }),
    __metadata("design:type", String)
], Prediction.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_model_1.User),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: false,
        onDelete: "CASCADE",
    }),
    __metadata("design:type", String)
], Prediction.prototype, "user_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM("simple", "chained"),
        allowNull: false,
    }),
    __metadata("design:type", String)
], Prediction.prototype, "type", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true,
        defaultValue: 1,
    }),
    __metadata("design:type", Number)
], Prediction.prototype, "bet_points", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false,
        defaultValue: sequelize_typescript_1.DataType.NOW,
    }),
    __metadata("design:type", Date)
], Prediction.prototype, "date", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Prediction.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true,
        defaultValue: 0,
    }),
    __metadata("design:type", Number)
], Prediction.prototype, "total_points", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_model_1.User),
    __metadata("design:type", user_model_1.User)
], Prediction.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => prediction_info_model_1.PredictionInfo),
    __metadata("design:type", Array)
], Prediction.prototype, "predictionInfos", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => predictionRecord_model_1.PredictionRecord),
    __metadata("design:type", Array)
], Prediction.prototype, "records", void 0);
exports.Prediction = Prediction = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "bets",
        timestamps: true,
    })
], Prediction);
//# sourceMappingURL=prediction.model.js.map