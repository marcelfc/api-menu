import User from '../infra/typeorm/entities/user'
import AppError from '@shared/errors/AppError'
import UsersRepository from '../infra/typeorm/repositories/UsersRepository'
import IEmailProvider from '@shared/container/providers/MailProvider/models/IMailProvider'
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider'
import IUsersTokenRepository from '../repositories/IUsersTokenRepository'

interface Request {
    email: string;
}

class SendForgotPasswordEmailService {

    constructor(
        private usersRepository: UsersRepository,
        private mailProvider: IMailProvider,
        private usersTokenRepository: IUsersTokenRepository
    ) { }

    public async execute({ email }: Request): Promise<void> {

        const user = await this.usersRepository.findByEmail(email)

        if(!user){
            throw new AppError('User does not exists.')
        }

        await this.usersTokenRepository.generate(user.id)

        this.mailProvider.sendMail(email, 'Pedido de recuperação de senha')
    }
}

export default SendForgotPasswordEmailService
