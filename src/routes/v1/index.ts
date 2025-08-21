import { Router} from 'express'

import usersRoutes from './users.routes'
import orgsRoutes from './organizations.routes'

const router = Router();

router.use("/users", usersRoutes)
router.use("/organizations", orgsRoutes)
export default router;