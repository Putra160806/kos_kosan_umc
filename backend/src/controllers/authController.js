const bcrypt    = require("bcryptjs");
const jwt       = require("jsonwebtoken");
const { promisePool } = require("../config/db");

const VALID_ROLES = ["penyewa", "pemilik"];

// --- REGISTER ---
const register = async (req, res, next) => {
  try {
    const { nama, email, password, role } = req.body;

    if (!nama || !email || !password || !role) {
      const error = new Error("Semua field (nama, email, password, role) wajib diisi.");
      error.statusCode = 400; 
      return next(error); 
    }

    if (password.length < 6) {
      const error = new Error("Password minimal harus 6 karakter.");
      error.statusCode = 400;
      return next(error);
    }

    if (!VALID_ROLES.includes(role)) {
      const error = new Error(`Role tidak valid. Pilih antara: ${VALID_ROLES.join(" atau ")}.`);
      error.statusCode = 400;
      return next(error);
    }

    const checkEmailSql  = "SELECT id FROM users WHERE email = ?";
    const [existingUsers] = await promisePool.query(checkEmailSql, [email]);

    if (existingUsers.length > 0) {
      const error = new Error("Email ini sudah terdaftar. Silakan gunakan email lain atau langsung login.");
      error.statusCode = 400;
      return next(error);
    }

    const saltRounds   = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const insertSql = `
      INSERT INTO users (nama, email, password, role)
      VALUES (?, ?, ?, ?)
    `;
    const [result] = await promisePool.query(insertSql, [
      nama,
      email,
      hashedPassword, 
      role,
    ]);

    const newUserId = result.insertId;

    return res.status(201).json({ 
      status : "success",
      message: "Registrasi berhasil! Silakan login.",
      data   : {
        id   : newUserId,
        nama : nama,
        email: email,
        role : role,
      },
    });

  } catch (error) {
    next(error);
  }
};

// --- LOGIN ---
const login = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      const error = new Error("Email, password, dan role wajib diisi.");
      error.statusCode = 400;
      return next(error);
    }

    if (!VALID_ROLES.includes(role)) {
      const error = new Error(`Role tidak valid. Pilih antara: ${VALID_ROLES.join(" atau ")}.`);
      error.statusCode = 400;
      return next(error);
    }

    const findUserSql  = "SELECT * FROM users WHERE email = ? AND role = ?";
    const [users]      = await promisePool.query(findUserSql, [email, role]);

    if (users.length === 0) {
      const error = new Error("Email atau Password salah. Pastikan role yang dipilih sudah benar.");
      error.statusCode = 401; 
      return next(error);
    }

    const user = users[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      const error = new Error("Email atau Password salah. Pastikan role yang dipilih sudah benar.");
      error.statusCode = 401;
      return next(error);
    }

    const payload = {
      id   : user.id,
      nama : user.nama,
      email: user.email,
      role : user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return res.status(200).json({
      status : "success",
      message: `Selamat datang kembali, ${user.nama}!`,
      data   : {
        token: token, 
        user : {
          id   : user.id,
          nama : user.nama,
          email: user.email,
          role : user.role,
        },
      },
    });

  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };