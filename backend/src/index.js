const express = require('express');
const cors = require('cors');
const pool = require('./config/db');
const productoRoutes = require('./routes/productoRoutes');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors());
app.use(express.json());

// Inicializar BD
const initDatabase = async () => {
    try {
        console.log("⏳ Inicializando base de datos...");
        
        // Crear tabla usuarios
        await pool.query(`
            CREATE TABLE IF NOT EXISTS usuarios (
                id SERIAL PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                rol VARCHAR(50) DEFAULT 'user',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        
        // Crear tabla categorías
        await pool.query(`
            CREATE TABLE IF NOT EXISTS categorias (
                id SERIAL PRIMARY KEY,
                nombre VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        
        // Crear tabla productos
        await pool.query(`
            CREATE TABLE IF NOT EXISTS productos (
                id SERIAL PRIMARY KEY,
                nombre VARCHAR(250) NOT NULL,
                precio DECIMAL(10, 2) NOT NULL,
                stock INT DEFAULT 0,
                descripcion TEXT,
                imagen_url VARCHAR(500),
                categoria_id INT REFERENCES categorias(id),
                youtube_id VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        
        // Crear índices
        await pool.query(`CREATE INDEX IF NOT EXISTS idx_usuarios_email ON usuarios(email);`);
        await pool.query(`CREATE INDEX IF NOT EXISTS idx_productos_categoria ON productos(categoria_id);`);
        
        console.log("✅ Base de datos lista");
    } catch (error) {
        console.error("⚠️ Error inicializando BD:", error.message);
    }
};

// Inicializar BD antes de escuchar
initDatabase().then(() => {
    // Rutas API
    app.use('/api/productos', productoRoutes);
    app.use('/api/auth', authRoutes);

    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
});