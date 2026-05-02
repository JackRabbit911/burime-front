export type ValidationError = {
  key: string;
  msg: string;
}

export type ApiResponse<T, E = ValidationError[]> = {
  success: boolean;
  error?: E;
  result: T;
};
