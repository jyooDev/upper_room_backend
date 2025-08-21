import { Router} from 'express'

import usersRoutes from './users.routes'
import orgsRoutes from './organizations.routes'
import postsRoutes from './posts.routes'
import commentRoutes from './comments.routes'

const router = Router();

router.use("/users", usersRoutes)
router.use("/organizations", orgsRoutes)
router.use("/posts", postsRoutes)
router.use("/comments", commentRoutes);


export default router;