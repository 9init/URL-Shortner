import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'
import User from './User'

interface UrlShortnerAttributes {
    urlCode: string
    longUrl: string
    shortUrl: string
    userId: string
}

interface UrlShortnerInput extends Optional<UrlShortnerAttributes, 'userId'> {}
interface UrlShortnerOuput extends Required<UrlShortnerAttributes> {}

class UrlShortner extends Model<UrlShortnerAttributes, UrlShortnerInput>{
    declare urlCode: string
    declare longUrl: string
    declare shortUrl: string
    declare userId: string

    // timestamps!
    declare readonly createdAt: Date
    declare readonly updatedAt: Date
}

UrlShortner.init({
    urlCode: { type: DataTypes.STRING(8), primaryKey: true, allowNull: false },
    userId: {type: DataTypes.STRING, allowNull: true },
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

UrlShortner.sync()

class Finders{
    static findOne(urlCode: string){
        return UrlShortner.findOne({
            where: {
                urlCode: urlCode
            }
        })
    }
}

export {
    UrlShortnerInput,
    UrlShortnerOuput,
    UrlShortner
}

export default UrlShortner

