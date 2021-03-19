import { BadRequestError } from '../../errors/bad-request-error';

export interface BookAttrs {
  id?: number;
  title: string;
  pages: number;
  authorId?: number;
}

export function MakeBookEntity() {
  return class BookEntity implements BookAttrs {
    readonly id?: number;
    readonly title: string;
    readonly pages: number;
    readonly authorId?: number;

    constructor({ id, title, pages, authorId }: BookAttrs) {
      if (!pages || !title) throw new BadRequestError('missing book details');

      this.id = id;
      this.title = title;
      this.pages = pages;
      this.authorId = authorId;
    }
  };
}
