import { Router } from "express";
import passport from "passport";
import { passportCall } from "../helpers/helpersPassportCall.js";
import usersController from "../controllers/users.controller.js";

const router = Router();

router.post("/login", [passportCall("login")], usersController.login );

router.post("/register", passport.authenticate("register", { failureRedirect: "/failregister" }), usersController.register);

router.post("/logout", usersController.logout);

router.get("/github", passport.authenticate("github"),usersController.github );

router.get("/githubcallback", passport.authenticate("github"),usersController.githubcallback);

router.get("/current", [ passportCall("jwt")], usersController.current)

export default router;