import { Request, Response } from 'express'
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService'
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository'

export default class SessionsController {
    public async create(request: Request, response: Response): Promise<Response> {
        const usersRepository = new UsersRepository()
        const { email, password } = request.body

        const authenticateUserService = new AuthenticateUserService(usersRepository)

        const { user, token } = await authenticateUserService.execute({
            email,
            password
        })

        delete user.password

        return response.json({ user, token })
    }
}
