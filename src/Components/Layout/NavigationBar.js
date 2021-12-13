import React from "react";
import "./NavigationBar.scss";
import logo from "../../logo.jpg";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
function NavigationBar() {
    const dispatch = useDispatch();
    const toggleAddModalHandler = () => {
        dispatch(uiActions.toggleAddModal());
    };

    return (
        <div className="header">
            <div>
                <img src={logo} alt="Logo" />
                <h1>Clothing Shop</h1>
            </div>
            <div>
                <button onClick={toggleAddModalHandler}>Add Item</button>
                <button>Log Out</button>
            </div>
        </div>
    );
}

export default NavigationBar;
