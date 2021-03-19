import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Author } from './Author';

@Entity()
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  pages: number;

  @ManyToOne((type) => Author, (author) => author.books)
  author: Author;
}
