import { generateToken } from "../helpers/helpersJwt.js";
import UserDTO from "../DTOs/User.dto.js"

const login = async (req, res) => {

	if (!req.user) return res.status(400).send({ status: "error", error: "Invalid credentials" })

	const token = generateToken(req.user);
	return res
		.cookie("authToken", token, { maxAge: 300000, httpOnly: true })
		.json({ message: "User logged in" });

};

const register = async (req, res) => {
	res.status(200).send({ status: 'success', message: "User created" });
};

const logout = async (req, res) => {
    try {
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


export default {
    login,
    register,
    logout,
    github,
    githubcallback,
    current
};
