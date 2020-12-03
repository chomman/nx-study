import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostService } from '../services';
import { CreatePostDto } from '../dto';

@Controller('post')
@ApiTags('post - sequelize sample')
export class PostController {
  constructor(
    private readonly postService: PostService,
  ) {}

  @Post()
  addPost(@Body() dto: CreatePostDto) {
    console.log('addTodo', dto);
    return this.postService.create(dto);
  }

  @Get()
  async getPosts() {
    return this.postService.findAll();
  }

  @Get(':id')
  async getPost(@Param('id') id: number) {
    return this.postService.findOne(id);
  }

}
