import { UpdateResult } from 'typeorm';
import { Book } from '../../db/entity/Book';
import { BadRequestError } from '../../errors/bad-request-error';
import { BookEntity } from '../book-entity';
import { BookAttrs } from '../book-entity/book-entity';

export function MakeBookService({ BookModel }: { BookModel: typeof Book }) {
  return class BookService {
    static async getAllBooks(): Promise<Book[]> {
      const books = await BookModel.find();
      return books;
    }

    static async getBook(id: number): Promise<Book | void> {
      const book = await BookModel.findOne(id);
      if (!book) throw new BadRequestError('Book not found');
      return book;
    }

    static async addBook(bookData: BookAttrs): Promise<Book | void> {
      const book = new BookEntity(bookData);
      try {
        const created = BookModel.create(book);
        const saved = await BookModel.save(created);
        return saved;
      } catch (e) {
        throw new Error(e);
      }
    }

    static async updateBook(
      id: number,
      payload: Partial<Book>
    ): Promise<Book | void> {
      try {
        await BookModel.update(id, payload);
        return BookModel.findOne(id);
      } catch (e) {
        throw new Error(e);
      }
    }

    static async deleteBook(id: number): Promise<void> {
      try {
        await BookModel.delete(id);
      } catch (e) {
        throw new Error(e);
      }
    }
  };
}
