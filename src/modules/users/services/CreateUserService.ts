import { hash } from 'bcryptjs'

import User from '../infra/typeorm/entities/user'
import AppError from '@shared/errors/AppError'
import IUsersRepository from '../repositories/IUsersRepository'

interface Request {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {

    constructor(
        private usersRepository: IUsersRepository
    ){ }

    public async execute({ name, email, password }: Request): Promise<User> {

        const checkUserExists = await this.usersRepository.findByEmail(email)

        if(checkUserExists){
            throw new AppError('E-mail address alredy used.')
        }

        const hashedPassword = await hash(password, 8)

        const user = await this.usersRepository.create({
            name,
            email,
            password: hashedPassword
        })

        delete user.password

        return user
    }
}

export default CreateUserService
