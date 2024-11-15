const mongoose = require('mongoose');// Mengimpor Modul mongoose untuk membuat skema dan model MongoDB
const bcrypt = require("bcryptjs"); // Mengimpor bcryptjs untuk mengenkripsi password pengguna

const userSchema = new mongoose.Schema({// Definisikan skema untuk fakultas
    name: {
        type: String, // Tipe data nama adalah string
        required: true, // Nama wajib diisi
    },
    email: {
        type: String, // Tipe data email adalah string
        required: true, // Email wajib diisi
        unique: true, // Email harus unik
    },
    password: {
        type: String, // Tipe data password adalah string
        required: true, // Password wajib diisi
    },
    role: {
        type: String, // Tipe data role adalah string
        enum: ["user", "admin"], // Role terbatas hanya bisa 'user' atau 'admin'
        default: "user", //Default role adalah 'user'
    },
    date: {
        type: Date, // Tipe data tanggal adalah date
        default: Date.now, // Default date adalah waktu saat ini
    },
});

// Fungsi untuk mengenkripsi password sebelum menyimpan pengguna
userSchema.pre("Save", async function (next){
    if (!this.isModified("password")) {
        // Jika password tidak diubah, dilanjutkan tanpa meng-enkripsi ulang    
        return next();
    }
    const salt = await bcrypt.genSalt(10); // Membuat salt untuk enkripsi password
    this.password = await bcrypt.hash(this.password, salt); // Mengenkripsi password
    next();
});

module.exports = mongoose.model("User", userSchema); // Mengekspor model User berdasarkan UserSchema    