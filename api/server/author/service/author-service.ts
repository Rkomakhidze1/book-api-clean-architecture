import { UpdateResult } from 'typeorm';
import { Author } from '../../db/entity/Author';
import { BadRequestError } from '../../errors/bad-request-error';

export function MakeAuthorService({
  AuthorModel,
}: {
  AuthorModel: typeof Author;
}) {
  return class AuthorService {
    static async getAllAuthors(): Promise<Author[]> {
      const authors = await AuthorModel.find();
      return authors;
    }

    static async getAuthor(id: number): Promise<Author | void> {
      const author = await AuthorModel.findOne(id);
      if (!author) throw new BadRequestError('Author not found');
      return author;
    }

    static async getAuthorByUsername(username: string): Promise<Author | void> {
      const author = await AuthorModel.findOne({ username });
      if (!author) throw new BadRequestError('Author not found');
      return author;
    }

    static async addAuthor(
      authorData: Partial<Author>
    ): Promise<Author | void> {
      const exists = await AuthorModel.findOne({
        username: authorData.username,
      });
      if (exists) throw new BadRequestError('author already exists');

      const author = AuthorModel.create(authorData);
      try {
        const saved = await AuthorModel.save(author);
        return saved;
      } catch (e) {
        throw new Error(e);
      }
    }

    static async updateAuthor(
      id: number,
      payload: Partial<Author>
    ): Promise<Author | void> {
      try {
        await AuthorModel.update(id, payload);
        return AuthorModel.findOne(id);
      } catch (e) {
        throw new Error(e);
      }
    }

    static async deleteAuthor(id: number): Promise<void> {
      try {
        await AuthorModel.delete(id);
      } catch (e) {
        throw new Error(e);
      }
    }
  };
}
