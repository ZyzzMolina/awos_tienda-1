const { Pool } = require('pg');
require('dotenv').config();

let pool;

// Si estamos en Render, usar DATABASE_URL; si no, usar variables individuales
if (process.env.DATABASE_URL) {
    // En Render, usar la URL de conexión completa
    pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    });
    console.log("📡 Conectando a BD remota (Render)");
} else {
    // En desarrollo local
    pool = new Pool({
       connectionString: process.env.DATABASE_URL
    });
    console.log("🖥️ Conectando a BD local");
}

module.exports = pool;