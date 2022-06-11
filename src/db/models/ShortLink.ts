import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'

interface ShortLinkAttributes {
    id: number
    urlCode: string
    longUrl: string
    shortUrl: string
    username: string
}

interface ShortLinkInput extends Optional<ShortLinkAttributes, 'id'|'username'> {}
interface ShortLinkOuput extends Required<ShortLinkAttributes> {}

class ShortLink extends Model<ShortLinkAttributes, ShortLinkInput>{
    declare id: number
    declare urlCode: string
    declare longUrl: string
    declare shortUrl: string
    declare username: string

    // timestamps!
    declare readonly createdAt: Date
    declare readonly updatedAt: Date
}

ShortLink.init({
    id: {type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true},
    urlCode: { type: DataTypes.STRING(8), allowNull: false },
    username: {type: DataTypes.STRING, allowNull: true },
    longUrl: { type: DataTypes.TEXT, allowNull: false },
    shortUrl: { type: DataTypes.TEXT, allowNull: false }
}, {
    sequelize: sequelizeConnection,
    tableName: "URLs",
    timestamps: true,
    createdAt: true,
    updatedAt: 'updateTimestamp',

    // creating the index in the urlCode option
    indexes: [{ unique: true, fields: ['urlCode'] }]
})

ShortLink.sync()

class Finders{
    static findOne(urlCode: string){
        return ShortLink.findOne({
            where: {
                urlCode: urlCode
            }
        })
    }
}

export {
    ShortLinkInput,
    ShortLinkOuput,
    ShortLink
}

export default ShortLink

