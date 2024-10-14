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
exports.getPOnePlayer = exports.getPlayer = exports.getTeam = exports.getLeague = exports.getCountries = exports.getRecords = exports.getMatch = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const getMatch = (from, to, league) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const baseUrl = process.env.API_URL;
        const url = `${baseUrl}get_predictions&from=${from}&to=${to}&APIkey=${process.env.API_KEY_APIFOOTBALL || ""}&league_id=${league}`;
        const response = yield fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response)
            throw new Error("Error al obtener datos");
        const result = yield response.json();
        const filteredResults = result.map((item) => ({
            match_id: item.match_id,
            match_date: item.match_date,
            hometeam_id: item.match_hometeam_id,
            homeTeam: item.match_hometeam_name,
            awayteam_id: item.match_awayteam_id,
            awayTeam: item.match_awayteam_name,
            hometeam_score: item.match_hometeam_score,
            awayteam_score: item.match_awayteam_score,
            home_prob: item.prob_HW,
            draw_prob: item.prob_D,
            away_prob: item.prob_AW,
        }));
        return filteredResults;
    }
    catch (error) {
        throw new Error(`Error al obtener el usuario: ${error.message}`);
    }
});
exports.getMatch = getMatch;
const getRecords = (to, league, team_a, team_b) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const baseUrl = process.env.API_URL;
        const url = `${baseUrl}get_predictions&from=2022-05-10&to=${to}&APIkey=${process.env.API_KEY_APIFOOTBALL || ""}&league_id=${league}`;
        const response = yield fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response)
            throw new Error("Error al obtener datos");
        const result = yield response.json();
        const record = result.filter((item) => {
            return ((item.match_hometeam_name === team_a &&
                item.match_awayteam_name === team_b) ||
                (item.match_hometeam_name === team_b &&
                    item.match_awayteam_name === team_a));
        });
        const filteredResults = record.map((item) => ({
            match_id: item.match_id,
            match_date: item.match_date,
            hometeam_id: item.match_hometeam_id,
            homeTeam: item.match_hometeam_name,
            awayteam_id: item.match_awayteam_id,
            awayTeam: item.match_awayteam_name,
            hometeam_score: item.match_hometeam_score,
            awayteam_score: item.match_awayteam_score,
            home_prob: item.prob_HW,
            draw_prob: item.prob_D,
            away_prob: item.prob_AW,
        }));
        return filteredResults;
    }
    catch (error) {
        throw new Error(`Error al obtener el usuario: ${error.message}`);
    }
});
exports.getRecords = getRecords;
const getCountries = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const baseUrl = process.env.API_URL;
        const url = `${baseUrl}get_countries&APIkey=${process.env.API_KEY_APIFOOTBALL}`;
        const response = yield fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const result = yield response.json();
        return result;
    }
    catch (error) {
        throw new Error(`Error al obtener el usuario: ${error.message}`);
    }
});
exports.getCountries = getCountries;
const getLeague = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const baseUrl = process.env.API_URL;
        const url = `${baseUrl}get_leagues&country_id=${id}&APIkey=${process.env.API_KEY_APIFOOTBALL}`;
        const response = yield fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const result = yield response.json();
        return result;
    }
    catch (error) {
        throw new Error(`Error al obtener el usuario: ${error.message}`);
    }
});
exports.getLeague = getLeague;
const getTeam = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const baseUrl = process.env.API_URL;
        const url = `${baseUrl}get_teams&league_id=${id}&APIkey=${process.env.API_KEY_APIFOOTBALL}`;
        const response = yield fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const result = yield response.json();
        const filteredResults = result.map((item) => ({
            team_id: item.team_key,
            team_name: item.team_name,
            team_country: item.team_country,
            team_logo: item.team_badge
        }));
        return filteredResults;
    }
    catch (error) {
        throw new Error(`Error al obtener el usuario: ${error.message}`);
    }
});
exports.getTeam = getTeam;
const getPlayer = (id, tid) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const baseUrl = process.env.API_URL;
        const url = `${baseUrl}get_teams&league_id=${id}&team_id=${tid}&APIkey=${process.env.API_KEY_APIFOOTBALL}`;
        const response = yield fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const result = yield response.json();
        const filteredResults = result.map((item) => ({
            team_players: item.players.map((player) => ({
                player_name: player.player_name,
                player_image: player.player_image,
                player_number: player.player_number,
                player_type: player.player_type,
                player_age: player.player_age,
                player_goals: player.player_goals,
                player_assists: player.player_assists,
                player_red_cards: player.player_red_cards
            }))
        }));
        return filteredResults;
    }
    catch (error) {
        throw new Error(`Error al obtener el usuario: ${error.message}`);
    }
});
exports.getPlayer = getPlayer;
const getPOnePlayer = (name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const baseUrl = process.env.API_URL;
        const url = `${baseUrl}get_players&player_name=${name}&APIkey=${process.env.API_KEY_APIFOOTBALL}`;
        const response = yield fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const result = yield response.json();
        const filteredResults = result.map((item) => ({
            player_id: item.player_key,
            player_name: item.player_name,
            player_country: item.player_country,
            player_image: item.player_image,
            player_number: item.player_number,
            player_type: item.player_type,
            player_age: item.player_age,
            player_goals: item.player_goals,
            player_team: item.team_name,
            player_rating: item.player_rating
        }));
        return filteredResults;
    }
    catch (error) {
        throw new Error(`Error al obtener el usuario: ${error.message}`);
    }
});
exports.getPOnePlayer = getPOnePlayer;
//# sourceMappingURL=api.service.js.map