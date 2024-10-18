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
exports.login = exports.updateOneUser = exports.deleteOneUser = exports.createOneUser = exports.getOneUser = exports.getAllUsers = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_service_1 = require("../services/user.service");
const enumsErrors_1 = require("../utils/enumsErrors");
const user_model_1 = require("../models/user.model");
const HttpResponse = new enumsErrors_1.httpResponse();
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, user_service_1.getUsers)();
        if (!users)
            return HttpResponse.DATA_BASE_ERROR(res, "Usuarios no encontrados");
        return HttpResponse.OK(res, users);
    }
    catch (error) {
        return HttpResponse.Error(res, error.message);
    }
});
exports.getAllUsers = getAllUsers;
const getOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id || typeof id !== "string") {
            return HttpResponse.INVALID_TYPE_ERROR(res, "ID de usuario no válido");
        }
        const user = yield (0, user_service_1.getUser)(id);
        if (!user)
            return HttpResponse.DATA_BASE_ERROR(res, "Usuario no encontrado");
        return HttpResponse.OK(res, user);
    }
    catch (error) {
        return HttpResponse.Error(res, error.message);
    }
});
exports.getOneUser = getOneUser;
const createOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        if (typeof data.password !== "string") {
            return HttpResponse.Error(res, "Password must be a string");
        }
        const hashedPassword = yield bcrypt_1.default.hash(data.password, 10);
        data.password = hashedPassword;
        const user = yield (0, user_service_1.createUser)(data);
        if (!user)
            return HttpResponse.DATA_BASE_ERROR(res, "Error al cargar los datos");
        return HttpResponse.OK(res, user.msg);
    }
    catch (error) {
        return HttpResponse.Error(res, error.message);
    }
});
exports.createOneUser = createOneUser;
const deleteOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield (0, user_service_1.deleteUser)(id);
        if (!user)
            return HttpResponse.DATA_BASE_ERROR(res, "Error al eliminar el usuario");
        return HttpResponse.OK(res, user.msg);
    }
    catch (error) {
        return HttpResponse.Error(res, error.message);
    }
});
exports.deleteOneUser = deleteOneUser;
const updateOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = req.body;
        if (data.password) {
            const hashedPassword = yield bcrypt_1.default.hash(data.password, 10);
            data.password = hashedPassword;
        }
        const user = yield (0, user_service_1.updateUser)(id, req.body);
        if (!user)
            return HttpResponse.DATA_BASE_ERROR(res, "Error al actualizar el usuario");
        return HttpResponse.OK(res, user.msg);
    }
    catch (error) {
        return HttpResponse.Error(res, error.message);
    }
});
exports.updateOneUser = updateOneUser;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const JWT_KEY = process.env.JWT_KEY;
        const { email, password } = req.body;
        if (!(email && password)) {
            return HttpResponse.INVALID_TYPE_ERROR(res, "Email y contraseña son obligatorios");
        }
        const user = yield user_model_1.User.findOne({ where: { email: email } });
        if (!user) {
            return HttpResponse.INVALID_TYPE_ERROR(res, "Usuario no encontrado");
        }
        const isValidPassword = yield bcrypt_1.default.compare(password, user.password);
        if (!isValidPassword) {
            return HttpResponse.INVALID_TYPE_ERROR(res, "contraseña invalidos");
        }
        const id = user.id;
        const token = jsonwebtoken_1.default.sign({ email, id }, JWT_KEY, {
            expiresIn: "24h",
        });
        const response = {
            token: token,
            user: {
                id: user.id,
                name: user.username,
                email: user.email,
                rol: user.rol,
                photo: user.photo,
                total_predictions: user.total_predictions,
                subscription: user.subscription,
                registration_date: user.registration_date,
            },
        };
        // Configurar la cookie con el token
        res.cookie(process.env.PASS_COOKIE, token, {
            maxAge: 1000 * 60 * 60, // 1 hora
            httpOnly: false,
            sameSite: "none",
        });
        return HttpResponse.OK(res, response);
    }
    catch (error) {
        return HttpResponse.Error(res, error.message);
    }
});
exports.login = login;
//# sourceMappingURL=user.controller.js.map