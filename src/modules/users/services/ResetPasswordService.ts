import AppError from '@shared/errors/AppError'
import UsersRepository from '../infra/typeorm/repositories/UsersRepository'
import IUsersTokenRepository from '../repositories/IUsersTokenRepository'
import { hash } from 'bcryptjs'
import { isAfter, addHours } from 'date-fns'

interface Request {
    token: string;
    password: string;
}

class ResetPasswordService {

    constructor(
        private usersRepository: UsersRepository,
        private usersTokenRepository: IUsersTokenRepository
    ) { }

    public async execute({ token, password }: Request): Promise<void> {
        const userToken = await this.usersTokenRepository.findByToken(token)

        if(!userToken){
            throw new AppError('User token does not exists')
        }

        const user = await this.usersRepository.findById(userToken.user_id)

        if(!user){
            throw new AppError('User does not exists')
        }

        const tokenCreateAt = userToken.created_at
        const compareDate = addHours(tokenCreateAt, 2)
        if(isAfter(Date.now(), compareDate)){
            throw new AppError('Token expired')
        }

        const hashedPassword = await hash(password, 8)

        user.password = hashedPassword

        await this.usersRepository.save(user)

    }
}

export default ResetPasswordService
