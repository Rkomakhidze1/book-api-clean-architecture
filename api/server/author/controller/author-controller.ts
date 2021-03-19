import { Request, Response } from 'express';
import { Author } from '../../db/entity/Author';
import { ResponseMapper } from '../../helpers/response-mapper';
import { AuthorService } from '../service';

interface AuthorControllerArgs {
  responseMapper: ResponseMapper;
  AuthorSrv: typeof AuthorService;
}

export function MakeAuthorController({
  responseMapper,
  AuthorSrv,
}: AuthorControllerArgs) {
  return class AuthorController {
    static async postAuthor(httpReq: Request, res: Response) {
      const author = await AuthorSrv.addAuthor(httpReq.body);
      return responseMapper
        .setSuccess(200, 'Author created !', author as Author)
        .send(res);
    }

    static async getAuthors(httpReq: Request, res: Response) {
      const authors = await AuthorSrv.getAllAuthors();
      return responseMapper
        .setSuccess(200, 'Authors retrived !', authors)
        .send(res);
    }

    static async getAuthor(httpReq: Request, res: Response) {
      const { id } = httpReq.params;
      const author = await AuthorSrv.getAuthor(+id);
      return responseMapper
        .setSuccess(200, 'Author retrived !', author as Author)
        .send(res);
    }

    static async patchAuthor(httpReq: Request, res: Response) {
      const { body } = httpReq;
      const { id } = httpReq.params;
      const updated = await AuthorSrv.updateAuthor(+id, body);
      return responseMapper
        .setSuccess(200, 'Author was updated', updated as Author)
        .send(res);
    }

    static async deleteAuthor(httpReq: Request, res: Response) {
      const { id } = httpReq.params;
      await AuthorSrv.deleteAuthor(+id);
      return responseMapper.setSuccess(200, 'Author was deleted', []).send(res);
    }
  };
}
