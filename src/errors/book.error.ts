import { NotFoundError } from './globalTypes';

export class BookNotFoundError extends NotFoundError {
  constructor(message: string) {
    super(message);
    this.name = 'BookNotFoundError';
  }
}
