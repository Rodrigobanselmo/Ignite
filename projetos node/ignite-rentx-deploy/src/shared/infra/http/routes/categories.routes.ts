import { CreateCategoryController } from '@modules/cars/useCases/createCategory/CreateCategoryController';
import { ImportCategoriesController } from '@modules/cars/useCases/importCategories/ImportCategoriesController';
import { ListCategoriesController } from '@modules/cars/useCases/listCategories/ListCategoriesController';
import { Router } from 'express';
import multer from 'multer';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const categoriesRoutes = Router();

const upload = multer({
  dest: './tmp',
});

const listCategoryController = new ListCategoriesController();
categoriesRoutes.get('/', listCategoryController.handle);

categoriesRoutes.use(ensureAuthenticated);
categoriesRoutes.use(ensureAdmin);

const createCategoryController = new CreateCategoryController();
categoriesRoutes.post('/', createCategoryController.handle);

const importCategoriesController = new ImportCategoriesController();
categoriesRoutes.post(
  '/import',
  upload.single('file'),
  importCategoriesController.handle,
);

export { categoriesRoutes };
