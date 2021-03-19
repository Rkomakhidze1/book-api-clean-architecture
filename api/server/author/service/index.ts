import { Author as AuthorModel } from '../../db/entity/Author';
import { MakeAuthorService } from './author-service';

const AuthorService = MakeAuthorService({ AuthorModel });

export { AuthorService };
