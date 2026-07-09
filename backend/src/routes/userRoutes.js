const express        = require("express");
const router         = express.Router();
const { verifyToken, authorizeRole } = require("../middleware/authMiddleware");
const { getMyProfile, getAllUsers }   = require("../controllers/userController");

router.get("/profile", verifyToken, getMyProfile);
router.get("/all", verifyToken, authorizeRole("pemilik"), getAllUsers);

module.exports = router;