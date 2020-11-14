import { Post } from '@nx-study/model-sequelize';
import { ResourceWithOptions } from "admin-bro";

const PostResource: ResourceWithOptions = {
    resource: Post,
    options: {}
};

export default PostResource;