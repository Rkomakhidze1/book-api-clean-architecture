import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Book } from './Book';

@Entity()
export class Author extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: '100',
  })
  full_name: string;

  @Column({
    unique: true,
    length: '50',
  })
  username: string;

  @Column({
    length: '100',
  })
  password: string;

  @OneToMany((type) => Book, (book) => book.author)
  books: Book[];
}
