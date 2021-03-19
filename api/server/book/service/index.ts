import { Book as BookModel } from '../../db/entity/Book';
import { MakeBookService } from './book-service';

const BookService = MakeBookService({ BookModel });

export { BookService };
