import passport from "passport"
import { Strategy, ExtractJwt as _ExtractJwt } from "passport-jwt";
import cookieExtractor from "../helpers/helpersCookieExtractor.js";
import local from "passport-local"
import GitHubStrategy from "passport-github2"

import { usersService } from "../services/index.js"

import CartManager from "../dao/mongo/manager/cartMongoManager.js"
import { createHash, isValidPassword } from "../helpers/helpersBcrypt.js"

const localStrategy = local.Strategy
const JWTStrategy = Strategy;
const ExtractJwt = _ExtractJwt;

const cartManager = new CartManager()

const inilitializePassport = () => {
    passport.use("register", new localStrategy({
        usernameField: "email",
        passReqToCallback: true,

    }, async (req, username, password, done) => {

        const { first_name, last_name, email, age } = req.body

        try {

            const user = await usersService.findUser({ email: username })

            if (user) return done(null, false, { message: "User already exists" })
            const cartNew = await cartManager.createCart()

            const newUser = {
                first_name,
                last_name,
                email,
                age,
                password: createHash(password),
                cart: cartNew._id
            }
            const result = await usersService.createUser(newUser)

            return done(null, result)

        } catch (error) {
            return done(error)
        }
    })
    )

    passport.use("login", new localStrategy(
        {
            usernameField: "email",
        },
        async (username, password, done) => {
            try {
                const user = await usersService.findUser({ email: username });
                if (!user) {
                    return done(null, false, { message: "User not found" });
                }
                if (!isValidPassword(user, password)) {
                    return done(null, false, { message: "Wrong password" });
                }
                return done(null, user);
            } catch (error) {
                return done("Error al obtener el usuario" + error);
            }
        }
    )
    );

    passport.use("github", new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const user = await usersService.findUser({ email: profile._json.email });
            if (!user) {
                const newUser = {
                    first_name: profile._json.name.split(" ")[0],
                    last_name: profile._json.name.split(" ")[1],
                    email: profile._json.email,
                    password: " ",
                };
                const result = await usersService.createUser(newUser);
                return done(null, result);
            } else {
                return done(null, user);
            }
        } catch (error) {
            return done("Error al obtener el usuario" + error);
        }
    }
    )
    );

    passport.use("jwt", new JWTStrategy({
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: process.env.JWT_SECRET_KEY,
    }, async (jwt_payload, done) => {
        try {
            done(null, jwt_payload);
        } catch (error) {
            done(error);
        }
    }
    )
    );

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        const user = usersService.findIdUser(id)
        done(null, user)
    })
}

export default inilitializePassport