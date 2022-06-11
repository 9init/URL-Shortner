import express from "express"
import passport from "passport"
import bodyParser from "body-parser"
import session from "express-session"

const router = express.Router()
router.use(bodyParser.json())
router.use(session({
    secret: "any key",
    resave: false,
    saveUninitialized: true
}))
router.use(passport.initialize())
router.use(passport.session())

// This middleware make sure that the user is authenticated
function requireAuth(req: express.Request, res: express.Response, next: express.NextFunction){
    req.isAuthenticated() ? next() : res.send("You are not logged in")
}

// import handlers
import {loginHandler, registerHandler, homeHandler} from "./passport"

router.post("/login", loginHandler)
router.post("/register", registerHandler)
router.get("/home", requireAuth, homeHandler)

export { router, requireAuth }