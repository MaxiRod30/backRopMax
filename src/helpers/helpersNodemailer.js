import { createTransport } from 'nodemailer';
import {nodemailerEMAIL,nodemailerEMAIL_PASSWORD} from '../config/app.config.js';

const transporter = createTransport({
	service: 'gmail',
	port: 587,
	auth: {
		user: nodemailerEMAIL,
		pass: nodemailerEMAIL_PASSWORD,
	},      
	tls: {
		rejectUnauthorized: false
	}
});

export const sendEmailRestorePassword = async (restoreEmail,host) => {

	try {
		const emailContent = {
			from: nodemailerEMAIL,
			to: `${restoreEmail}`,
			subject: 'ROPMAX - Recuperacion de contraseña',
			html: `
			<div>
                <h1> Recuperacion de contraseña </h1>
				<p>Para crear una nueva contraseña, entrar al link</p>
				<a href=${host}>Recupera su contraseña</a>
			</div>
			`,
		};

		const mail = await transporter.sendMail(emailContent);

		return mail;
	} catch (error) {
		return `${error}`;
	}
};