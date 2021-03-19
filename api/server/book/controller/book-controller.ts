import { Request, Response } from 'express';
import { Book } from '../../db/entity/Book';
import { ResponseMapper } from '../../helpers/response-mapper';
import { BookService } from '../service';

interface BookCOntrollerArgs {
  responseMapper: ResponseMapper;
  BookSrv: typeof BookService;
}

export function MakeBookController({
  responseMapper,
  BookSrv,
}: BookCOntrollerArgs) {
  return class BookController {
    static async postBook(httpReq: Request, res: Response) {
      const book = await BookSrv.addBook(httpReq.body);
      return responseMapper
        .setSuccess(200, 'book created !', book as Book)
        .send(res);
    }

    static async getBooks(httpReq: Request, res: Response) {
      const books = await BookSrv.getAllBooks();
      return responseMapper
        .setSuccess(200, 'books retrived !', books)
        .send(res);
    }

    static async getBook(httpReq: Request, res: Response) {
      const { id } = httpReq.params;
      const book = await BookSrv.getBook(+id);
      return responseMapper
        .setSuccess(200, 'book retrived !', book as Book)
        .send(res);
    }

    static async patchBook(httpReq: Request, res: Response) {
      const { body } = httpReq;
      const { id } = httpReq.params;
      const updated = await BookSrv.updateBook(+id, body);
      return responseMapper
        .setSuccess(200, 'Book was updated', updated as Book)
        .send(res);
    }

    static async deleteBook(httpReq: Request, res: Response) {
      const { id } = httpReq.params;
      await BookSrv.deleteBook(+id);
      return responseMapper.setSuccess(200, 'Book was deleted', []).send(res);
    }
  };
}
