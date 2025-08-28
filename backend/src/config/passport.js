const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,        // lo sacás de Google Cloud Console
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/api/auth/google/callback",
  },
  (accessToken, refreshToken, profile, done) => {
    // Acá podés buscar o guardar el usuario en tu DB
    // por ahora lo devolvemos como está
    return done(null, profile);
  }
));

// Serialización de usuario para la sesión
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

module.exports = passport;
