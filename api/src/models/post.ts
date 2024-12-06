import { Model } from "sequelize";

class Post extends Model {
    public id!: number;
    public title!: string;
    public content!: string;
    public published!: boolean;
    public publishedAt!: Date;
    public userId!: number;
    public media!: string;
    public view!: string;
    // public tagId!: number;
}

export default Post;