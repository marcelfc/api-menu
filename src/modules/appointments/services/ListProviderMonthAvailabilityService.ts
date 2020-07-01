import User from '@modules/users/infra/typeorm/entities/user'
import AppointmentsRepository from '../infra/typeorm/repositories/AppointmentsRepository'

interface Request {
    provider_id: string;
    month: number;
    year: number;
}

type IResponse = Array<{
    day: number;
    available: boolean;
}>

class ListProviderMonthAvailabilityService {

    constructor(
        private appointmentsRepository: AppointmentsRepository
    ) { }

    public async execute({ provider_id, month, year }: Request): Promise<IResponse> {
        const appointments = await this.appointmentsRepository
            .findAllInMonthFromProvider(
                { provider_id, month, year }
            )
    }
}

export default ListProviderMonthAvailabilityService
