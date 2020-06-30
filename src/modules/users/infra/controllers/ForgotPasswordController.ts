import { Request, Response } from 'express'
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository'

import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService'
import MailProvider from '@shared/container/providers/MailProvider/implementations/MailProvider'
import UsersTokenRepository from '../typeorm/repositories/UsersTokenRepository'

export default class ForgotPasswordController {
    public async create(request: Request, response: Response): Promise<Response> {
        const usersRepository = new UsersRepository()
        const mailProvider = new MailProvider()
        const usersTokenRepository = new UsersTokenRepository()
        const { email, password } = request.body

        const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
            usersRepository,
            mailProvider,
            usersTokenRepository
        )

        await sendForgotPasswordEmail.execute({
            email
        })

        return response.status(204).json()
    }
}
