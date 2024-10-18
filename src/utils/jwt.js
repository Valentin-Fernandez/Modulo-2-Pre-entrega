import jwt from 'jsonwebtoken'

// Palabra secreta, debe ir en .env
export const PRIVATE_KEY = 'PrivateCode@CoderhousePreEntrega'

export const generarToken = (user) => jwt.sign({_id: user._id, email: user.email}, PRIVATE_KEY, {expiresIn: '1d'})


