import { Op } from "sequelize"
import { UrlShortner, UrlShortnerInput, UrlShortnerOuput } from "../models/UrlShortner"
import * as User  from "./User"

function create(payload: UrlShortnerInput): Promise<UrlShortnerOuput>{
    return UrlShortner.create(payload)
}

async function update(id: number, payload: Partial<UrlShortnerInput>): Promise<UrlShortnerOuput>{
    let url = await UrlShortner.findByPk(id)
    if (!url) throw new Error('not found')
    return url.update(payload)
}

function deleteById(urlCode: string){
    return UrlShortner.destroy({where: {urlCode}})
}

function findById(urlCode: string) {
    return UrlShortner.findByPk(urlCode)
}

function findByUser(userId: string){
    return UrlShortner.findAll({
        where: {userId}
    })
}

async function findByUsernameAndUrlId(username: string, urlCode: string): Promise<UrlShortnerOuput | null>{
    let user = await User.findByUsername(username)
    if(!user) return null
    return UrlShortner.findOne({
        where: {
            [Op.and]: [
                {urlCode},
                {userId: user.id}
            ]
        }
    })
}

export {
    create,
    update,
    deleteById,
    findById,
    findByUser,
    findByUsernameAndUrlId
}