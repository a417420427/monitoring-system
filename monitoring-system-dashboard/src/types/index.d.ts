export {};

declare global {
  interface ServiceResponse<T> {
    success: boolean;
    message: string;
    data?: T;
  }
}
