import React from "react";
import "./UserCard.scss";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import Axios from "axios";
import Modal from "../UI/Modal";
import { productAction } from "../../store/product-slice";
function UserCard() {
    const dispatch = useDispatch();
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const products = useSelector((state) => state.product.productDetails);
    return (
        <React.Fragment>
            {openDeleteModal && (
                <Modal
                    onClose={() => {
                        setOpenDeleteModal(false);
                    }}
                >
                    <div className="deleteModal">
                        <div>
                            <h2>Delete</h2>
                            <p className="deleteMsg">
                                Are you sure you want to delete?
                            </p>
                            <button
                                onClick={async (e) => {
                                    e.preventDefault();
                                    let id =
                                        sessionStorage.getItem("productId");
                                    const response = await Axios.delete(
                                        "http://localhost:5000/product/delete",
                                        {
                                            data: {
                                                productId: id,
                                            },
                                        }
                                    ).catch((err) => {
                                        console.log("ERROR", err);
                                    });
                                    if (response.status === 200) {
                                        sessionStorage.clear();
                                        const responseData = await Axios.get(
                                            "http://localhost:5000/product/"
                                        ).catch((err) => {
                                            console.log("ERROR", err);
                                        });
                                        dispatch(
                                            productAction.setProductDetails(
                                                responseData.data.data
                                            )
                                        );
                                        setOpenDeleteModal(false);
                                    }
                                }}
                                className="deleteButton"
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => {
                                    setOpenDeleteModal(false);
                                }}
                                className="deleteButton"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
            {products.length > 0 ? (
                products.map((product) => {
                    return (
                        <li className="card" key={product.productId}>
                            <img
                                src={`data:image/jpeg;base64,${product.productImage}`}
                                alt={product.productName}
                            />
                            <div className="container">
                                <div className="itemTitle">
                                    {product.productName}
                                </div>
                                <div className="itemDescription">
                                    {product.describtion}
                                </div>
                                <div className="itemPrice">
                                    {product.productPrice}
                                </div>

                                <div>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            sessionStorage.clear();
                                            sessionStorage.setItem(
                                                "productId",
                                                product.productId
                                            );
                                            sessionStorage.setItem(
                                                "productName",
                                                product.productName
                                            );
                                            sessionStorage.setItem(
                                                "productImage",
                                                product.productImage
                                            );
                                            sessionStorage.setItem(
                                                "productPrice",
                                                product.productPrice
                                            );
                                            sessionStorage.setItem(
                                                "availableQuantity",
                                                product.availableQuantity
                                            );
                                            sessionStorage.setItem(
                                                "describtion",
                                                product.describtion
                                            );
                                            dispatch(
                                                uiActions.toggleEditOption()
                                            );
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={async (e) => {
                                            console.log(
                                                "Delete",
                                                product.productId
                                            );
                                            e.preventDefault();
                                            sessionStorage.setItem(
                                                "productId",
                                                product.productId
                                            );
                                            setOpenDeleteModal(true);
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        sessionStorage.clear();
                                        sessionStorage.setItem(
                                            "productId",
                                            product.productId
                                        );
                                        sessionStorage.setItem(
                                            "productName",
                                            product.productName
                                        );
                                        sessionStorage.setItem(
                                            "productImage",
                                            product.productImage
                                        );
                                        sessionStorage.setItem(
                                            "productPrice",
                                            product.productPrice
                                        );
                                        sessionStorage.setItem(
                                            "availableQuantity",
                                            product.availableQuantity
                                        );
                                        sessionStorage.setItem(
                                            "describtion",
                                            product.describtion
                                        );
                                        dispatch(
                                            uiActions.toggleViewProductModal()
                                        );
                                    }}
                                >
                                    View Product
                                </button>
                            </div>
                        </li>
                    );
                })
            ) : (
                <h1>No data Available</h1>
            )}
        </React.Fragment>
    );
}

export default UserCard;
