import { useQuery } from "@tanstack/react-query";
import { customers, customersStores, orders, revenues, stores } from "../api";

const dashboardKeys = {
  key: ["admin/dashboard"],
  customersStores: () => [...dashboardKeys.key, "customers-stores"],
  customers: () => [...dashboardKeys.key, "customers"],
  stores: () => [...dashboardKeys.key, "stores"],
  orders: () => [...dashboardKeys.key, "orders"],
  revenues: () => [...dashboardKeys.key, "revenues"],
};

export const useStatCustomersStores = () => {
  return useQuery({
    queryKey: dashboardKeys.customersStores(),
    queryFn: customersStores,
  });
};

export const useStatCustomers = () => {
  return useQuery({
    queryKey: dashboardKeys.customers(),
    queryFn: customers,
  });
};

export const useStatStores = () => {
  return useQuery({
    queryKey: dashboardKeys.stores(),
    queryFn: stores,
  });
};

export const useStatOrders = () => {
  return useQuery({
    queryKey: dashboardKeys.orders(),
    queryFn: orders,
  });
};

export const useStatRevenue = () => {
  return useQuery({
    queryKey: dashboardKeys.revenues(),
    queryFn: revenues,
  });
};
