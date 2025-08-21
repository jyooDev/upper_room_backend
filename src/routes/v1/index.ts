import { Router} from 'express'

import usersRoutes from './users.routes'
import orgsRoutes from './organizations.routes'
import postsRoutes from './posts.routes'
import commentsRoutes from './comments.routes'
import sermonsRoutes from './sermons.routes'
const router = Router();

router.use("/users", usersRoutes)
router.use("/organizations", orgsRoutes)
router.use("/posts", postsRoutes)
router.use("/comments", commentsRoutes);
router.use("/sermons", sermonsRoutes);

export default router;