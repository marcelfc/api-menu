import User from '@modules/users/infra/typeorm/entities/user'
import AppError from '@shared/errors/AppError'
import IUsersRepository from '../repositories/IUsersRepository'

interface Request {
    user_id: string;
}

class ShowProfileService {

    constructor(
        private usersRepository: IUsersRepository
    ) { }

    public async execute({ user_id, }: Request): Promise<User> {
        const user = await this.usersRepository.findById(user_id)

        if (!user) {
            throw new AppError('User not found!')
        }

        delete user.password

        return user

    }
}

export default ShowProfileService
