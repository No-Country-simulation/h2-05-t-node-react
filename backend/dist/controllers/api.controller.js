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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOnePlayerApi = exports.getPlayerApi = exports.getTeamApi = exports.getLeagueApi = exports.getCountriesApi = exports.getRecord = exports.getMatchApi = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const api_service_1 = require("../services/api.service");
const enumsErrors_1 = require("../utils/enumsErrors");
const HttpResponse = new enumsErrors_1.httpResponse();
dotenv_1.default.config();
const getMatchApi = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { from, to, league } = req.query;
        const result = yield (0, api_service_1.getMatch)(from, to, league);
        if (!result) {
            return HttpResponse.INVALID_TYPE_ERROR(res, `Error fetching data: ${result.statusText}`);
        }
        return HttpResponse.OK(res, result);
    }
    catch (error) {
        return HttpResponse.Error(res, error.message);
    }
});
exports.getMatchApi = getMatchApi;
const getRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { to, league, team_a, team_b } = req.query;
        const result = yield (0, api_service_1.getRecords)(to, league, team_a, team_b);
        if (!result) {
            return HttpResponse.INVALID_TYPE_ERROR(res, `Error fetching data: ${result.statusText}`);
        }
        return HttpResponse.OK(res, result);
    }
    catch (error) {
        return HttpResponse.Error(res, error.message);
    }
});
exports.getRecord = getRecord;
const getCountriesApi = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, api_service_1.getCountries)();
        if (!result) {
            return HttpResponse.INVALID_TYPE_ERROR(res, `Error fetching data: ${result.statusText}`);
        }
        return HttpResponse.OK(res, result);
    }
    catch (error) {
        return HttpResponse.Error(res, error.message);
    }
});
exports.getCountriesApi = getCountriesApi;
const getLeagueApi = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.query;
        const result = yield (0, api_service_1.getLeague)(id);
        if (!result) {
            return HttpResponse.INVALID_TYPE_ERROR(res, `Error fetching data: ${result.statusText}`);
        }
        return HttpResponse.OK(res, result);
    }
    catch (error) {
        return HttpResponse.Error(res, error.message);
    }
});
exports.getLeagueApi = getLeagueApi;
const getTeamApi = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.query;
        const result = yield (0, api_service_1.getTeam)(id);
        if (!result) {
            return HttpResponse.INVALID_TYPE_ERROR(res, `Error fetching data: ${result.statusText}`);
        }
        return HttpResponse.OK(res, result);
    }
    catch (error) {
        return HttpResponse.Error(res, error.message);
    }
});
exports.getTeamApi = getTeamApi;
const getPlayerApi = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, tid } = req.query;
        const result = yield (0, api_service_1.getPlayer)(id, tid);
        if (!result) {
            return HttpResponse.INVALID_TYPE_ERROR(res, `Error fetching data: ${result.statusText}`);
        }
        return HttpResponse.OK(res, result);
    }
    catch (error) {
        return HttpResponse.Error(res, error.message);
    }
});
exports.getPlayerApi = getPlayerApi;
const getOnePlayerApi = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.query;
        const result = yield (0, api_service_1.getPOnePlayer)(name);
        if (!result) {
            return HttpResponse.INVALID_TYPE_ERROR(res, `Error fetching data: ${result.statusText}`);
        }
        return HttpResponse.OK(res, result);
    }
    catch (error) {
        return HttpResponse.Error(res, error.message);
    }
});
exports.getOnePlayerApi = getOnePlayerApi;
//# sourceMappingURL=api.controller.js.map