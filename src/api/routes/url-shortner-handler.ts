import express from "express"
import { nanoid } from "nanoid"
import { isValidUrl } from "./utils"
import { requireAuth } from "../auth"

// The API base Url endpoint
const baseUrl = process.env.BASE_URL

// creating express route handler
const router = express.Router()

// import the Url database model
import { ShortLink, ShortLinkInput, ShortLinkOuput} from "../../db/models/ShortLink"
import * as UrlDal from "../../db/dal/ShortLink"
import { UserOuput } from "../../db/models/User"
import { updateLinkSchema } from "../helper"


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
    let urlShortenBody: ShortLinkInput = {
        urlCode: urlCode,
        shortUrl: shortUrl,
        longUrl: longUrl,
        username: req.isAuthenticated() ? (req.user as UserOuput).username : undefined
    }

    // save to database
    ShortLink.create(urlShortenBody).then((value: ShortLinkOuput)=>{
        res.json(value)
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
        else return res.status(404).json({error: "No URL Found"})
    }catch (err) {
        res.status(500).json({error: "Internal Server Error"})
    }
})

/**
 * @route          GET /shortlinks
 * @description    Return List of All User’s Short Links return empty list if have no link
 */
 router.get("/shortlinks", async (req: express.Request, res: express.Response)=>{
    try {
        // get all records
        let url = await UrlDal.findByUsernameAndUrlId(req.params.username, req.params.code)
        if (url) return res.redirect(url.longUrl)
        else return res.status(404).json({error: "No URL Found"})
    }catch (err) {
        res.status(500).json({error: "Internal Server Error"})
    }
})

/**
 * @route          Put / {oldUrlCode, newUrlCode}
 * @description    update the shortned link
 */
router.put("/", requireAuth, async (req: express.Request, res: express.Response)=>{
    let { oldUrlCode, newUrlCode } = req.body
    let v = updateLinkSchema.validate({oldUrlCode, newUrlCode})
    if(v.error) return res.status(403).json({error: v})

    try {
        let payload = {
            username: (req.user as UserOuput).username,
            urlCode: newUrlCode,
            shortUrl: `${baseUrl}/${newUrlCode}`,
        }
        let newData = await UrlDal.update(oldUrlCode, payload.username, payload)
        res.json(newData)
    } catch (error) {
        res.status(403).json({error: "Slug Already In Use"})
    }
})

export {
    router as urlShortneRouter
}