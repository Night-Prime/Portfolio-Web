import { Model } from "sequelize";

class Post extends Model {
    public id!: number;
    public title!: string;
    public content!: Object;
    public published!: boolean;
    public publishedAt!: Date;
    public userId!: number;
    public media!: string;
    public view!: number;
    // public tagId!: number;
}

export default Post;