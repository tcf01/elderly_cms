import * as passport from 'passport';
import * as passportJWT from 'passport-jwt';
import jwt from './jwt';
import { authService } from '../app';

const JWTStrategy = passportJWT.Strategy;
const { ExtractJwt } = passportJWT;

passport.use(new JWTStrategy({
    secretOrKey: jwt.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}, async (payload, done) => {
    const user = await authService.getUserById(payload.id);
    console.log(user, payload)
    if (user) {
        return done(null, user);
    } else {
        return done(new Error("User not Found"), null);
    }
})
);