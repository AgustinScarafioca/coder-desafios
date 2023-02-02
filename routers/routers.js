import Container from "../containers/containerUser";
import { get, add, update, Delete, } from "../controllers/controllerProduct";
import { getSignIn, getSignUp, getLogout, } from "../controllers/controllerUser";
import { Router } from "express";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bCrypt from "bcrypt";

const dbUsuario = new Container();
const products = Router();
const ingresar = Router();
const register = Router();
const exit = Router();

function createHash(password) {
    return bCrypt.hashSync( password, bCrypt.genSaltSync(10), null );
}

passport.use("register", new LocalStrategy({
    passReqToCallback: true,
}, async (req, username, password, done) => {

    const { name } = req.body;
    const user = await dbUsuario.getUser(username);

    if (user) {
        return done("el usuario ya esta registrado", false);
    }

    const newUser = {
        username,
        password: createHash(password),
        name,
    };

    dbUsuario.addUser(newUser);

    done(null, newUser);
}));

function isValidPassword(user, password) {
    return bCrypt.compareSync(password, user.password);
}

passport.use("login", new LocalStrategy(async (username, password, done) => {

    const user = await dbUsuario.getUser(username);

    if (!user) {
        return done("no existe el usuario", false);
    };

    if (!isValidPassword(user, password)) {
        return done("Contraseña incorrecta", false)
    };

    return done(null, user);
}));

passport.serializeUser((user, done) => {
    done(null, user.username);
});

passport.deserializeUser(async (username, done) => {
    const user = await dbUsuario.getUser(username);
    done(null, user);
});

ingresar.get("/", getSignIn);
ingresar.post("/", passport.authenticate("login", { 
    failureRedirect: "/ingresar/errorIngresar", 
    successRedirect: "/products",
}));
ingresar.get("/errorIngresar", (req, res) => {
    res.render("login-error");
});

register.get("/", getSignUp);
register.post("/", passport.authenticate("register", {
    failureRedirect: "/registro/errorRegistro", 
    successRedirect: "/products",
}));
register.get("/errorRegistro", (req, res)=> {
    res.render("register-error");
});

exit.get("/", getLogout);

function requireAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/ingresar');
    };
};

products.get("/:id?", requireAuthentication, get);
products.post("/", requireAuthentication, add);
products.put("/:id", requireAuthentication, update);
products.delete("/:id", requireAuthentication, Delete);

export {ingresar, products, register, exit};