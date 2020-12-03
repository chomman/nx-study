import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Post } from '../models';
import { CreatePostDto } from '../dto';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post)
    private readonly postModel: typeof Post,
    private readonly sequelize: Sequelize,
  ) {}

  create(createPostDto: CreatePostDto): Promise<Post> {
    const post = new Post();
    post.title = createPostDto.title;
    post.content = createPostDto.content;
    return post.save();
  }

  async findAll(): Promise<Post[]> {
    try {
      await this.sequelize.transaction(async transaction => {
        const options = { transaction };

        await this.postModel.create(
          { title: 'Title 1', content: 'Lorem ipsum...' },
          options,
        );
        await this.postModel.create(
          { title: 'Title 2', content: 'Lorem ipsum...' },
          options,
        );
      });
    } catch (err) {
      // Transaction has been rolled back
      // err is whatever rejected the promise chain returned to the transaction callback
    }
    return this.postModel.findAll();
  }

  findOne(id: number): Promise<Post> {
    return this.postModel.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: number): Promise<void> {
    const post = await this.findOne(id);
    await post.destroy();
  }
}
