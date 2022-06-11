import express from "express"
import bodyParser from "body-parser"


/****** Setting up the express app ******/
const router = express.Router()

// Required Middleware
router.use(express.static(__dirname + "/public"))
router.use(bodyParser.urlencoded({ extended: true })) // Accept url encoded body
router.use(bodyParser.json()) // Accept json body

// Using predefined routes
import { urlShortneRouter } from "./url-shortner-handler"
import { router as authRouter} from "../auth/index"

router.use(authRouter)
router.use(urlShortneRouter)

export default router