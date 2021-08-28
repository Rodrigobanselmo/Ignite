import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController';
import { DevolutionRentalController } from '@modules/rentals/useCases/devolutionRental/DevolutionRentalController';
import { ListRentalsByUserController } from '@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController';
import { Router } from 'express';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const rentalsRoutes = Router();
const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();
rentalsRoutes.use(ensureAuthenticated);

rentalsRoutes.post('/', createRentalController.handle);
rentalsRoutes.get('/me', listRentalsByUserController.handle);
rentalsRoutes.use(ensureAdmin);

rentalsRoutes.post('/devolution/:id', devolutionRentalController.handle);

export { rentalsRoutes };
