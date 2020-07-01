import AppError from '@shared/errors/AppError'
import IUsersRepository from '../repositories/IUsersRepository'
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider'
import IUsersTokenRepository from '../repositories/IUsersTokenRepository'
import EtherealMailProvider from '@shared/container/providers/MailProvider/implementations/EtherealMailProvider'

interface Request {
    email: string;
}

class SendForgotPasswordEmailService {

    constructor(
        private usersRepository: IUsersRepository,
        private mailProvider: IMailProvider,
        private usersTokenRepository: IUsersTokenRepository
    ) { }

    public async execute({ email }: Request): Promise<void> {

        const user = await this.usersRepository.findByEmail(email)

        if(!user){
            throw new AppError('User does not exists.')
        }

        await this.usersTokenRepository.generate(user.id)

        const teste = new EtherealMailProvider()

        console.log(teste)

        await this.mailProvider.sendMail(email, 'Pedido de recuperação de senha')
    }
}

export default SendForgotPasswordEmailService
