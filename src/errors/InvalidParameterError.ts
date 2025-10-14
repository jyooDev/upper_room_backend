class InvalidParameterError extends Error {
  statusCode: number | null = null;

  constructor(message: string) {
    super(message);
    this.name = 'InvalidParameterError';
    this.statusCode = 404;
  }
}

export default InvalidParameterError;
