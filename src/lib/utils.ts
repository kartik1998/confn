const raiseError = (message: string, code: number = 1) => {
  const err: any = new Error(message);
  err.code = code;
  throw err;
};

export { raiseError };
