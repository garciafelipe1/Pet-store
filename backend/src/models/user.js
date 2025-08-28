// models/User.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    minlength: 6,
    select: false, // No devolver por defecto
  },
  googleId: {
    type: String, // ID único de Google
    unique: true,
    sparse: true, // permite null sin romper el unique
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
}, {
  timestamps: true,
});

// Solo hashear password si existe y fue modificado
userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// ✅ Usar existente o compilar uno nuevo
module.exports = mongoose.models.User || mongoose.model("User", userSchema);
