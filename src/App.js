import { createBrowserRouter, RouterProvider, Route ,createRoutesFromElements} from "react-router-dom";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import Cart from "./pages/Cart";
import CategoryProducts from "./components/CategoryProducts";
import AllProducts from "./fake_data/allproducts";
import ProductPage from "./pages/ProductPage";
import Root from "./components/Root";
import Login from "./pages/Login";
import Register from "./pages/Register";
import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} errorElement={<ErrorPage/>}>
      <Route path="/" index element={<Home data={AllProducts} />} />
      <Route path="cart" element={<Cart />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register/>} />
      <Route
        path="products/:category"
        element={<CategoryProducts data={AllProducts} />}
      />
      <Route
        path="product/:category/:id"
        element={<ProductPage data={AllProducts} />}
      />
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
