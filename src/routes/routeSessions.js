import { Router } from "express";
import passport from "passport";
import { generateToken } from "../helpers/helpersJwt.js";
import { passportCall } from "../helpers/helpersPassportCall.js";

const router = Router();

router.post("/login", [passportCall("login")], async (req, res) => {

	if (!req.user) return res.status(400).send({ status: "error", error: "Invalid credentials" })

	const token = generateToken(req.user);
	return res
		.cookie("authToken", token, { maxAge: 300000, httpOnly: true })
		.json({ message: "User logged in" });

});

router.post("/register", passport.authenticate("register", { failureRedirect: "/failregister" }), async (req, res) => {

	res.status(200).send({ status: 'success', message: "User created" });

});

router.post("/logout", (req, res) => {
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
});

router.get("/github", passport.authenticate("github"), async (req, res) => { });

router.get("/githubcallback", passport.authenticate("github"),
	async (req, res) => {
		const token = generateToken(req.user);

		res
		.cookie("authToken", token, { maxAge: 300000, httpOnly: true })
		.json({ message: "User logged in" });

		res.redirect("/products/?page=1");
	}
);

router.get("/current", [ passportCall("jwt")], (req, res) => {
	res.send(req.user)
})

export default router;