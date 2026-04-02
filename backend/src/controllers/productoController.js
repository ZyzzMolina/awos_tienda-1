const pool = require('../config/db');

// Función para limpiar y validar YouTube ID
const limpiarYoutubeId = (input) => {
    if (!input) return null;
    
    let id = input.trim();
    
    // Extraer ID de URLs completas
    const urlMatch = id.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
    if (urlMatch && urlMatch[1]) {
        id = urlMatch[1];
    }
    
    // Validar que sea un ID válido (11 caracteres: alfanuméricos, guiones, guiones bajos)
    if (/^[a-zA-Z0-9_-]{11}$/.test(id)) {
        return id;
    }
    
    // Si no es válido, devolver null
    return null;
};

const getProductos = async (req, res) => {
    try {
        const query = `SELECT * FROM productos ORDER BY id ASC`;
        const response = await pool.query(query);
        res.json(response.rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al listar productos' });
    }
};

const crearProducto = async (req, res) => {
    const { nombre, precio, stock, descripcion, imagen_url, id_categoria, youtube_id } = req.body;

    try {
        if (!nombre || !precio || !id_categoria) {
            return res.status(400).json({ msg: "Nombre, precio y categoría son obligatorios" });
        }

        // Limpiar y validar youtube_id
        const youtubeIdLimpio = limpiarYoutubeId(youtube_id);

        const query = `
            INSERT INTO productos (nombre, precio, stock, descripcion, imagen_url, id_categoria, youtube_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *
        `;

        const response = await pool.query(query, [
            nombre, precio, stock || 0, descripcion || '', imagen_url || '', id_categoria, youtubeIdLimpio
        ]);

        res.status(201).json({
            msg: "Producto creado con éxito",
            producto: response.rows[0]
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el producto' });
    }
};

module.exports = { getProductos, crearProducto };