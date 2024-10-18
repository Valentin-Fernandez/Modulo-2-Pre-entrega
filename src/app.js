import express from 'express'
import __dirname from './dirname.js'
import cookieParser from 'cookie-parser'
import handlebars from 'express-handlebars'
import passport from 'passport'
import moongose from 'mongoose'
import viewsRouter from './routes/views.router.js'
import sessionRouter from './routes/sessions.router.js'
import initializePassport from './config/passport.config.js'

const app = express()
const PORT = 8080

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
initializePassport()
app.use(passport.initialize())

// HBs
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views/')
app.set('view engine', 'handlebars')

// Vistas
app.use('/', viewsRouter)
app.use('/api/sessions', sessionRouter)

// Conexion a DB
const urlDB = 'mongodb://localhost:27017/coderhouse'
async function connectDB () {
    try {
        await moongose.connect(urlDB)
        console.log('Conexion exitosa a la DB')
    } catch (error) {
        console.error(error)
    }
}
connectDB()

app.listen(PORT, () => {
    console.log(`Run server: http://localhost:${PORT}`)
})