const jwt = require("jsonwebtoken");

// MIDDLEWARE 1: Memverifikasi keaslian Token JWT
const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    const error = new Error("Akses ditolak. Token autentikasi tidak ditemukan. Silakan login terlebih dahulu.");
    error.statusCode = 401; 
    return next(error);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Menyimpan data user ke request object
    next(); // Lolos! Silakan lanjut ke rute berikutnya
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      const expiredError = new Error("Sesi kamu sudah berakhir. Silakan login ulang.");
      expiredError.statusCode = 401;
      return next(expiredError);
    }

    const invalidError = new Error("Token tidak valid atau telah dimanipulasi. Silakan login ulang.");
    invalidError.statusCode = 401;
    return next(invalidError);
  }
};

// MIDDLEWARE 2: Memeriksa Hak Akses Peran (Otorisasi)
const authorizeRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      const error = new Error(`Akses ditolak. Halaman ini hanya untuk: ${allowedRoles.join(" atau ")}.`);
      error.statusCode = 403; // Forbidden (Punya akun tapi gak punya hak akses)
      return next(error);
    }
    next(); // Lolos! Role sesuai
  };
};

module.exports = { verifyToken, authorizeRole };