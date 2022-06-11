import express from 'express'
import dotenv from "dotenv"

/******  Setting up environment ******/
dotenv.config()
const HOST: string = process.env.HOST || "0.0.0.0"
const PORT: number = Number(process.env.PORT) || 8080

/****** Setting up the express app ******/
const app = express()

// Using predefined routes
import router from "./api/routes/routes"
app.use(router)

// Start listening
app.listen(PORT, HOST, ()=> console.log(`listening on ${PORT}`))