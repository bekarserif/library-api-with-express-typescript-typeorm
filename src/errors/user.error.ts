import { NotFoundError } from './globalTypes';

export class UserNotFoundError extends NotFoundError {
  constructor(message: string) {
    super(message);
    this.name = 'UserNotFoundError';
  }
}
