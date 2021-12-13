import React, { useState } from "react";
import "./AddModal.scss";
import Modal from "../UI/Modal";
import { useRef } from "react";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import { productAction } from "../../store/product-slice";

function AddModal() {
    const dispatch = useDispatch();
    const [formValidate, setFormValidate] = useState(true);
    const [ErrorMsg, setErrorMsg] = useState(true);
    var productNameRef = useRef();
    var imageRef = useRef();
    var costRef = useRef();
    var descriptionRef = useRef();
    var availableQuantityRef = useRef();
    const addItemHandler = async (e) => {
        setErrorMsg(true);
        e.preventDefault();
        let base64String = "";
        var productDetail = {
            productName: productNameRef,
            productPrice: costRef,
            availableQuantity: availableQuantityRef,
            describtion: descriptionRef,
        };
        if (
            productNameRef.length > 0 &&
            costRef.length > 0 &&
            descriptionRef.length > 0 &&
            imageRef.current !== "" &&
            availableQuantityRef.length > 0
        ) {
            var reader = new FileReader();
            reader.onload = async function () {
                base64String = reader.result
                    .replace("data:", "")
                    .replace(/^.+,/, "");

                productDetail.productImage = base64String;

                const response = await Axios.post(
                    "http://localhost:5000/product/add",
                    {
                        product: productDetail,
                    }
                ).catch((err) => {
                    console.log("ERROR", err);
                    console.log(ErrorMsg);
                    setErrorMsg(false);
                    console.log(ErrorMsg);
                });
                const responseData = await Axios.get(
                    "http://localhost:5000/product/"
                ).catch((err) => {
                    console.log("ERROR", err);
                });
                dispatch(
                    productAction.setProductDetails(responseData.data.data)
                );
                productNameRef = "";
                imageRef = "";
                costRef = "";
                descriptionRef = "";
                availableQuantityRef = "";
                dispatch(uiActions.toggleAddModal());
            };
            reader.readAsDataURL(imageRef);
        } else {
            setFormValidate(false);
        }
    };

    const closeAddModalHandler = (e) => {
        e.preventDefault();
        dispatch(uiActions.toggleAddModal());
    };
    return (
        <Modal>
            <form method="post" enctype="multipart/form-data">
                <div className=" AddForm">
                    <div className="titleHeader">
                        <h3>Add Item</h3>
                    </div>
                    {!ErrorMsg && <p>Something went wrong</p>}
                    {!formValidate && <p>Enter All data</p>}
                    <div>
                        <div className="separateComponent">
                            <label>Product Name</label>
                            <input
                                onChange={(e) => {
                                    productNameRef = e.target.value;
                                    setFormValidate(true);
                                }}
                                autoFocus
                            />
                        </div>
                        <div className="separateComponent">
                            <label>Cost(MRP)</label>
                            <input
                                type="number"
                                onChange={(e) => {
                                    costRef = e.target.value;
                                    setFormValidate(true);
                                }}
                            />
                        </div>
                        <div className="separateComponent">
                            <label>Quantity</label>
                            <input
                                onChange={(e) => {
                                    availableQuantityRef = e.target.value;
                                    setFormValidate(true);
                                }}
                                type="number"
                            />
                        </div>
                        <div className="separateComponent">
                            <label>Description</label>
                            <textarea
                                name="comment"
                                form="usrform"
                                onChange={(e) => {
                                    descriptionRef = e.target.value;
                                    setFormValidate(true);
                                }}
                            />
                        </div>

                        <div className="separateComponent">
                            <label>Image</label>
                            <input
                                ref={imageRef}
                                type="file"
                                id="myfile"
                                name="productImage"
                                onChange={(e) => {
                                    let file = e.target.files[0];
                                    imageRef = file;
                                    setFormValidate(true);
                                }}
                            />
                        </div>
                    </div>

                    <div className="separateComponent buttonElement">
                        <button className="addButton" onClick={addItemHandler}>
                            Add
                        </button>
                        <button onClick={closeAddModalHandler}>Cancel</button>
                    </div>
                </div>
            </form>
        </Modal>
    );
}

export default AddModal;
