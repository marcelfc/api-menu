import { Request, Response } from 'express'
import CreateUserService from '@modules/users/services/CreateUserService'
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository'

export default class UsersController {
    public async create(request: Request, response: Response): Promise<Response> {
        const usersRepository = new UsersRepository()
        const { name, email, password } = request.body
        const createUser = new CreateUserService(usersRepository)
        const user = await createUser.execute({ name, email, password })
        return response.json(user)
    }
}
