import { Router } from "express";

import { authenticateRoutes } from "./authenticate.routes";
import { carsRoutes } from "./cars.routes";
import { categoriesRoutes } from "./categories.routes";
import { rentalsRoutes } from "./rentals.routes";
import { specificationsRoutes } from "./specifications.routes";
import { usersRoutes } from "./user.routes";

const router = Router();

router.use(authenticateRoutes);
router.use("/users", usersRoutes);

router.use("/cars", carsRoutes);
router.use("/categories", categoriesRoutes);
router.use("/rentals", rentalsRoutes);
router.use("/specifications", specificationsRoutes);

export { router };
