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
exports.updateUser = exports.deleteUser = exports.populateRankingForExistingUsers = exports.createUser = exports.getUser = exports.getUsers = void 0;
const ranking_model_1 = require("../models/ranking.model");
const user_model_1 = require("../models/user.model");
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.User.findAll();
        if (!user)
            throw new Error("Usuarios no encontrados");
        return user;
    }
    catch (error) {
        throw new Error(`Error al obtener los usuarios: ${error.message}`);
    }
});
exports.getUsers = getUsers;
const getUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.User.findOne({
            where: { id },
            include: [
                {
                    model: ranking_model_1.Ranking,
                    attributes: ["points", "division"],
                },
            ],
        });
        if (!user)
            throw new Error("Usuario no encontrado");
        return user;
    }
    catch (error) {
        throw new Error(`Error al obtener el usuario: ${error.message}`);
    }
});
exports.getUser = getUser;
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.User.create(data);
        if (!user)
            throw new Error("Usuario no creado");
        // Crear un registro en la tabla de Ranking con 0 puntos por defecto
        yield ranking_model_1.Ranking.create({
            user_id: user.id, // Usa el ID del usuario recién creado
            points: 0, // Puntos iniciales (opcional)
            division: 4, // División inicial (opcional)
        });
        return { msg: "Usuario creado" };
    }
    catch (error) {
        throw new Error(`Error al crear el usuario: ${error.message}`);
    }
});
exports.createUser = createUser;
const populateRankingForExistingUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Obtener todos los usuarios que no tienen un registro en la tabla Ranking
        const usersWithoutRanking = yield user_model_1.User.findAll({
            include: [
                {
                    model: ranking_model_1.Ranking,
                    required: false, // Esto asegura que también traiga usuarios sin ranking
                },
            ],
            where: { "$Ranking.user_id$": null }, // Solo usuarios sin ranking
        });
        // Crear un ranking para cada usuario sin uno
        for (const user of usersWithoutRanking) {
            if (!user.id) {
                throw new Error("El user_id no está definido");
            }
            // Crear el registro en Ranking sin casting
            yield ranking_model_1.Ranking.create({
                user_id: user.id, // Usa el ID del usuario recién creado
                points: 0, // Puntos iniciales (opcional)
                division: 4, // División inicial (opcional)
            });
        }
        console.log("Ranking inicializado para usuarios existentes.");
    }
    catch (error) {
        console.error(`Error al inicializar el ranking: ${error.message}`);
    }
});
exports.populateRankingForExistingUsers = populateRankingForExistingUsers;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.User.destroy({ where: { id: id } });
        if (!user)
            throw new Error("Usuario no eliminado");
        return { msg: "Usuario eliminado" };
    }
    catch (error) {
        throw new Error(`Error al eliminar el usuario: ${error.message}`);
    }
});
exports.deleteUser = deleteUser;
const updateUser = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.User.update(data, { where: { id: id } });
        if (!user)
            throw new Error("Usuario no actualizado");
        return { msg: "Usuario actualizado" };
    }
    catch (error) {
        throw new Error(`Error al eliminar el usuario: ${error.message}`);
    }
});
exports.updateUser = updateUser;
//# sourceMappingURL=user.service.js.map