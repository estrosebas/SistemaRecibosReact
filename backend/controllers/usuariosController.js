const db = require('../models/database')

// Crear un nuevo usuario
const createUsuario = (req, res) => {
  const {
    Categoria,
    Usuario_Propietario,
    DNI,
    Instalacion,
    Numero,
    Ultimo_Pago,
    Fecha_Corte,
    Otra_Informacion,
    Observaciones
  } = req.body
  const query = `
        INSERT INTO usuarios (Categoria, Usuario_Propietario, DNI, Instalacion, Numero, Ultimo_Pago, Fecha_Corte, Otra_Informacion, Observaciones)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `
  db.run(
    query,
    [
      Categoria,
      Usuario_Propietario,
      DNI,
      Instalacion,
      Numero,
      Ultimo_Pago,
      Fecha_Corte,
      Otra_Informacion,
      Observaciones
    ],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message })
      }
      res.status(201).json({ id: this.lastID })
    }
  )
}

// Obtener todos los usuarios
const getUsuarios = (req, res) => {
  const query = 'SELECT * FROM usuarios'
  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message })
    }
    res.json(rows)
  })
}

// Obtener un usuario por su ID
const getUsuarioById = (req, res) => {
  const { id } = req.params
  const query = 'SELECT * FROM usuarios WHERE CODIGO = ?'
  db.get(query, [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message })
    }
    if (row) {
      res.json(row)
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' })
    }
  })
}

// Actualizar un usuario
const updateUsuario = (req, res) => {
  const { id } = req.params
  const {
    Categoria,
    Usuario_Propietario,
    DNI,
    Instalacion,
    Numero,
    Ultimo_Pago,
    Fecha_Corte,
    Otra_Informacion,
    Observaciones
  } = req.body
  const query = `
        UPDATE usuarios SET Categoria = ?, Usuario_Propietario = ?, DNI = ?, Instalacion = ?, Numero = ?, Ultimo_Pago = ?, Fecha_Corte = ?, Otra_Informacion = ?, Observaciones = ?
        WHERE CODIGO = ?
    `
  db.run(
    query,
    [
      Categoria,
      Usuario_Propietario,
      DNI,
      Instalacion,
      Numero,
      Ultimo_Pago,
      Fecha_Corte,
      Otra_Informacion,
      Observaciones,
      id
    ],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message })
      }
      if (this.changes > 0) {
        res.json({ message: 'Usuario actualizado' })
      } else {
        res.status(404).json({ message: 'Usuario no encontrado' })
      }
    }
  )
}

// Eliminar un usuario
const deleteUsuario = (req, res) => {
  const { id } = req.params
  const query = 'DELETE FROM usuarios WHERE CODIGO = ?'
  db.run(query, [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message })
    }
    if (this.changes > 0) {
      res.json({ message: 'Usuario eliminado' })
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' })
    }
  })
}

module.exports = { createUsuario, getUsuarios, getUsuarioById, updateUsuario, deleteUsuario }
