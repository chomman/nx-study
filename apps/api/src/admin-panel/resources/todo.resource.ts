import { Todo } from '@nx-study/model-typeorm';
import { ResourceWithOptions } from "admin-bro";

const TodoResource: ResourceWithOptions = {
    resource: Todo,
    options: {}
};

export default TodoResource;