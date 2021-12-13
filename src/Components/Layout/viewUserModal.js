import { useDispatch, useSelector } from "react-redux";
import Modal from "../UI/Modal";
import "./viewUserModal.scss";
import { uiActions } from "../../store/ui-slice";
function ViewUserMoadl(props) {
    const dispatch = useDispatch();
    const editOptionIsTrue = useSelector((state) => state.ui.editOptionIsTrue);
    console.log(editOptionIsTrue);
    const closeModalHandler = () => {
        dispatch(uiActions.toggleViewProductModal());
        sessionStorage.clear();
    };
    return (
        <Modal className="viewModal">
            <form>
                <div className="closeModal" onClick={closeModalHandler}>
                    X
                </div>
                <div className="viewModalContainer">
                    <img
                        src={`data:image/jpeg;base64,${sessionStorage.getItem(
                            "productImage"
                        )}`}
                        alt="Kurti"
                    />
                    <div>
                        <h1>{sessionStorage.getItem("productName")}</h1>
                        <p>{sessionStorage.getItem("describtion")}</p>
                        <p>RS.{sessionStorage.getItem("productPrice")}</p>
                        <p>
                            Quantity:
                            {sessionStorage.getItem("availableQuantity")}
                        </p>
                    </div>
                </div>
            </form>
        </Modal>
    );
}

export default ViewUserMoadl;
