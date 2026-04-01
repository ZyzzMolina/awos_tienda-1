const { Pool } = require('pg');

// URL de conexión completa desde Render (External Database URL)
const connectionString = 'postgresql://zyzz_molina06:mzJ4jwqzfISiNd9iF140r3Ch3AYQfKOQ@dpg-d764rveslomo73f7m8a0-a.onrender.com:5432/awos_tienda_pg1';

const pool = new Pool({
    connectionString: connectionString,
    ssl: { rejectUnauthorized: false }
});

const initDB = async () => {
    try {
        console.log("⏳ Conectando a BD Render...");
        
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
        console.log("✅ Tabla usuarios creada");

        // Crear tabla categorías
        await pool.query(`
            CREATE TABLE IF NOT EXISTS categorias (
                id SERIAL PRIMARY KEY,
                nombre VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log("✅ Tabla categorias creada");

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
        console.log("✅ Tabla productos creada");

        // Crear índices
        await pool.query(`CREATE INDEX IF NOT EXISTS idx_usuarios_email ON usuarios(email);`);
        await pool.query(`CREATE INDEX IF NOT EXISTS idx_productos_categoria ON productos(categoria_id);`);
        console.log("✅ Índices creados");

        console.log("🎉 ¡Base de datos inicializada correctamente!");
        
        await pool.end();
        process.exit(0);
    } catch (error) {
        console.error("❌ Error capturado completo:");
        console.error(error);
        await pool.end();
        process.exit(1);
    }
};

initDB();
