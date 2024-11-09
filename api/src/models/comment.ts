import { Model } from "sequelize";

class Comment extends Model {
    public id!: number;
    public content!: string;
    public postId!: string;
}

export default Comment