import { MakeAuthorController } from './author-controller';
import { AuthorService as AuthorSrv } from '../service';
import { ResponseMapper } from '../../helpers/response-mapper';

const responseMapper = new ResponseMapper();

const AuthorController = MakeAuthorController({ responseMapper, AuthorSrv });

export { AuthorController };
