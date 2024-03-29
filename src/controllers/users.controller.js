import { generateToken } from "../helpers/helpersJwt.js";
import UserDTO from "../DTOs/User.dto.js"
import { usersService } from '../services/index.js';
import logger from "../helpers/helpersLoggers.js"
import { createHash, isValidPassword } from "../helpers/helpersBcrypt.js"
import { sendEmailRestorePassword } from "../helpers/helpersNodemailer.js";


const login = async (req, res) => {

	if (!req.user) return res.status(400).send({ status: "error", error: "Invalid credentials" })
	
	const userMod = await usersService.updateUser({_id:req.user._id}, {last_connection : new Date()})

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
		const userMod = await usersService.updateUser({_id:req.user._id}, {last_connection : new Date()})
		
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

const rolUsersPremium = async (req, res) => {

	const id = req.params.uid

	const user = await usersService.findIdUser(id)

	if (!user) return res.status(404).send({ status: "error", error: "No exite usuario" })

	if(user.rol == "PREMIUM_ROLE"){
		const userMod = await usersService.updateUser({_id:id}, {rol : "USER_ROLE"})
		res.clearCookie("authToken")
		return res.status(200).send({ status: 'success', message: "Se realizo el cambio a USER" });
	}
	if(user.rol == "USER_ROLE"){
		
		if(user.documents.some(e =>e.category == "identificacion") && user.documents.some(e =>e.category == "cuenta")&&user.documents.some(e =>e.category == "domicilio")){
			const userMod = await usersService.updateUser({_id:id}, {rol : "PREMIUM_ROLE"})
			res.clearCookie("authToken")
			return res.status(200).send({ status: 'success', message: "Se realizo el cambio a PREMIUM" });
		}else{
			return res.status(404).send({ status: 'error', message: " El usuario no ha terminado de procesar su documentación" });
	
		}
	}

	res.status(404).send({ status: "error", error: "Solo permite modificar ROL USER y PREMIUM" })
};

const documentsUsers = async (req, res) => {

	const id = req.params.uid
	const file = req.file

	if (!file) return res.status(400).send({ status: "error", error: "No exite archivo" })
	
	try {
		const user = await usersService.findIdUser(id)
		if (!user) return res.status(404).send({ status: "error", error: "No exite usuario" })

		user.documents.push({name: file.filename, reference: `${file.path}` , category: file.fieldname})

		const info = await usersService.updateUser({_id:id}, {documents : user.documents})
		
		res.status(200).send({ status: "success", msg: "Archivo almacenado" })
		
	} catch (error) {
		res.status(404).send({ status: "error", error: `Error base de datos ${error}` })
		logger.error(error)
	}

};

const getUsers = async(req, res) => {
	try {
		const sendUsers = []
		const users = await usersService.getAllUsers()
		users.forEach(e => {
			sendUsers.push(new UserDTO(e))
		});
		return res.status(200).send({ status: "success", users : sendUsers})
	} catch (error) {
		return res.status(404).send({ status: "error", error: error})
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
	restoreNewPassword,
	rolUsersPremium,
	documentsUsers,
	getUsers
};
