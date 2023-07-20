import { Router } from "express";
import { userModel } from "../dao/mongo/models/userModels.js";


const router = Router();

router.post("/login", async (req, res) => {
	try {
		const {email, password} = req.body;
		const user = await userModel.findOne({email,password});

		if(!user) return res.status(400).send({status:"error",error:"Usuario o contraseña incorrectas"});
		req.session.user = {
			name: `${user.first_name} ${user.last_name}`,
			email: user.email
		}
		
		return res.status(200).send({status: 'success', payload: 'Usuario Logiado'});

	} catch (err) {
		return res.status(500).json({ error: err.message });
	};
});

router.post("/register", async (req, res) => {
	try {
			const result = await userModel.create(req.body);
			return res.status(200).send({status: 'success', payload: result});
	
		} catch (err) {
		return res.status(500).json({ status: 'error', payload: err.message });
	};
});

router.post("/logout", (req, res) => {
	try {
		if(!req.session) return res.status(500).send({ status: `Logout error`, payload: err });

		req.session.destroy((err) => {
			if (!err) {
				return res.status(200).send(`Loged out`);
			};

			return res.status(500).send({ status: `Logout error`, payload: err });
		});
	} catch (err) {
		return res.status(500).json({ error: err.message });
	};
});

export default router;