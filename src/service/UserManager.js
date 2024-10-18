import userModel from '../models/user.model.js'

export default class UserManager {
    constructor() {
        this.model = userModel
    }

    async createUser(user) {
        try {
            const newUser = await userModel.create(user)
            return newUser
        } catch (error) {
            console.error('Error al crear el usuario')
        }
    }

    async getUser(email) {
        try {
            const user = await userModel.findOne(email)
            return user
        } catch (error) {
            console.error('Error al encontrar el usuario')
        }
    }
}