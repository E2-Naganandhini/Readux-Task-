import "./App.css";
import AddModal from "./Components/Layout/AddModal";
import NavigationBar from "./Components/Layout/NavigationBar";
import User from "./Components/User/User";
import ViewUserMoadl from "./Components/Layout/viewUserModal";
import { useSelector } from "react-redux";
import EditModal from "./Components/Layout/EditModal";

function App() {
    const showAddModal = useSelector((state) => state.ui.addModalIsVisible);
    const showViewProductModal = useSelector(
        (state) => state.ui.viewProductIsVisible
    );
    const editOptionIsTrue = useSelector((state) => state.ui.editOptionIsTrue);
    return (
        <div className="App">
            {showAddModal && <AddModal />}
            <NavigationBar />
            <User />
            {showViewProductModal && <ViewUserMoadl />}
            {editOptionIsTrue && <EditModal />}
        </div>
    );
}

export default App;
