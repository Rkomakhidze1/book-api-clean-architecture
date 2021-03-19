import { AuthorService } from '../../author/service';
import { ResponseMapper } from '../../helpers/response-mapper';
import { Author } from '../../db/entity/Author';
import { Request, Response } from 'express';
import { BadRequestError } from '../../errors/bad-request-error';

export function MakeAuthController({
  AuthorSrv,
  responseMapper,
  hashPassword,
  checkPassword,
  generateToken,
}: {
  AuthorSrv: typeof AuthorService;
  responseMapper: ResponseMapper;
  hashPassword: (password: string) => Promise<string>;
  checkPassword: (password: string, hash: string) => Promise<boolean>;
  generateToken: (payload: { id: number; username: string }) => string;
}) {
  return class AuthController {
    static async signup(httpReq: Request, res: Response) {
      const authorData = { ...httpReq.body } as Partial<Author>;
      authorData.password = await hashPassword(authorData.password as string);
      const author = await AuthorSrv.addAuthor(authorData);
      responseMapper
        .setSuccess(201, 'signed up successfully', author as Author)
        .send(res);
    }

    static async signin(httpReq: Request, res: Response) {
      const { username, password } = httpReq.body;
      const author = (await AuthorSrv.getAuthorByUsername(username)) as Author;
      const match = checkPassword(password, author.password);
      if (!match) throw new BadRequestError('incorect credentials');
      const data = {
        author,
        token: generateToken({ id: author.id, username: author.username }),
      };
      responseMapper.setSuccess(200, 'You are logged in', data).send(res);
    }

    static async signout(httpReq: Request, res: Response) {}

    static async currentUser(httpReq: Request, res: Response) {
      console.log(httpReq.currentUser);
      responseMapper
        .setSuccess(200, 'current user', httpReq.currentUser!)
        .send(res);
    }
  };
}
