import { useState, useEffect } from "react"
import { useApp } from "../context/AppContext"
import { suppliersService } from "../services/api/suppliers"
import type { Supplier } from "../types"

/**
 * Custom hook to manage subcontractor and material supplier directory queries and RFQ quote bids.
 */
export function useSuppliers() {
  const {
    selectedCategory,
    setSelectedCategory,
    selectedSupplier,
    setSelectedSupplier,
    quotesCount,
    handleRequestQuoteSubmit,
  } = useApp();

  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
    const fetchSuppliers = async () => {
      setLoading(true);
      try {
        const list = await suppliersService.getSuppliers();
        if (active) {
          setSuppliers(list);
        }
      } catch (err) {
        console.error("Failed to load suppliers", err);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };
    fetchSuppliers();
    return () => {
      active = false;
    };
  }, []);

  const filteredSuppliers = selectedCategory
    ? suppliers.filter((s) => s.category === selectedCategory)
    : suppliers;

  return {
    suppliers,
    filteredSuppliers,
    loading,
    selectedCategory,
    setSelectedCategory,
    selectedSupplier,
    setSelectedSupplier,
    quotesCount,
    submitQuoteRequest: handleRequestQuoteSubmit,
  };
}

export default useSuppliers;
