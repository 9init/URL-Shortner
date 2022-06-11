import { Op } from "sequelize"
import { ShortLink, ShortLinkInput, ShortLinkOuput } from "../models/ShortLink"

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
    if (!oldUrl) throw new Error('not found')
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

function getAll(): Promise<ShortLinkOuput[]>{
    return ShortLink.findAll()
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
    findByUsernameAndUrlId
}