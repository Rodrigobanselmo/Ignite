import { uploadConfig } from '@config/upload';
import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import { ListAvailablesCarsController } from '@modules/cars/useCases/listAvailablesCars/ListAvailablesCarsController';
import { ListCarsController } from '@modules/cars/useCases/listCars/ListCarsController';
import { UploadCarImagesController } from '@modules/cars/useCases/uploadCarImages/UploadCarImagesController';
import { Router } from 'express';
import multer from 'multer';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const upload = multer(uploadConfig.upload('car_images', undefined, true));

const carsRoutes = Router();
const createCarController = new CreateCarController();
const listCarsController = new ListCarsController();
const createCarSpecification = new CreateCarSpecificationController();
const listAvailablesCarsController = new ListAvailablesCarsController();
const uploadCarImagesController = new UploadCarImagesController();

carsRoutes.get('/availables', listAvailablesCarsController.handle);

carsRoutes.use(ensureAuthenticated);
carsRoutes.use(ensureAdmin);

carsRoutes.get('/', listCarsController.handle);
carsRoutes.post('/', createCarController.handle);
carsRoutes.patch('/specifications/:id', createCarSpecification.handle);
carsRoutes.patch(
  '/images/:id',
  upload.array('images'),
  uploadCarImagesController.handle,
);

export { carsRoutes };
