// FILE: backend/src/config/db.js
// Membuat koneksi pool ke MySQL menggunakan mysql2.
// Kita pakai "pool" bukan koneksi biasa agar server bisa
// melayani banyak request secara bersamaan tanpa error.

const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Ubah pool menjadi versi yang mendukung async/await
// agar kita bisa pakai "await pool.query(...)" di controller nanti
const promisePool = pool.promise();

// Fungsi ini dipanggil sekali saat server menyala
// untuk memastikan koneksi ke database benar-benar berhasil
const testConnection = async () => {
  try {
    const connection = await promisePool.getConnection();
    console.log(
      `✅ Koneksi database berhasil! (DB: ${process.env.DB_NAME})`
    );
    connection.release();
  } catch (error) {
    console.error("❌ Koneksi database GAGAL:", error.message);
    console.error(
      "   Cek kembali: apakah MySQL sudah nyala? Apakah .env sudah benar?"
    );
    process.exit(1);
  }
};

module.exports = { promisePool, testConnection };