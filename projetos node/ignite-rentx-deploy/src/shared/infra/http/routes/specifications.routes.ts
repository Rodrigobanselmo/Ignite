import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/CreateSpecificationController';
import { ListSpecificationsController } from '@modules/cars/useCases/listSpecifications/ListSpecificationController';
import { Router } from 'express';

import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

import { ensureAdmin } from '../middlewares/ensureAdmin';

const specificationsRoutes = Router();

const listSpecificationsController = new ListSpecificationsController();
specificationsRoutes.get('/', listSpecificationsController.handle);

specificationsRoutes.use(ensureAuthenticated);
specificationsRoutes.use(ensureAdmin);

const createSpecificationController = new CreateSpecificationController();
specificationsRoutes.post('/', createSpecificationController.handle);

export { specificationsRoutes };
