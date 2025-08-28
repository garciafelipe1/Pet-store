// routes/auth.js
const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Inicia login con Google
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Callback después del login
router.get("/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  async (req, res) => {
    try {
      const googleUser = req.user;

      // Buscar si ya existe en la DB
      let user = await User.findOne({ googleId: googleUser.id });

      if (!user) {
        // Si no existe, crear nuevo
        user = await User.create({
          googleId: googleUser.id,
          name: googleUser.displayName,
          email: googleUser.emails[0].value,
        });
      }

      // Generar JWT
      const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      // Enviar token + user al frontend
      res.json({ token, user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error en la autenticación con Google" });
    }
  }
);

module.exports = router;
