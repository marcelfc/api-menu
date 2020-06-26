import UsersToken from '../infra/typeorm/entities/UserToken'

export default interface IUsersTokenRepository {
    generate(user_id: string): Promise<UsersToken>
}
