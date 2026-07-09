require("dotenv").config();
const express              = require("express");
const cors                 = require("cors");
const { testConnection }   = require("./src/config/db");
const authRoutes           = require("./src/routes/authRoutes");
const userRoutes           = require("./src/routes/userRoutes");

const app  = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin        : "http://localhost:5173",
  methods       : ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mendaftarkan Endpoint URL Utama
app.use("/api/auth",  authRoutes);  
app.use("/api/users", userRoutes);  

// 404 Handler (Jika URL salah ketik)
app.use((req, res) => {
  res.status(404).json({
    status : "error",
    message: `Endpoint '${req.method} ${req.originalUrl}' tidak ditemukan.`,
  });
});

// Global Error Handler (Sistem jaring pengaman otomatis saat ada error)
app.use((err, req, res, next) => {
  console.error(`❌ [${new Date().toISOString()}] ${err.message}`);
  res.status(err.statusCode || 500).json({
    status : "error",
    message: err.message || "Terjadi kesalahan internal pada server.",
  });
});

const startServer = async () => {
  await testConnection();
  app.listen(PORT, () => {
    console.log("=================================================");
    console.log(`🚀  Server berjalan di : http://localhost:${PORT}`);
    console.log("=================================================");
  });
};

startServer();  