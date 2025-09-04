class NotFoundError extends Error {
  statusCode: number | null = null;

  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}

export default NotFoundError;
