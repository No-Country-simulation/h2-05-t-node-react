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
exports.updateUser = exports.deleteUser = exports.createUser = exports.getUser = exports.getUsers = void 0;
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
        const user = yield user_model_1.User.findOne(id);
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
        return { msg: "Usuario creado" };
    }
    catch (error) {
        throw new Error(`Error al crear el usuario: ${error.message}`);
    }
});
exports.createUser = createUser;
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