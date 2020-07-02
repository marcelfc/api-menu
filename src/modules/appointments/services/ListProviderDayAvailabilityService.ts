import { getHours, isAfter } from 'date-fns'
import AppointmentsRepository from '../infra/typeorm/repositories/AppointmentsRepository'

interface Request {
    provider_id: string;
    month: number;
    year: number;
    day: number;
}

type IResponse = Array<{
    hour: number;
    available: boolean;
}>

class ListProviderDayAvailabilityService {

    constructor(
        private appointmentsRepository: AppointmentsRepository
    ) { }

    public async execute({ provider_id, month, year, day }: Request): Promise<IResponse> {
        const appointments = await this.appointmentsRepository.findAllInDayFromProvider({
            provider_id,
            month,
            year,
            day
        })

        const hourStart = 8
        const eachHourArray = Array.from({length: 10}, (_, index) => index + hourStart)
        const currentDate = new Date(Date.now())

        const availability = eachHourArray.map(hour => {

            const hasAppointmentInHour = appointments.find(appointment => {
                return getHours(appointment.date) === hour
            })

            const compareDate = new Date(year, month - 1, day, hour)

            return {
                hour,
                available: !hasAppointmentInHour && isAfter(compareDate, currentDate)
            }
        })

        return availability
    }
}

export default ListProviderDayAvailabilityService
