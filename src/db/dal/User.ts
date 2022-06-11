import { User, UserInput, UserOuput } from "../models/User"

function create(payload: UserInput): Promise<UserOuput>{
    return User.create(payload)
}

function findByEmail(email: string): Promise<UserOuput|null>{
    return User.findOne({where: {email}})
}

function findByUsername(username: string): Promise<UserOuput|null>{
    return User.findOne({where: {username}})
}

async function update(userId: string, payload: UserInput): Promise<UserOuput>{
    let user = await User.findByPk(userId)
    if (!user) throw new Error('not found')
    return user.update(payload)
}

export {
    create,
    findByEmail,
    findByUsername,
    update
}