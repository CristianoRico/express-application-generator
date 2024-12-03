// Mengimpor modul express untuk membuat router
const express = require("express");
// Membuat instance router dari express
const router = express.Router();
// Mengimpor Controller fakultas untuk menangani logika bisnis
const fakultasController = require("../controllers/fakultasController");

// Mengimpor middleware untuk autentikasi dan pengecekan peran
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Definisi rute untuk fakultas
// Mengatur rute GET untuk mendapatkan semua data fakultas
router.get("/", fakultasController.getAllFakultas);
// Mengatur rute POST untuk membuat data fakultas baru
router.post("/",
    // authMiddleware,roleMiddleware("admin"),
    fakultasController.createFakultas);
// Mengatur rute GET untuk mendapatkan data fakultas berdasarkan ID
router.get("/:id", fakultasController.getFakultasById);
// Mengatur rute PUT untuk memperbarui data fakultas berdasarkan ID
router.put("/:id",authMiddleware,roleMiddleware("admin"),fakultasController.updateFakultas);
// Mengatur rute DELETE untuk menghapus data fakultas berdasarkan ID
router.delete("/:id",authMiddleware,roleMiddleware("admin"),fakultasController.deleteFakultas);

// Mengeksport router agar dapat digunakan di file lain (misalnya, di app.js)
module.exports = router;