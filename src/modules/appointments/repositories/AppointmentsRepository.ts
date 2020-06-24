import Appointment from '@modules/appointments/infra/typeorm/entities/appointment'

import { EntityRepository, Repository } from 'typeorm'

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {

    public async findByDate(date: Date): Promise<Appointment | null> {
        const findAppointment = await this.findOne({
            where: { date }
        })

        return findAppointment || null
    }

}

export default AppointmentsRepository