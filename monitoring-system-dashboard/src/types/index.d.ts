export {};

declare global {
  type PageNationMeta = {
    total?: number;
    page: number;
    size: number;
  };
  interface ServiceResponse<T> {
    success: boolean;
    message: string;
    meta?: PageNationMeta;
    data?: T;
  }
}
