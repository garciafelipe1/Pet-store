const User = require("../models/user"); 
const jwt = require("jsonwebtoken"); 


const generateToken = (id) => {
  
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "2h", 
  });
};

// @desc    Registrar un nuevo usuario
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  // 1. Validar que los campos requeridos no estén vacíos
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Por favor, introduce todos los campos requeridos.' });
  }

  try {
    // 2. Verificar si el usuario ya existe
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'El usuario ya existe con este correo electrónico.' });
    }

    // 3. Crear el nuevo usuario
    const user = await User.create({
      name,
      email,
      password, // La contraseña se hashea automáticamente por el middleware 'pre-save' en el modelo User
      role: role || 'user', // Asigna el rol si se proporciona, de lo contrario, por defecto 'user'
    });

    // 4. Si el usuario se creó correctamente, responde con los datos del usuario y un token
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id), // Genera un token JWT para el usuario
      });
    } else {
      res.status(400).json({ message: 'Datos de usuario inválidos.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor al registrar el usuario.' });
  }
};

// @desc    Autenticar un usuario y obtener token
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // 1. Validar que los campos no estén vacíos
  if (!email || !password) {
    return res.status(400).json({ message: 'Por favor, introduce email y contraseña.' });
  }

  try {
    // 2. Verificar si el usuario existe
    const user = await User.findOne({ email });

    // 3. Si el usuario existe y la contraseña es correcta (usando el método matchPassword del modelo)
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id), // Genera un token JWT
      });
    } else {
      res.status(401).json({ message: 'Credenciales inválidas (email o contraseña).' }); // 401 Unauthorized
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor al intentar iniciar sesión.' });
  }
};

// @desc    Obtener el perfil del usuario (ej. para la dashboard de perfil)
// @route   GET /api/users/profile
// @access  Private (requiere autenticación)
const getUserProfile = async (req, res) => {
  // req.user viene del middleware de autenticación (que crearemos después)
  if (req.user) {
    res.json({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      // No enviamos la contraseña
    });
  } else {
    res.status(404).json({ message: 'Usuario no encontrado.' });
  }
};


module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
};

