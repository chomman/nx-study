import { Column, Model, Table } from 'sequelize-typescript';

@Table({
    tableName: 'post'
})
export class Post extends Model<Post> {
  @Column
  title: string;

  @Column
  content: string;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;
}