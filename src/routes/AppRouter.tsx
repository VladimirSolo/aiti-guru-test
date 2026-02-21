import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { NotFound } from "@/components/NotFound";
import { ProductsTable } from "@/components/ProductsTable";
import { Login } from "@/components/Login";
import { FullErrorPage } from "@/components/FullErrorPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<PrivateRoute />}>
        <Route path="/products" element={<ProductsTable />} />
      </Route>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route path="/" element={<Navigate to="/products" />} />
      <Route
        path="*"
        element={
          <FullErrorPage>
            <NotFound />
          </FullErrorPage>
        }
      />
    </Route>,
  ),
);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
