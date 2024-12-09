import { Model } from 'sequelize';

class User extends Model {
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;
    public bio!: string;
    public view!: number;
    declare author?: string;
}

export default User;