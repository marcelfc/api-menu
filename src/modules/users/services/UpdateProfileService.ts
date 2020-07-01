import User from '@modules/users/infra/typeorm/entities/user'
import { hash, compare } from 'bcryptjs'
import AppError from '@shared/errors/AppError'
import IUsersRepository from '../repositories/IUsersRepository'

interface Request {
    user_id: string;
    name: string;
    email: string;
    old_password?: string;
    password?: string;
}

class UpdateProfileService {

    constructor(
        private usersRepository: IUsersRepository
    ) { }

    public async execute({ user_id, name, email, password, old_password }: Request): Promise<User> {
        const user = await this.usersRepository.findById(user_id)

        if (!user) {
            throw new AppError('User not found!')
        }

        const userWithUpdatedEmail = await this.usersRepository.findByEmail(email)

        if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user_id) {
            throw new AppError('E-mail alredy in use!')
        }

        user.name = name
        user.email = email

        if(password && !old_password){
            throw new AppError('You need to inform the old password to set a new password')
        }

        if (password && old_password) {

            const checkOldPassword = await compare(old_password, user.password)

            if(!checkOldPassword){
                throw new AppError('Old password does not match.')
            }

            user.password = await hash(password, 8)
        }

        await this.usersRepository.save(user)

        delete user.password

        return user

    }
}

export default UpdateProfileService
