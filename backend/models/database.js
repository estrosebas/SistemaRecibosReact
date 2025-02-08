const sqlite3 = require('sqlite3').verbose()

// Crear conexión con la base de datos
const db = new sqlite3.Database('./sistema_recibos.db', (err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err.message)
  } else {
    console.log('Conectado a la base de datos SQLite')
  }
})

module.exports = db
