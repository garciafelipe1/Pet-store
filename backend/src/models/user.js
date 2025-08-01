const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "El nombre es requerido"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "El correo electrónico es requerido"],
    unique: true, // Asegura que no haya dos usuarios con el mismo email
    lowercase: true, // Guarda el email en minúsculas
    match: [/^\S+@\S+\.\S+$/, "Por favor, usa un email válido"], // Validación de formato de email
  },
  password: {
    type: String,
    required: [true, "La contraseña es requerida"],
    minlength: [6, "La contraseña debe tener al menos 6 caracteres"], // Longitud mínima para la contraseña
  },
  role: {
    type: String,
    enum: ["user", "admin"], // Roles permitidos: 'user' (cliente normal) o 'admin'
    default: "user", // Rol por defecto si no se especifica
  },
},{
    timestamps: true, 
  });


userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next(); 
  }
  const salt = await bcrypt.genSalt(10); 
  this.password = await bcrypt.hash(this.password, salt); 
  next(); 
});

// 4. Métodos del Esquema (para comparar contraseña y generar JWT)
// Método para comparar la contraseña ingresada con la contraseña hasheada en la DB
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Puedes añadir un método para generar JWT, pero a menudo se hace en el controlador
// userSchema.methods.generateAuthToken = function() {
//   const token = jwt.sign({ _id: this._id, role: this.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
//   return token;
// };



const User = mongoose.model("User", userSchema);

module.exports = User;

