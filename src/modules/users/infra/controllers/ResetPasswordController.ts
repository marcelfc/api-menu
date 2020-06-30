import { Request, Response } from 'express'
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository'
import ResetPasswordService from '@modules/users/services/ResetPasswordService'
import UsersTokenRepository from '../typeorm/repositories/UsersTokenRepository'

export default class ResetPasswordController {
    public async create(request: Request, response: Response): Promise<Response> {
        const usersRepository = new UsersRepository()
        const usersTokenRepository = new UsersTokenRepository()
        const { token, password } = request.body

        const resetPassword = new ResetPasswordService(
            usersRepository,
            usersTokenRepository
        )

        await resetPassword.execute({
            token,
            password
        })

        return response.status(204).json()
    }
}
