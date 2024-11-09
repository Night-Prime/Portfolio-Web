import { Model } from "sequelize";

class Tag extends Model {
    public id!: number;
    public name !: string;
    public description !: string;
}

export default Tag;