import {Router} from "express"
import auth from "./authRoutes.js"
import chatRoutes from "./chatRoutes.js"
const router = Router()


router.use("/auth", auth)
router.use("/chat", chatRoutes)

export default router