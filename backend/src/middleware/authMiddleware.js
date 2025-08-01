// backend/src/middleware/authMiddleware.js

const jwt = require("jsonwebtoken");
const User = require("../models/user"); // Asegúrate de que la ruta a tu modelo User sea correcta

// Middleware para proteger rutas (verificar token de autenticación)
const protect = async (req, res, next) => {
  let token;

  // 1. Verificar si el token existe en los encabezados (headers)
  // El token se suele enviar en la cabecera 'Authorization' con el formato 'Bearer TOKEN_DE_AUTENTICACION'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Obtener el token de la cabecera
      token = req.headers.authorization.split(" ")[1]; // Divide "Bearer TOKEN" y toma el TOKEN

      // 2. Verificar el token
      // Decodifica el token usando el JWT_SECRET y obtiene el payload (la información que firmamos, en este caso, el ID del usuario)
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3. Encontrar al usuario por ID y adjuntarlo al objeto `req`
      // Excluye la contraseña del objeto usuario en la respuesta
      req.user = await User.findById(decoded.id).select("-password");

      // Si no se encuentra el usuario con el ID del token
      if (!req.user) {
        return res
          .status(401)
          .json({ message: "No autorizado, usuario no encontrado." });
      }

      // Si todo es correcto, pasa al siguiente middleware o a la función de la ruta
      next();
    } catch (error) {
      console.error(error); // Imprime el error real en la consola del servidor para depuración
      res
        .status(401)
        .json({ message: "No autorizado, token fallido o expirado." });
    }
  }

  // Si no hay token en la cabecera
  if (!token) {
    res.status(401).json({ message: "No autorizado, no hay token." });
  }
};

// Middleware para restringir acceso por rol (ej. solo para administradores)
const admin = (req, res, next) => {
  // Asume que 'req.user' ya ha sido establecido por el middleware 'protect'
  if (req.user && req.user.role === "admin") {
    next(); // Si es admin, pasa al siguiente
  } else {
    res
      .status(403)
      .json({ message: "No autorizado, se requiere rol de administrador." }); // 403 Forbidden
  }
};

// ¡CRUCIAL!: Exporta las funciones para poder usarlas en tus rutas
module.exports = { protect, admin };
