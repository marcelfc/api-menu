import User from '../infra/typeorm/entities/user'
import ICreateUserDTO from '../dtos/ICreateUserDTO'

export default interface IUsersRepository {
    findAllProviders(except_user_id?: string): Promise<User[]>
    findById(id: string): Promise<User | undefined>
    findByEmail(email: string): Promise<User | undefined>
    create(data: ICreateUserDTO): Promise<User>
    save(user: User): Promise<User>
}
