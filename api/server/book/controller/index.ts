import { MakeBookController } from './book-controller';
import { BookService as BookSrv } from '../service';
import { ResponseMapper } from '../../helpers/response-mapper';

const responseMapper = new ResponseMapper();

const BookController = MakeBookController({ responseMapper, BookSrv });

export { BookController };
