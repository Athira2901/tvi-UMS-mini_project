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
  // {path:"edituser",element:<Edituser/>}
  
  

]);
export default router;