const { promisePool } = require("../config/db");

// Ambil profil diri sendiri (Bisa Penyewa / Pemilik)
const getMyProfile = async (req, res, next) => {
  try {
    const userId = req.user.id; // Diambil dari data token di middleware
    const sql = "SELECT id, nama, email, role, created_at FROM users WHERE id = ?";
    const [users] = await promisePool.query(sql, [userId]);

    if (users.length === 0) {
      const error = new Error("Akun tidak ditemukan.");
      error.statusCode = 404;
      return next(error);
    }

    const user = users[0];
    return res.status(200).json({
      status : "success",
      message: "Data profil berhasil diambil.",
      data   : {
        id        : user.id,
        nama      : user.nama,
        email     : user.email,
        role      : user.role,
        bergabung : user.created_at,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Ambil semua daftar user (Hanya untuk Pemilik / Admin panel)
const getAllUsers = async (req, res, next) => {
  try {
    const sql = "SELECT id, nama, email, role, created_at FROM users ORDER BY created_at DESC";
    const [users] = await promisePool.query(sql);

    return res.status(200).json({
      status : "success",
      message: `${users.length} user ditemukan.`,
      data   : users,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getMyProfile, getAllUsers };