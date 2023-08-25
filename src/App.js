import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { lazy, Suspense } from "react";
import { LoadingScreen } from "./components/LoadingScreen";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import CategoryProducts from "./components/CategoryProducts";
import ProductPage from "./pages/ProductPage";
import Root from "./components/Root";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SearchedProducts from "./components/SearchedProducts";
import UserProfile from "./pages/UserProfile";


const NewProduct = lazy(() => import("./components/NewProduct"));
const ManageUsers = lazy(() => import("./components/ManageUsers"));
const AllOrders = lazy(() => import("./components/AllOrders"));
const AdminAccess = lazy(() => import("./components/AdminAccess"));
const EditProduct = lazy(() => import("./components/EditProduct"));
const ManageProducts = lazy(() => import("./components/ManageProducts"));
const AnimationLayout = lazy(() => import("./components/AnimationLayout"));
const AdminOverview = lazy(() => import("./components/AdminOverview"));
const AdminLayout = lazy(() => import("./components/AdminLayout"));
const Cart = lazy(() => import("./pages/Cart"));
const PaymentSuccess = lazy(() => import("./pages/PaymentSuccess"));
const PaymentFailure = lazy(() => import("./pages/PaymentFailure"));
const Orders = lazy(() => import("./components/Orders"));



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
        <Route path="/" index element={<Home />} />
        <Route
          path="cart"
          element={
            <Suspense fallback={<LoadingScreen />}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="orders"
          element={
            <Suspense fallback={<LoadingScreen />}>
              <Orders />
            </Suspense>
          }
        />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="profile" element={<UserProfile />} />
        <Route path="search/:searchQuery" element={<SearchedProducts />} />
        <Route path="products/:category" element={<CategoryProducts />} />
        <Route path="product/:category/:id" element={<ProductPage />} />
        <Route
          path="payment/success"
          element={
            <Suspense fallback={<LoadingScreen />}>
              <PaymentSuccess />
            </Suspense>
          }
        />
        <Route
          path="payment/failure"
          element={
            <Suspense fallback={<LoadingScreen />}>
              <PaymentFailure />
            </Suspense>
          }
        />
      </Route>

      <Route
        path=""
        element={
          <Suspense fallback={<LoadingScreen />}>
            <AdminAccess />
          </Suspense>
        }
      >
        <Route path="/admin" element={<AdminLayout />}>
          <Route element={<AnimationLayout />}>
            <Route path="dashboard" index element={<AdminOverview />} />
            <Route path="manage/products" element={<ManageProducts />} />
            <Route path="manage/products/new" element={<NewProduct />} />
            <Route
              path="manage/products/edit/:productId"
              element={<EditProduct />}
            />
            <Route path="manage/users" element={<ManageUsers />} />
            <Route path="view/orders" element={<AllOrders />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);

function App() {

  return <RouterProvider router={router} />;
}

export default App;
