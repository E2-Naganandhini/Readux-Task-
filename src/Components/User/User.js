import React from "react";
import UserCard from "./UserCard";
import "./User.scss";
import { useEffect } from "react";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { productAction } from "../../store/product-slice";
export default function User() {
    const dispatch = useDispatch();
    const fetchProducts = async () => {
        const response = await Axios.get(
            "http://localhost:5000/product/"
        ).catch((err) => {
            console.log("ERROR", err);
        });
        console.log(response);
        dispatch(productAction.setProductDetails(response.data.data));
    };
    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="displayUserContainer">
            <UserCard />
        </div>
    );
}
