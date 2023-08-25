import axios from "axios";


const PRODUCT_BASE_API_URL = process.env.REACT_APP_BACKEND_API_URL + "products";

// create new product

const newProduct = async (productData) => {
  const axiosInstance = axios.create({ withCredentials: true });
  const response = await axiosInstance.post(
    PRODUCT_BASE_API_URL + "/admin/new",
    productData
  );

  return response.data.message;
};

// get all products

const allProducts = async (category, price) => {
  const axiosInstance = axios.create({ withCredentials: true });

  const response = await axiosInstance.get(
    `${PRODUCT_BASE_API_URL}/all?category=${category}&price=${price}`
  );
  return response.data.allProducts;
};

// get a particular product

const getProductWithId = async (productId) => {
  const axiosInstance = axios.create({ withCredentials: true });

  const response = await axiosInstance.get(
    `${PRODUCT_BASE_API_URL}/product/${productId}`
  );
  return response.data.product;
};

const updateProduct = async (productIdAndData) => {
  const axiosInstance = axios.create({ withCredentials: true });
  const { id } = productIdAndData;
  const { name, description, price, imageUrl, category } = productIdAndData;
  const response = await axiosInstance.put(
    `${PRODUCT_BASE_API_URL}/admin/product/${id}`,
    {
      name,
      description,
      price,
      imageUrl,
      category,
    }
  );
  return response.data.message;
};

// post a review

const giveReview = async (review,productId,rating) => {
  const axiosInstance = axios.create({ withCredentials: true });
  const response = await axiosInstance.post(`${PRODUCT_BASE_API_URL}/review/${productId}`, {
    comment:review,
    rating
  });
  return response.data.message;
};


// delete your review

const deleteReview = async (reviewId,productId) => {
  const axiosInstance = axios.create({ withCredentials: true });
  const response = await axiosInstance.delete(`${PRODUCT_BASE_API_URL}/review/${productId}`, {
    data: {
      reviewId
    },
  });
  return response.data.message;
};

//delete a product

const deleteProduct = async (productId) => {
  const axiosInstance = axios.create({ withCredentials: true });
  const response = await axiosInstance.delete(
    `${PRODUCT_BASE_API_URL}/admin/product/${productId}`
  );
  return response.data.message;
};

//search products

const searchProducts = async (searchQuery) => {
  const axiosInstance = axios.create({ withCredentials: true });
  const response = await axiosInstance.get(
    `${PRODUCT_BASE_API_URL}/product/search/${searchQuery}`
  );
  return response.data.products;
};

// get products count

const getProductsCount = async () => {
  const axiosInstance = axios.create({ withCredentials: true });
  const response = await axiosInstance.get(`${PRODUCT_BASE_API_URL}/count`);
  return response.data.result;
};

const productService = {
  newProduct,
  allProducts,
  updateProduct,
  getProductWithId,
  deleteProduct,
  searchProducts,
  getProductsCount,
  giveReview,
  deleteReview
};

export default productService;
