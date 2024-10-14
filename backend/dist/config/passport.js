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
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const passport_local_1 = require("passport-local");
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_service_1 = require("../services/auth.service");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Estrategia local para login
passport_1.default.use(new passport_local_1.Strategy({
    usernameField: "email",
    passwordField: "password",
}, (email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield auth_service_1.authService.findUserByEmail(email, done);
        // Compara la contraseña ingresada con la almacenada
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return done(null, false, { message: "Contraseña incorrecta" });
        }
        return done(null, user);
    }
    catch (error) {
        return done(error);
    }
})));
// Estrategia Google OAuth
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    scope: ["profile", "email"],
}, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Usar el servicio de autenticación para manejar el login o registro
        const user = yield auth_service_1.authService.findOrCreateUserGoogle(profile);
        done(null, user);
    }
    catch (error) {
        done(error, false);
    }
})));
// Almacenar el usuario en la sesión, guarda el id
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield auth_service_1.authService.findUserById(id);
        done(null, user);
    }
    catch (error) {
        done(error);
    }
}));
//# sourceMappingURL=passport.js.map