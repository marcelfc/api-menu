import CreateAppointmentService from './CreateAppointmentService'
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository'

describe('CreateAppointment', () => {
    it('should be able to create a new appointment', async () => {
        const fakeAppointmentsRepository = new FakeAppointmentsRepository()
        const createAppointmentService = new CreateAppointmentService(fakeAppointmentsRepository)

        const appointment = await createAppointmentService.execute({
            date: new Date(),
            provider_id: '123454321234'
        })

        expect(appointment).toHaveProperty('id')
        expect(appointment.provider_id).toBe('123454321234')
    })

    // it('should not be able to create two appointments on the same time', () => {

    // })
})
