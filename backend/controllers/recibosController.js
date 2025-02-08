const db = require('../models/database')

// Crear un nuevo recibo
const createRecibo = (req, res) => {
  const {
    RecAño,
    NIF,
    Operador,
    Categoria,
    UsuarioPropietario,
    DNI,
    Direccion,
    Nro_dir,
    PeriodoMes,
    PeriodoAño,
    FechaEmision,
    FechaVencimiento,
    idRecibo
  } = req.body
  const query = `
        INSERT INTO recibos (Rec_Año, NIF, Operador, Categoria, Usuario_Propietario, DNI, Direccion, Nro_dir, PeriodoMes, PeriodoAño, Fecha_Emision, Fecha_Vencimiento, idRecibo)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `
  db.run(
    query,
    [
      RecAño,
      NIF,
      Operador,
      Categoria,
      UsuarioPropietario,
      DNI,
      Direccion,
      Nro_dir,
      PeriodoMes,
      PeriodoAño,
      FechaEmision,
      FechaVencimiento,
      idRecibo
    ],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message })
      }
      res.status(201).json({ id: this.lastID })
    }
  )
}

// Obtener todos los recibos
const getRecibos = (req, res) => {
  const query = 'SELECT * FROM recibos'
  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message })
    }
    res.json(rows)
  })
}

// Obtener un recibo por su ID
const getReciboById = (req, res) => {
  const { id } = req.params
  console.log('idRecibo recibido: ', id)

  const query = `
      SELECT 
        r.*, 
        p.idpago, 
        p.Tipo, 
        p.Fecha
      FROM recibos r
      LEFT JOIN pagos p ON r.idRecibo = p.idRecibo
      WHERE r.idRecibo = ?
    `

  db.all(query, [id], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message })
    }

    if (rows.length > 0) {
      const recibo = {
        ...rows[0],
        pagos: rows.map((row) => ({
          idpago: row.idpago,
          Tipo: row.Tipo,
          Fecha: row.Fecha
        }))
      }
      res.json(recibo)
    } else {
      res.status(404).json({ message: 'Recibo no encontrado' })
    }
  })
}

// Eliminar un recibo y sus pagos
const deleteRecibo = (req, res) => {
  const { id } = req.params

  // Primero, eliminamos los pagos asociados al recibo
  const deletePaymentsQuery = 'DELETE FROM pagos WHERE idRecibo = ?'
  db.run(deletePaymentsQuery, [id], (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error al eliminar los pagos: ' + err.message })
    }

    // Luego, eliminamos el recibo
    const deleteReceiptQuery = 'DELETE FROM recibos WHERE Recibo_numero = ?'
    db.run(deleteReceiptQuery, [id], function (err) {
      if (err) {
        return res.status(500).json({ error: 'Error al eliminar el recibo: ' + err.message })
      }
      if (this.changes > 0) {
        res.json({ message: 'Recibo y pagos eliminados' })
      } else {
        res.status(404).json({ message: 'Recibo no encontrado' })
      }
    })
  })
}

module.exports = { createRecibo, getRecibos, getReciboById, deleteRecibo }
