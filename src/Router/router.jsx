import {createBrowserRouter} from "react-router-dom";
import Login from "../Pages/Authentication/Login";
import Register from "../Pages/Authentication/Register";
import Passwordrecovery from "../Pages/Passwordrecovery";
import Otpgenerator from "../Pages/Otpgenerator";
import Confirmpassword from "../Pages/Confirmpassword";
import Dasboard from "../Pages/Dasboard";
import App from "../App";
import Edit from "../modal/Edit";
import Userregister from "../Pages/Userregister";
import Userdetails from "../Pages/Userdetails";
import Supervisor from "../Pages/Supervisor";
import DataTable from "../Components/DataTable";
import Products from "../Pages/Product/Products";
import Addproducts from "../Pages/Product/Addproducts";
import Userproduct from "../Pages/Product/Userproducts";
import Cartlist from "../Pages/Product/Cartlist";
import Wishlist from "../Pages/Product/wishlist";
// import Edituser from "../Pages/Edituser";

const router=createBrowserRouter([
  {path:"",element:<App/>},
  {path:"register",element:<Register/>},
  {path:"passwordrecovery",element:<Passwordrecovery/>},
  {path:"otpgenerator",element:<Otpgenerator/>},
  {path:"confirmpassword",element:<Confirmpassword/>},
  {path:"dashboard",element:<Dasboard/>},
  {path:"/edit/:id",element:<Edit/>},
  {path:"userregister",element:<Userregister/>},
  
  {path:"supervisor",element:<Supervisor/>},
  {path:"Userdetails",element:<Userdetails/>},
  {path:"datatable",element:<DataTable/>},
  // {path:"edituser",element:<Edituser/>}
  {path:"/product",element:<Products/>},
  {path:"/add",element:<Addproducts/>},
  {path:"/userproduct",element:<Userproduct/>},
  {path:"/cartlist",element:<Cartlist/>},
  {path:"/wishlist",element:<Wishlist/>}
  

]);
export default router;