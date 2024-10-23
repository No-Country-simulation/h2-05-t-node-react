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
exports.sendEmail = sendEmail;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const inline_css_1 = __importDefault(require("inline-css"));
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
});
function loadHtmlTemplate(filePath, templateVars) {
    let template = fs_1.default.readFileSync(filePath, 'utf-8');
    for (const [key, value] of Object.entries(templateVars)) {
        const regex = new RegExp(`{{${key}}}`, 'g');
        template = template.replace(regex, value);
    }
    return template;
}
function sendEmail(options) {
    return __awaiter(this, void 0, void 0, function* () {
        let htmlContent = '';
        if (options.htmlTemplate && options.templateVars) {
            const templatePath = path_1.default.join(__dirname, options.htmlTemplate);
            htmlContent = loadHtmlTemplate(templatePath, options.templateVars);
        }
        // Incrustar CSS inline
        htmlContent = yield (0, inline_css_1.default)(htmlContent, { url: ' ' });
        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: options.to,
            subject: options.subject,
            html: htmlContent,
        };
        try {
            const info = yield transporter.sendMail(mailOptions);
            console.log('Correo enviado: ', info.response);
        }
        catch (error) {
            console.error('Error enviando el correo: ', error);
            throw new Error('No se pudo enviar el correo');
        }
    });
}
//# sourceMappingURL=email.config.js.map