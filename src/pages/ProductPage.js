import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import Categories from "../components/Categories";
import { CartState } from "../contexts/CartContext";


const ProductPage = ({ data }) => {
    const {
        cart,
        dispatch,
    } = CartState();
    const navigate = useNavigate();
    const { category, id } = useParams();
    const product = data[category].filter((item) => item.id === id)[0];
    return (
        <div className="">
            <Categories />
            <div className="grid place-content-center my-8">
                <button
                    className="ml-6 flex items-center gap-x-1 text-primary w-max"
                    onClick={() => navigate(-1)}
                >
                    <IoArrowBackOutline />
                    Back
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 min-h-[500px] mt-10">
                    <img
                        src={product.image}
                        alt=""
                        className={`w-80 contrast-125 justify-self-center`}
                    />
                    <div className="md:mr-20 my-10 md:my-0 mx-8">
                        <h2 className="text-lg font-medium">{product.title}</h2>
                        <p className="text-xl font-semibold my-4 text-[#c53c3c] flex gap-x-3">
                            ₹{product.price}
                            <span className="text-sm bg-red-500 py-1 px-3 text-white font-medium rounded">50 left</span>
                        </p>
                        {
                            cart.some((p) => p.id === product.id)?
                                <>

                                    <button
                                        className="btn-cart-remove my-3"
                                        onClick={() =>
                                            dispatch({
                                                type: "REMOVE_FROM_CART",
                                                payload: product,
                                            })
                                        }
                                    >
                                        Remove item
                                    </button>
                                </>
                                :
                                <button
                                    className="btn-primary my-3"
                                    onClick={() =>
                                        dispatch({
                                            type: "ADD_TO_CART",
                                            payload: product,
                                        })
                                    }
                                >
                                    Add to cart
                                </button>
                        }
                        <p className="mt-3 text-[15px] font-medium text-gray-700 my-1">Description :</p>
                        <p className="text-[14px] text-gray-500 select-none">
                            {/*{product.description}*/}
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Id aliquet lectus proin nibh. Aliquet bibendum enim facilisis
                            gravida neque convallis a cras semper. Egestas tellus rutrum tellus pellentesque eu.
                            Nisi lacus sed viverra tellus in. Vivamus arcu felis bibendum ut tristique et egestas quis ipsum.
                            Aliquet sagittis id consectetur purus.
                            <br/>
                            <br/>
                            Duis ultricies lacus sed turpis tincidunt id aliquet risus
                            feugiat.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                            ut labore et dolore magna aliqua.

                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
