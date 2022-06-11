import Joi from "joi"

const registerSchema = Joi.object({
    fullname: Joi.string()
        .trim()
        .max(30)
        .pattern(new RegExp("(?=^.{0,40}$)^[a-zA-Z-]+\s[a-zA-Z-]+$")),

    username: Joi.string()
        .alphanum()
        .min(3)
        .max(15)
        .required(),

    password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{8,30}$")),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
})


const urlCodeJoi = Joi.string()
    .trim()
    .min(5)
    .max(8)
    .pattern(new RegExp(/[a-zA-Z0-9-_]+/))

const updateLinkSchema = Joi.object({
    oldUrlCode: urlCodeJoi,
    newUrlCode: urlCodeJoi
})

export {
    registerSchema,
    updateLinkSchema
}