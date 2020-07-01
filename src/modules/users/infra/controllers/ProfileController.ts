import { Request, Response } from 'express'
import UpdateProfileService from '@modules/users/services/UpdateProfileService'
import ShowProfileService from '@modules/users/services/ShowProfileService'
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository'

export default class ProfileController {

    public async show(request: Request, response: Response): Promise<Response> {
        const user_id = request.user.id
        const usersRepository = new UsersRepository()
        const showUser = new ShowProfileService(usersRepository)
        const user = await showUser.execute({
            user_id
        })
        return response.json(user)
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const user_id = request.user.id
        const usersRepository = new UsersRepository()
        const { name, email, old_password, password } = request.body
        const createUser = new UpdateProfileService(usersRepository)
        const user = await createUser.execute({
            user_id, name, email, password, old_password
        })
        return response.json(user)
    }
}
