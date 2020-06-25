
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import AppError from '@shared/errors/AppError'
import CreateUserService from './CreateUserService'

describe('CreateUser', () => {
    it('should be able to create a new user', async () => {
        const fakeUsersRepository = new FakeUsersRepository()
        const createUserService = new CreateUserService(fakeUsersRepository)

        const user = await createUserService.execute({
            name: 'Marcel Cordeiro',
            email: 'marcel@teste.com',
            password: '12345'
        })

        expect(user).toHaveProperty('id')
    })

    it('should not be able to create a new user with same email from another', async () => {
        const fakeUsersRepository = new FakeUsersRepository()
        const createUserService = new CreateUserService(fakeUsersRepository)

        await createUserService.execute({
            name: 'Marcel Cordeiro',
            email: 'marcel@teste.com',
            password: '12345'
        })

        expect(
            createUserService.execute({
                name: 'Marcel Cordeiro',
                email: 'marcel@teste.com',
                password: '12345'
            })
        ).rejects.toBeInstanceOf(AppError)
    })

})
