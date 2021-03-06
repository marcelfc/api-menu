import { getDaysInMonth, getDate } from 'date-fns'
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

        const numberOfDaysInMonth = getDaysInMonth(
            new Date(year, month-1)
        )

        const eachDayArray = Array.from(
            { length: numberOfDaysInMonth },
            (value, index) => index + 1
        )

        const availability = eachDayArray.map(day => {
            const appointmentsInDay = appointments.filter(appointment => {
                return getDate(appointment.date) === day
            })

            return {
                day,
                available: appointmentsInDay.length < 10
            }
        })

        return availability
    }
}

export default ListProviderMonthAvailabilityService
