import { Op } from "sequelize"
import sequelizeConnection from "../config"
import { ShortLink, ShortLinkInput, ShortLinkOuput } from "../models/ShortLink"
import User, { UserInput, UserOuput } from "../models/User"

function create(payload: ShortLinkInput): Promise<ShortLinkOuput>{
    return ShortLink.create(payload)
}

async function update(oldUrlCode: string, username: string, payload: ShortLinkInput|any): Promise<ShortLinkOuput>{
    let oldUrl = await ShortLink.findOne({
        where: {
            [Op.and]: [
                {urlCode: oldUrlCode},
                {username}
            ]
        }
    })
    if (!oldUrl) throw "urlCode Not Found"
    return oldUrl.update(payload)
}

function deleteById(urlCode: string){
    return ShortLink.destroy({where: {urlCode}})
}

function findById(urlCode: string) {
    return ShortLink.findOne({where: {urlCode}})
}

function findByUser(username: string){
    return ShortLink.findAll({
        where: {username}
    })
}

async function getAll(){
    let [result] = await sequelizeConnection.query(`
    SELECT URLs.username, URLs.shortUrl, URLs.createdAt, URLs.updateTimestamp
    FROM URLs
    LEFT JOIN Users
    ON URLs.username = Users.username;`)
    return result as ShortLinkOuput[]
}

async function findByUsernameAndUrlId(username: string, urlCode: string): Promise<ShortLinkOuput | null>{
    return ShortLink.findOne({
        where: {
            [Op.and]: [
                {urlCode},
                {username}
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
    findByUsernameAndUrlId,
    getAll
}