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
exports.authService = void 0;
const user_model_1 = require("../models/user.model");
class AuthService {
    findUserByEmail(email, done) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield user_model_1.User.findOne({
                where: { email: email },
            });
            if (!existingUser) {
                return done(null, false, { message: "Usuario no encontrado" });
            }
            return existingUser;
        });
    }
    findOrCreateGoogleUser(profile) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield user_model_1.User.findOne({
                where: { googleId: profile.id },
            });
            if (existingUser) {
                return existingUser;
            }
            const newUser = new user_model_1.User({
                googleId: profile.id,
                username: profile.displayName,
                email: profile.emails[0].value,
                photo: profile.photos && profile.photos.length > 0
                    ? profile.photos[0].value
                    : "https://via.placeholder.com/150",
            });
            yield newUser.save();
            return newUser;
        });
    }
    findUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.User.findByPk(id);
        });
    }
}
exports.authService = new AuthService();
//# sourceMappingURL=auth.service.js.map