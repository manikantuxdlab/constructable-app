import { MOCK_SUPPLIERS } from "../../lib/mockData"
import type { Supplier } from "../../types"
import { apiClient } from "./client"

export const suppliersService = {
  /**
   * Fetch active subcontractors & suppliers list
   */
  getSuppliers: async (): Promise<Supplier[]> => {
    return apiClient.get<Supplier[]>("/suppliers", () => MOCK_SUPPLIERS);
  }
};

export default suppliersService;
