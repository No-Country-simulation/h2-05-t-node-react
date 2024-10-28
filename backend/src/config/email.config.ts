import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';
import inlineCss from 'inline-css';

interface EmailOptions {
  to: string;
  subject: string;
  htmlTemplate: string; // Ruta de la plantilla HTML
  templateVars: Record<string, string>; // Variables dinámicas a reemplazar
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

function loadHtmlTemplate(filePath: string, templateVars: Record<string, string>): string {
  let template = fs.readFileSync(filePath, 'utf-8');

  for (const [key, value] of Object.entries(templateVars)) {
    const regex = new RegExp(`{{${key}}}`, 'g');
    template = template.replace(regex, value);
  }

  return template;
}

export async function sendEmail(options: EmailOptions): Promise<void> {
  let htmlContent = '';

  if (options.htmlTemplate && options.templateVars) {
    const templatePath = path.join(__dirname, options.htmlTemplate);
    htmlContent = loadHtmlTemplate(templatePath, options.templateVars);
  }

  // Incrustar CSS inline
  htmlContent = await inlineCss(htmlContent, { url: ' ' });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: options.to,
    subject: options.subject,
    html: htmlContent,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Correo enviado: ', info.response);
  } catch (error) {
    console.error('Error enviando el correo: ', error);
    throw new Error('No se pudo enviar el correo');
  }
}
