import { Router } from 'express'
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import ProvidersController from '../controllers/ProvidersController'

const providersRouter = Router()
const providersControlller = new ProvidersController()

providersRouter.use(ensureAuthenticated)

// appointmentsRouter.get('/', async (request, response) => {
//     const appointmentsRepository = getCustomRepository(AppointmentsRepository)
//     const appointments = await appointmentsRepository.find()
//     return response.json(appointments)

// })

providersRouter.get('/', providersControlller.index)

export default providersRouter
