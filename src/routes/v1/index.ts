import { Router} from 'express'

import usersRoutes from './users.routes'
import orgsRoutes from './organizations.routes'
import postsRoutes from './posts.routes'
const router = Router();

router.use("/users", usersRoutes)
router.use("/organizations", orgsRoutes)
router.use("/posts", postsRoutes)

export default router;