import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IUser} from '@nx-study/data';
import { Exclude, Type } from 'class-transformer';

@Entity()
export class User extends BaseEntity implements IUser {
  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Exclude()
  @Column({ length: 500 })
  password: string;

  @Column({ length: 100, nullable: true })
  firstName: string;

  @Column({ length: 100, nullable: true })
  lastName: string;

  @Exclude()
  @CreateDateColumn({ nullable: true })
  createdAt?: Date;

  @Exclude()
  @UpdateDateColumn({ nullable: true })
  updatedAt?: Date;
}

export class UserResponse {
  message?: string;
  @Type(() => User)
  data: User;
}

export class UsersResponse {
  message?: string;
  @Type(() => User)
  data: Array<User>
}