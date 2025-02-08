const express = require('express')
const app = express()
const usuariosRoutes = require('./routes/usuariosRoutes')
const recibosRoutes = require('./routes/recibosRoutes')

app.use(express.json())

app.use('/api/usuarios', usuariosRoutes)
app.use('/api/recibos', recibosRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`)
})
