import { User } from '@nx-study/model-typeorm';
import { ResourceWithOptions } from "admin-bro";

const UserResource: ResourceWithOptions = {
    resource: User,
    options: {}
};

export default UserResource;