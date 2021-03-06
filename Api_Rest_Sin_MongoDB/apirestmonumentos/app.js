/**
 * Este ejemplo es una modificación de https://github.com/davidpoza/passport-jwt-example/ para
 * que trabaje, en lugar de sobre una base de datos, sobre una colección de usuarios, manejada
 * por un servicio con diferentes funciones de inserción y búsqueda
 * 
 * Se debe añadir un fichero .env en la raiz del proyecto, con al menos las siguientes constantes
 * 
 * # secret for encryption of jwt signature
 * JWT_SECRET=esteeselsecretomassecretodetodoslossecretos
 *
 * # number of rounds for Blowfish algorithm for hashing user password
 * BCRYPT_ROUNDS=12
 * 
 * # lifetime of the token (in seconds)
 * JWT_LIFETIME=86400
 * 
 * # algorithm used in token signing
 * JWT_ALGORITHM=HS256
 * 
 NPM INSTALL
 npm install --global --production windows-build-tools
 */


const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
require('dotenv').config();
const passport = require("passport");
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcryptjs');
const user_routes = require('./routes/users');
const customMdw = require('./middleware/custom'); 
const UserService = require('./services/user')
const monuments_routes = require('./routes/monuments');

passport.use(new LocalStrategy({
    usernameField: "username",
    passwordField: "password",
    session: false
}, (username, password, done) => {
    let data = UserService.findUser({username : username});
    if (data === undefined) return done(null, false);
    else if (!bcrypt.compareSync(password, data.password)) {
        return done(null, false);
    }
    return done(null, data); //login ok
}));

/** config de estrategia jwt de passport ******/
let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;
opts.algorithms = [process.env.JWT_ALGORITHM];

passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    console.log("ejecutando *callback verify* de estategia jwt");
    let data = UserService.findById(jwt_payload.sub);
    if (data === null)
        return done(null, false);
    else
        return done(null, data);
}));

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(passport.initialize())
app.use('/api/', user_routes);
//ATENCION!!!!! SE DEBEN PONER LAS RUTAS EN EL APP.JS O SI NO NO ENCONTRARA EL ENDPOINT
app.use('/monumentos/', monuments_routes);
app.use(customMdw.errorHandler);
app.use(customMdw.notFoundHandler);

module.exports = app
