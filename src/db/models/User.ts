import { DataTypes, Model, Optional } from 'sequelize'
import {v4 as uuid} from "uuid"
import sequelizeConnection from '../config'
import ShortLink from './ShortLink'

interface UserAttributes {
    id: string
    username: string
    fullname: string
    email: string
    password: string
}

interface UserInput extends Optional<UserAttributes, 'id'> {}
interface UserOuput extends Required<UserAttributes> {}

class User extends Model<UserAttributes, UserInput>{
    declare id: string
    declare username: string
    declare fullname: string
    declare email: string
    declare password: string

    // timestamps!
    declare readonly createdAt: Date
    declare readonly updatedAt: Date
}

User.init({
    id: { type: DataTypes.STRING(36), primaryKey: true, defaultValue: uuid()},
    username: { type: DataTypes.STRING(15), primaryKey: true, unique: true, allowNull: false },
    fullname: { type: DataTypes.STRING(30), allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false }
}, {
    sequelize: sequelizeConnection,
    tableName: "Users",
    timestamps: true,
    createdAt: true,
    updatedAt: 'updateTimestamp',

    // creating the index in the username and email option
    indexes: [{ unique: true, fields: ["username", "email"] }]
})

User.hasMany(ShortLink, {foreignKey: "username", as: "Username", foreignKeyConstraint: true})
User.sync()

export {
    User,
    UserInput,
    UserOuput
}

export default User