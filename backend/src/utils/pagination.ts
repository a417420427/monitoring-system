// src/utils/pagination.ts

import { PaginationMeta } from "./apiResponse";

export class PaginationUtils {
  static getPaginationMeta(
    totalItems: number,
    currentPage: number,
    itemsPerPage: number
  ): PaginationMeta {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    
    return {
      total: totalItems,
      page: currentPage,
      limit: itemsPerPage,
      totalPages,
    };
  }

  static getSkipTake(page: number, limit: number) {
    const skip = (page - 1) * limit;
    return { skip, take: limit };
  }
}