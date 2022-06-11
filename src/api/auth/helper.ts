import Joi from "joi"

const registerSchema = Joi.object({
    fullname: Joi.string()
        .trim()
        .max(30)
        .pattern(new RegExp("^[a-z]([-']?[a-z]+)*( [a-z]([-']?[a-z]+)*)+$")),

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

export {
    registerSchema
}