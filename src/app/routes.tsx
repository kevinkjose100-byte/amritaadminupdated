import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Dashboard } from "./components/pages/Dashboard";
import { CatalogManagement } from "./components/pages/CatalogManagement";
import { OrderManagement } from "./components/pages/OrderManagement";
import { TrackingSystem } from "./components/pages/TrackingSystem";
import { UserManagement } from "./components/pages/UserManagement";
import { SubscriptionManagement } from "./components/pages/SubscriptionManagement";
import { InventoryManagement } from "./components/pages/InventoryManagement";
import { FinanceReporting } from "./components/pages/FinanceReporting";
import { ConsignmentManagement } from "./components/pages/ConsignmentManagement";
import { PricingModels } from "./components/pages/PricingModels";
import { AuthorManagement } from "./components/pages/AuthorManagement";
import { CouponManagement } from "./components/pages/CouponManagement";
import { ReportsAnalytics } from "./components/pages/ReportsAnalytics";
import { SpotlightBannerManagement } from "./components/pages/SpotlightBannerManagement";
import { RoleManagement } from "./components/pages/RoleManagement";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "catalog", Component: CatalogManagement },
      { path: "banners", Component: SpotlightBannerManagement },
      { path: "orders", Component: OrderManagement },
      { path: "tracking", Component: TrackingSystem },
      { path: "users", Component: UserManagement },
      { path: "authors", Component: AuthorManagement },
      { path: "subscriptions", Component: SubscriptionManagement },
      { path: "coupons", Component: CouponManagement },
      { path: "reports", Component: ReportsAnalytics },
      { path: "pricing-models", Component: PricingModels },
      { path: "inventory", Component: InventoryManagement },
      { path: "finance", Component: FinanceReporting },
      { path: "rbac", Component: RoleManagement },
      // { path: "consignment", Component: ConsignmentManagement },
    ],
  },
]);
