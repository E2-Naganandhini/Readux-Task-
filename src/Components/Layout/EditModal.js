import React, { useState } from "react";
import "./EditModal.scss";
import Modal from "../UI/Modal";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import { productAction } from "../../store/product-slice";
function EditModal() {
    const dispatch = useDispatch();
    const [imageRefOnChange, setimageRefOnChange] = useState();
    if (imageRefOnChange === undefined) {
        console.log(imageRefOnChange);
    }
    var [productNameRef, setProductNameRef] = useState(
        sessionStorage.getItem("productName")
    );
    var [productPriceRef, setproductPriceRef] = useState(
        sessionStorage.getItem("productPrice")
    );
    var [availableQuantityRef, setavailableQuantityRef] = useState(
        sessionStorage.getItem("availableQuantity")
    );
    var [describtionRef, setDescribtionRef] = useState(
        sessionStorage.getItem("describtion")
    );
    var [imageRef, setImageRef] = useState(
        sessionStorage.getItem("productImage")
    );

    return (
        <Modal>
            <form>
                <div className=" AddForm">
                    <div className="titleHeader">
                        <h3>Edit Item</h3>
                    </div>
                    <div>
                        <div className="separateComponent">
                            <label>Product Name</label>
                            <input
                                defaultValue={productNameRef}
                                onChange={(e) => {
                                    setProductNameRef(e.target.value);
                                }}
                                autoFocus
                            />
                        </div>
                        <div className="separateComponent">
                            <label>Cost(MRP)</label>
                            <input
                                type="number"
                                defaultValue={productPriceRef}
                                onChange={(e) => {
                                    setproductPriceRef(e.target.value);
                                }}
                            />
                        </div>
                        <div className="separateComponent">
                            <label>Quantity</label>
                            <input
                                type="number"
                                defaultValue={availableQuantityRef}
                                onChange={(e) => {
                                    setavailableQuantityRef(e.target.value);
                                }}
                            />
                        </div>
                        <div className="separateComponent">
                            <label>Description</label>
                            <textarea
                                name="comment"
                                form="usrform"
                                defaultValue={describtionRef}
                                onChange={(e) => {
                                    setDescribtionRef(e.target.value);
                                }}
                            />
                        </div>

                        <div className="separateComponent">
                            <label>Image</label>
                            <input
                                type="file"
                                id="myfile"
                                name="myfile"
                                src={`data:image/jpeg;base64,${sessionStorage.getItem(
                                    "productImage"
                                )}`}
                                onChange={(e) => {
                                    console.log(e.target.files[0]);
                                    setimageRefOnChange(e.target.files[0]);
                                }}
                            />
                        </div>
                    </div>

                    <div className="separateComponent buttonElement">
                        <button
                            className="addButton"
                            onClick={async (e) => {
                                console.log(imageRef);
                                e.preventDefault();
                                let base64String = "";
                                var productDetails = {
                                    productId:
                                        sessionStorage.getItem("productId"),
                                    productName: productNameRef,
                                    productPrice: productPriceRef,
                                    availableQuantity: availableQuantityRef,
                                    describtion: describtionRef,
                                };
                                var reader = new FileReader();
                                reader.onload = async function () {
                                    base64String = reader.result
                                        .replace("data:", "")
                                        .replace(/^.+,/, "");

                                    productDetails.productImage = base64String;
                                    console.log(productDetails);
                                    const response = await Axios.patch(
                                        "http://localhost:5000/product/update",

                                        {
                                            product: productDetails,
                                        }
                                    ).catch((err) => {
                                        console.log("ERROR", err);
                                    });
                                    console.log(response);
                                    if (response.data.status === 200) {
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
                                        dispatch(uiActions.toggleEditOption());
                                        sessionStorage.clear();
                                    }
                                };
                                if (imageRefOnChange !== undefined) {
                                    reader.readAsDataURL(imageRefOnChange);
                                } else {
                                    var productDetails = {
                                        productId:
                                            sessionStorage.getItem("productId"),
                                        productName: productNameRef,
                                        productPrice: productPriceRef,
                                        productImage: imageRef,
                                        availableQuantity: availableQuantityRef,
                                        describtion: describtionRef,
                                    };
                                    const response = await Axios.patch(
                                        "http://localhost:5000/product/update",

                                        {
                                            product: productDetails,
                                        }
                                    ).catch((err) => {
                                        console.log("ERROR", err);
                                    });
                                    console.log(response);
                                    if (response.data.status === 200) {
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
                                        dispatch(uiActions.toggleEditOption());
                                        sessionStorage.clear();
                                    }
                                }
                            }}
                        >
                            Edit
                        </button>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                dispatch(uiActions.toggleEditOption());
                                sessionStorage.clear();
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
        </Modal>
    );
}

export default EditModal;
