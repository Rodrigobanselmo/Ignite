import { Router } from 'express';

import { authenticateRoutes } from './authenticate.routes';
import { carsRoutes } from './cars.routes';
import { categoriesRoutes } from './categories.routes';
import { passwordRoutes } from './password.routes';
import { pdfRoutes } from './pdf.routes';
import { rentalsRoutes } from './rentals.routes';
import { specificationsRoutes } from './specifications.routes';
import { usersRoutes } from './users.routes';
import { vimeoRoutes } from './vimeo.routes';

const router = Router();

router.use('/vimeo', vimeoRoutes);
router.use('/pdf', pdfRoutes);

router.use('/cars', carsRoutes);
router.use('/categories', categoriesRoutes);
router.use('/specifications', specificationsRoutes);
router.use('/users', usersRoutes);
router.use('/sessions', authenticateRoutes);
router.use('/rentals', rentalsRoutes);
router.use('/password', passwordRoutes);

export { router };
