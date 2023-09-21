import { generateToken } from "../helpers/helpersJwt.js";
import UserDTO from "../DTOs/User.dto.js"
import { usersService } from '../services/index.js';
import logger from "../helpers/helpersLoggers.js"
import { createHash, isValidPassword } from "../helpers/helpersBcrypt.js"
import { sendEmailRestorePassword } from "../helpers/helpersNodemailer.js";

const login = async (req, res) => {

	if (!req.user) return res.status(400).send({ status: "error", error: "Invalid credentials" })

	const token = generateToken(req.user, "300s");
	return res
		.cookie("authToken", token, { maxAge: 300000, httpOnly: true })
		.json({ message: "User logged in" });

};

const register = async (req, res) => {
	res.status(200).send({ status: 'success', message: "User created" });
};

const logout = async (req, res) => {
	try {
		res.clearCookie("authToken")
		
		if (!req.session) return res.status(500).send({ status: `Logout error`, payload: err });

		req.session.destroy((err) => {
			if (!err) {
				return res.status(200).send(`Loged out`);
			};


			return res.status(500).send({ status: `Logout error`, payload: err });
		});
	} catch (err) {
		return res.status(500).json({ error: err.message });
	};
};

const github = async (req, res) => {

};

const githubcallback = async (req, res) => {
	const token = generateToken(req.user);

	res
		.cookie("authToken", token, { maxAge: 300000, httpOnly: true })
		.json({ message: "User logged in" });

	res.redirect("/products/?page=1");

};

const current = async (req, res) => {
	const sendUser = new UserDTO(req.user.user)
	res.send(sendUser)
};

const restorePassword = async (req, res) => {

	const { email } = req.body
	const dataUser = await usersService.findUser({ email: email })

	if (!email) { return res.status(404).send({ status: "error", error: "Sin email para recuperar" }) }

	if (!dataUser) { return res.status(404).send({ status: "error", error: "No existe mail!" }) }

	
	const data ={
		dataUser,
		host:"http://127.0.0.1:3000/restorePassword"
		}

	//generar Link
	const token = generateToken(data, "300s");
	// enviar correo
	const mail = await sendEmailRestorePassword(email, data.host)

	return res
		.cookie("restore", token, { maxAge: 300000, httpOnly: true })
		.json({ message: "Link restore success" });
};

const restoreNewPassword = async (req, res) => {

	const { password } = req.body
	const user = req.user.user.dataUser

	if (isValidPassword(user , password)) {
		return res.status(404).send({ status: `error`,msg: "Verificar clave" });
	}
	
	const pass = createHash(password); 

	const userUpdated = await usersService.updateUser({email: user.email}, {password : pass})

	try {

		res.clearCookie("restore")
		return res.status(200).send({ status: 'success', message: "Clave modificada!" });

    } catch (err) {
        logger.error('Error al restablecer la contraseña.');
		return res.status(500).send({ status: `Error`, payload: err })
    }
};

export default {
	login,
	register,
	logout,
	github,
	githubcallback,
	current,
	restorePassword,
	restoreNewPassword
};
