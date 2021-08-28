import { TestConnectionController } from '@modules/vimeo/useCases/TestConnection/TestConnectionController';
import { Router } from 'express';
// import multer from 'multer';

// import { ensureAdmin } from '../middlewares/ensureAdmin';
// import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const vimeoRoutes = Router();

// const upload = multer({
//   dest: './tmp',
// });

const testConnectionController = new TestConnectionController();
vimeoRoutes.get('/', testConnectionController.handle);

// vimeoRoutes.use(ensureAuthenticated);
// vimeoRoutes.use(ensureAdmin);

// const createCategoryController = new CreateCategoryController();
// vimeoRoutes.post('/', createCategoryController.handle);

// const importCategoriesController = new ImportCategoriesController();
// vimeoRoutes.post(
//   '/import',
//   upload.single('file'),
//   importCategoriesController.handle,
// );

export { vimeoRoutes };
