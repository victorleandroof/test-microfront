export class GoogleNewsException extends Error {
  constructor() {
    super('Failed to get news');
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
