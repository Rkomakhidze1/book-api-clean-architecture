import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { MakeAuthController } from './auth-controller';
import { AuthorService as AuthorSrv } from '../../author/service';
import { ResponseMapper } from '../../helpers/response-mapper';

const responseMapper = new ResponseMapper();

const AuthController = MakeAuthController({
  responseMapper,
  AuthorSrv,
  hashPassword,
  checkPassword,
  generateToken,
});

async function hashPassword(password: string) {
  return await bcrypt.hash(password, 8);
}

async function checkPassword(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}

function generateToken(payload: { id: number; username: string }) {
  return jwt.sign(payload, process.env.JWT_KEY!);
}

export { AuthController };
