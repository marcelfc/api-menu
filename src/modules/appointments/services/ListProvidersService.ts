import User from '@modules/users/infra/typeorm/entities/user'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'

interface Request {
    user_id: string;
}

class ListProvidersService {

    constructor(
        private usersRepository: IUsersRepository
    ) { }

    public async execute({ user_id, }: Request): Promise<User[]> {
        const users = await this.usersRepository.findAllProviders(user_id)
        return users
    }
}

export default ListProvidersService
