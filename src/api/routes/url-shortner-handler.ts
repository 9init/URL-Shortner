import express from "express"
import { nanoid } from "nanoid"
import { isValidUrl } from "./utils"
import * as UrlDal from "../../db/dal/UrlShortner"

// The API base Url endpoint
const baseUrl = process.env.BASE_URL

// creating express route handler
const router = express.Router()

// import the Url database model
import {UrlShortner, UrlShortnerInput, UrlShortnerOuput} from "../../db/models/UrlShortner"
import User, { UserOuput } from "../../db/models/User"


/**
 * @route         POST /shorten
 * @description   Create short URL
 */
router.post("/shorten", async (req: express.Request, res: express.Response)=>{
    let { longUrl } = req.body // destructure the longUrl from req.body.longUrl
    if (!isValidUrl) return res.status(401).json("Invalid base URL")

    // if valid, we create the url code
    let urlCode = nanoid(8) // Generate secure URL-friendly unique ID
    let shortUrl = `${baseUrl}/${urlCode}`

    // create record body
    let urlShortenBody: UrlShortnerInput = {
        urlCode: urlCode,
        shortUrl: shortUrl,
        longUrl: longUrl,
        userId: req.isAuthenticated() ? (req.user as UserOuput).id : undefined
    }

    // save to database
    UrlShortner.create(urlShortenBody).then((value: UrlShortnerOuput)=>{
        if(req.isAuthenticated()) shortUrl = `${baseUrl}/${(req.user as UserOuput).username}/${urlCode}`
        res.json({urlCode, shortUrl, longUrl})
    }).catch((error)=>{
        res.status(500).json({error: "Internal Server Error"})
    })
})

/**
 * @route          GET /:code
 * @description    Redirect to the long/original URL 
 */
router.get("/:code", async (req: express.Request, res: express.Response)=>{
    try {
        // find a record match to the code in req.params.code
        let url = await UrlDal.findById(req.params.code)
        if (url) return res.redirect(url.longUrl)
        else return res.status(404).json("No URL Found")
    }catch (err) {
        res.status(500).json({error: "Internal Server Error"})
    }
})

/**
 * @route          GET /:userId/:code
 * @description    Redirect to the long/original URL 
 */
 router.get("/:username/:code", async (req: express.Request, res: express.Response)=>{
    try {
        // find a record match to the code in req.params.code
        let url = await UrlDal.findByUsernameAndUrlId(req.params.username, req.params.code)
        if (url) return res.redirect(url.longUrl)
        else return res.status(404).json({error: "No URL Found"})
    }catch (err) {
        res.status(500).json({error: "Internal Server Error"})
    }
})

export {
    router as urlShortneRouter
}