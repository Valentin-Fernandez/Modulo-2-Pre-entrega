import { Router } from "express";
import UserManager from '../service/UserManager.js'
import { createHash, isValidPassword } from "../utils/bcrypt.js";
import { generarToken } from "../utils/jwt.js";
import passport from "passport";

const router = Router()
const userManager = new UserManager()

router.post('/register', async(req, res) => {
    try {
        const {first_name, last_name, email, age, password} = req.body
        if (!first_name || !email || !password) return res.send({status:'error', error:'completa todos los campos'})
        
        const userFound = await userManager.getUser({email})
        if(userFound) return res.send({status: 'error', error:'El usuario ya existe con ese email'})
        
        const newUser = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password)
        }
        const result = await userManager.createUser(newUser)
        res.send({status: 'success', message:'Usuario creado con exito'})
    } catch (error) {
        console.error('Error del servidor')
    }
})

router.post('/login', async(req, res) => {
    try {
        const {email, password} = req.body
        if(!email || !password) return res.send('Faltan campos')
        
        const userFound = await userManager.getUser({email})
        if(!userFound) return res.send({status:'error', error:'No existe el usuario con ese email'})

        // Validar password
        if(!isValidPassword(password, userFound)) return res.send({status:'error', error:'credenciales incorrectas'})
        // Token
        const token = generarToken(userFound)
        res.cookie('token', token, {maxAge: 60*60*1000, httpOnly: true}).send({status:'success', message:'Logueado correctamente'})

    } catch (error) {
        console.error('Error del servidor', error)
    }
})

router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.send({dataUser: req.user, message:'Datos sensibles'})
})

export default router