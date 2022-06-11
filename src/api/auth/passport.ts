import bcrypt from "bcryptjs"
import mongoose from "mongoose"
import express from "express"
import passport from "passport"
import {Strategy as CustomStrategy} from "passport-custom"
import * as User from "../../db/dal/User"
import { UserOuput, UserInput } from "../../db/models/User"
import { registerSchema } from "./helper"

passport.use("stateless", new CustomStrategy(async (req, done)=>{
    // get the email and password that being sent by the client side
    let { email, password } = req.body
    // fetch data from database
    try {
        let user = await User.findByEmail(email)
        if (!user) return done({ message: "Incorrect information." }) // return custom error message

        // if the both condition doesn't executed then the user was found
        // lets validate
        let success: boolean = await bcrypt.compare(password, user.password)
        if (!success) return done({ message: "Incorrect information." }) // return custom error message again
            return done(null, user) // Correct information
    } catch (error) {
        if (error) return done(error) // return error message
    }

}))

passport.serializeUser<UserOuput>((user: any, done: (err: any, id: any) => void)=>{
    done(null, user.username)
})

passport.deserializeUser((username: string, done)=>{
    User.findByUsername(username).then((user)=>{
        done(null, user)
    }).catch((err)=> done(err, null))
})

async function registerHandler(req: express.Request, res: express.Response) {
    // you should validate them but I won't do this here
    let { fullname, email, username, password } = req.body
    let v = registerSchema.validate({ fullname, email, username, password })
    if(v.error) return res.status(403).json({error: v.error})

    // Check if email or username already used
    let exist = await User.findByEmail(email)
    if (exist) return res.status(403).send("Email already used.")
    exist = await User.findByUsername(username)
    if (exist) return res.status(403).send("Username already used.")
    
    // generate hashed password
    let salt = await bcrypt.genSalt(10)
    let hash = await bcrypt.hash(password, salt)

    // create user model
    let newUser: UserInput = {
        username,
        email,
        password: hash,
        fullname: fullname.replace("-", " ").trim(),
    }

    User.create(newUser).then((user)=>{
        res.send("Registered successfully.")
    }).catch((err)=>{
        res.status(500).send("Internal server error")
    })
}

function homeHandler(req: express.Request, res: express.Response) {
    if(req.isAuthenticated()) res.send("Welcome🤗")
    else res.send("You are not logged in")    
}

const loginHandler = passport.authenticate("stateless", {failureMessage: true, successRedirect: "/home"})

export {
    registerHandler,
    loginHandler,
    homeHandler
}